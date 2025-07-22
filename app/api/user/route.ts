import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { authenticateToken } from "@/lib/authenticateToken";
import "@/models/Program";

export async function GET(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (!authResult.success || authResult.decoded?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await connectDB();
        const users = await User.find({}).populate("package_detail.$*.program");

        const usersWithPackageDetails = users.map((user) => {
            const packageDetails = Array.from(
                user.package_details.entries()
            ).map(([programId, pkg]) => ({
                programId,
                sessions_left: pkg.sessions_left,
                start_date: pkg.start_date,
                end_date: pkg.end_date,
            }));

            return {
                ...user.toObject(),
                package_details: packageDetails,
            };
        });

        return NextResponse.json(usersWithPackageDetails, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "GET request failed" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const authResult = authenticateToken(req);
    if (!authResult.success || authResult.decoded?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
            email: body.email,
            phone: body.phone,
            package_details: body.package_details ?? {},
        });

        return NextResponse.json(user.toObject(), { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "POST request failed" },
            { status: 500 }
        );
    }
}
