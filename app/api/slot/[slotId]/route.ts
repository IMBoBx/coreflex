import { NextRequest, NextResponse } from "next/server";
import { SlotService } from "@/lib/services/slotService";
import Slot from "@/models/Slot";
import { connectDB } from "@/lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: { slotId: string } }
) {
    // ADD AUTH

    try {
        await connectDB();
        const { slotId } = params;
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return NextResponse.json(
                { error: "session not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { ...slot.toObject(), success: true },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "GET request failed" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { slotId: string } }
) {
    // ADD AUTH

    try {
        await connectDB();

        const { slotId } = params;
        const { userId, action } = await req.json();
        if (!userId || !action) {
            return NextResponse.json(
                { error: "userId and action are required" },
                { status: 400 }
            );
        }

        if (action === "book") {
            await SlotService.bookUserToSlot(userId, slotId);
            return NextResponse.json({ success: true }, { status: 200 });
        } else if (action === "cancel") {
            await SlotService.cancelBooking(userId, slotId);
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "invalid action" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Booking failed." },
            { status: 500 }
        );
    }
}
