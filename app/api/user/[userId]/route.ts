import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        await connectDB();
        const { userId } = await params;
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { ...user.toObject(), package_details: user.package_details },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error || "GET request failed" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        await connectDB();
        const { userId } = await params;
        const updates = await req.json();
        // Only allow updating certain fields
        const allowedFields = [
            "username",
            // "role",
            "email",
            "phone",
            "package_details",
        ];
        const updateData: Record<string, any> = {};
        for (const key of allowedFields) {
            if (key in updates) {
                updateData[key] = updates[key];
            }
        }
        const user = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(user.toObject(), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "PATCH request failed" },
            { status: 500 }
        );
    }
}
