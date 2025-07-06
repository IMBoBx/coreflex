import { connectDB } from "@/lib/db";
import Slot, { ISlot } from "@/models/Slot";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // ADD AUTH if needed
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const all = searchParams.get("all");
        const programId = searchParams.get("programId");
        const date = searchParams.get("date"); // new param: expects YYYY-MM-DD

        let slots;

        const query: mongoose.FilterQuery<ISlot> = {};
        all !== "true" && (query.time_start = { $gte: new Date() });
        programId && (query.program = new mongoose.Types.ObjectId(programId));
        if (date) {
            // Parse date as local midnight to next midnight
            const start = new Date(date + "T00:00:00");
            const end = new Date(date + "T23:59:59.999");
            query.time_start = { ...query.time_start, $gte: start, $lte: end };
        }

        slots = await Slot.find(query);

        const slotsJson = slots.map((slot) => slot.toObject());
        return NextResponse.json(slotsJson, { status: 200 });
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
        const slotData = body as Partial<ISlot>;

        if (!slotData.program || !slotData.time_start || !slotData.capacity) {
            return NextResponse.json(
                { error: "required fields missing" },
                { status: 400 }
            );
        }

        const slot = await Slot.create({
            program: new mongoose.Types.ObjectId(slotData.program),
            time_start: slotData.time_start,
            ...(slotData.time_end && { time_end: slotData.time_end }),
            capacity: slotData.capacity,
            filled: slotData.filled ?? 0,
            members: slotData.members ?? [],
        });

        return NextResponse.json(slot.toObject(), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "POST request failed" },
            { status: 500 }
        );
    }
}
