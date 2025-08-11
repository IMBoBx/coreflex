import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { authenticateToken } from "@/lib/authenticateToken";
import "@/models/Program";

export async function GET(
    req: NextRequest,

    { params }: { params: { userId: string } }
) {
    const authResult = authenticateToken(req);

    if (!authResult.success) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await connectDB();

        const { userId } = await params;

        const user = await User.findById(userId).populate(
            "package_details.$*.program"
        );

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
    const authResult = authenticateToken(req);

    if (!authResult.success || authResult.decoded?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

export async function DELETE(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    const authResult = authenticateToken(req);
    if (!authResult.success || authResult.decoded?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

        // TODO: Cancel all user's bookings before deleting
        // This would require importing SlotService and canceling all bookings
        // For now, we'll just delete the user

        await User.findByIdAndDelete(userId);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "DELETE request failed" },
            { status: 500 }
        );
    }
}
