import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Program from "@/models/Program";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const programs = await Program.find({});
        const programsJson = programs.map((program) => program.toObject());
        return NextResponse.json(programsJson, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "GET request failed" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, description } = body;
        if (!name) {
            return NextResponse.json(
                { error: "name is required" },
                { status: 400 }
            );
        }
        const program = await Program.create({ name, description });
        return NextResponse.json(program.toObject(), { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "POST request failed" },
            { status: 500 }
        );
    }
}
