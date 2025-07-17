import { NextRequest, NextResponse } from "next/server";
import { SlotService } from "@/lib/services/slotService";
import Slot from "@/models/Slot";
import { connectDB } from "@/lib/db";
import { authenticateToken } from "@/lib/authenticateToken";

export async function GET(
    req: NextRequest,
    { params }: { params: { slotId: string } }
) {
    const authResult = authenticateToken(req);
    if (!authResult.success) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
    const authResult = authenticateToken(req);
    if (!authResult.success) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await connectDB();

        const { slotId } = await params;
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
            { error: error ?? "Booking failed." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { slotId: string } }
) {
    const authResult = authenticateToken(req);
    if (!authResult.success || authResult.decoded?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await connectDB();
        const { slotId } = await params;
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return NextResponse.json(
                { error: "Slot not found" },
                { status: 404 }
            );
        }
        // Cancel bookings for all members
        for (const userId of slot.members) {
            try {
                await SlotService.cancelBooking(userId.toString(), slotId);
            } catch (e) {
                // Optionally log or handle individual cancellation errors
                // TODO - add logs
            }
        }
        await Slot.findByIdAndDelete(slotId);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "DELETE request failed" },
            { status: 500 }
        );
    }
}
