import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Basic validation
        if (!body.username || !body.role || !body.email || !body.phone) {
            return NextResponse.json(
                { error: "required fields missing" },
                { status: 400 }
            );
        }

        const user = await User.create({
            username: body.username,
            role: body.role,
            sessions_left: body.sessions_left ?? {},
            email: body.email,
            phone: body.phone,
        });

        return NextResponse.json(user.toObject(), { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "POST request failed" },
            { status: 500 }
        );
    }
}
