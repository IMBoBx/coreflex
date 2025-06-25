import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Program from "@/models/Program";

export async function GET(
    req: NextRequest,
    { params }: { params: { programId: string } }
) {
    try {
        await connectDB();
        const { programId } = params;
        const program = await Program.findById(programId);
        if (!program) {
            return NextResponse.json(
                { error: "Program not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(program.toObject(), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "GET request failed" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { programId: string } }
) {
    try {
        await connectDB();
        const { programId } = params;
        const updates = await req.json();
        // Only allow updating name and description
        const allowedFields = ["name", "description"];
        const updateData: Record<string, any> = {};
        for (const key of allowedFields) {
            if (key in updates) {
                updateData[key] = updates[key];
            }
        }
        const program = await Program.findByIdAndUpdate(programId, updateData, {
            new: true,
        });
        if (!program) {
            return NextResponse.json(
                { error: "Program not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(program.toObject(), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "PATCH request failed" },
            { status: 500 }
        );
    }
}
