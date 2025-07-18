import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function POST(req: NextRequest) {
    await connectDB();
    const { email, otp } = await req.json();
    const user = await User.findOne({ email }).populate(
        "package_details.$*.program"
    );
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!otp || !user.otp?.value || otp !== user.otp.value) {
        return NextResponse.json({ error: "Incorrect OTP" }, { status: 401 });
    }

    if (new Date() > user.otp.expiresAt) {
        return NextResponse.json({ error: "OTP expired" }, { status: 410 });
    }

    user.otp = undefined;
    await user.save();

    // issue JWT

    const token = jwt.sign(
        { userId: user._id + "", role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "15d" }
    );

    return NextResponse.json(
        {
            success: true,
            token,
            userId: user._id.toString(),
            role: user.role,
            user,
        },
        { status: 200 }
    );
}
