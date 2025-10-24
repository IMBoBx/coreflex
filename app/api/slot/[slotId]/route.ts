import { NextRequest, NextResponse } from "next/server";
import { SlotService } from "@/lib/services/slotService";
import Slot from "@/models/Slot";
import { connectDB } from "@/lib/db";
import { authenticateToken } from "@/lib/authenticateToken";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slotId: string }> }
) {
    const authResult = authenticateToken(req);
    if (!authResult.success) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await connectDB();
        const { slotId } = await params;
        const { searchParams } = new URL(req.url);
        const populate = searchParams.get("populate") === "true";

        let slot;
        if (populate) {
            slot = await Slot.findById(slotId).populate(
                "members",
                "username phone email"
            );
        } else {
            slot = await Slot.findById(slotId);
        }

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
    { params }: { params: Promise<{ slotId: string }> }
) {
    // ADD AUTH
    const authResult = authenticateToken(req);
    if (!authResult.success) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    try {
        await connectDB();
        const { slotId } = await params;
        const {
            userId,
            action,
            force = false,
            capacity,
            filled,
            time_start,
            time_end,
        } = await req.json();
        
        if (action === "update" && authResult.decoded?.role === "admin") {
            const slot = await Slot.findById(slotId);
            if (!slot) {
                return NextResponse.json(
                    { error: "Session not found" },
                    { status: 404 }
                );
            }
            if (capacity !== undefined) slot.capacity = capacity;
            if (filled !== undefined) slot.filled = filled;
            if (time_start !== undefined)
                slot.time_start = new Date(time_start);
            if (time_end !== undefined) slot.time_end = new Date(time_end);

            await slot.save();
            return NextResponse.json({ success: true }, { status: 200 });
        }

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
            await SlotService.cancelBooking(userId, slotId, force);
            return NextResponse.json({ success: true }, { status: 200 });
        } else if (
            action === "remove" &&
            authResult.decoded?.role === "admin"
        ) {
            await SlotService.cancelBooking(userId, slotId, true); // Force remove as admin
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "invalid action" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message ?? "Booking failed." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ slotId: string }> }
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
