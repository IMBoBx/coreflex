import { connectDB } from "@/lib/db";
import { sendOTPEmail } from "@/lib/mailer";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentISTDate } from "@/lib/dateUtils";

export async function POST(req: NextRequest) {
    /* 
    Body: {
        "email": "abc@gmail.com"
    }
    */
    await connectDB();

    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            { error: "User with that email not found." },
            { status: 404 }
        );
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const currentIST = getCurrentISTDate();
    const expiresAt = new Date(currentIST.getTime() + 15 * 60 * 1000); // + 15 mins from IST time

    user.otp = { value: otp, expiresAt };
    await user.save();

    await sendOTPEmail(email, otp);

    return NextResponse.json(
        { success: true, message: "OTP sent" },
        { status: 200 }
    );
}
