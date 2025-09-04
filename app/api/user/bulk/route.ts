import { authenticateToken } from "@/lib/authenticateToken";
import { connectDB } from "@/lib/db";
import User, { IPackageDetail } from "@/models/User";
import Program from "@/models/Program";
import mongoose, { AnyBulkWriteOperation } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getISTStartOfDay } from "@/lib/dateUtils";

interface UserData {
    username: string;
    email: string;
    phone: string;
    // program: string;
    sessions_left: number;
    start_date?: string; // YYYY-MM-DD format
    end_date: string; // YYYY-MM-DD format
}

export async function POST(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (!authResult.success || authResult.decoded?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    try {
        await connectDB();
        const { userData }: { userData: UserData[] } = await req.json();
        const pilates = await Program.findOne({ name: "Pilates" });
        const pilatesId = pilates?._id.toString() ?? "Pilates";

        const operations = userData.map((user) => {
            return {
                updateOne: {
                    filter: { email: user.email },
                    update: {
                        $set: {
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            role: "client",
                            package_details: {
                                [pilatesId]: {
                                    program: pilates?._id,
                                    sessions_left: user.sessions_left,
                                    start_date: user.start_date
                                        ? new Date(user.start_date)
                                        : new Date(),
                                    end_date: new Date(user.end_date),
                                },
                            },
                        },
                    },
                    upsert: true,
                },
            };
        });

        const result = await User.bulkWrite(operations);

        return NextResponse.json(
            {
                success: true,
                message: "Bulk user operation completed",
                result: {
                    created: result.upsertedCount,
                    updated: result.modifiedCount,
                    total: userData.length,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Bulk user creation error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
