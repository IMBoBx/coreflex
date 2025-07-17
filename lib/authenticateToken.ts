import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import "dotenv/config";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface DecodedPayload {
    userId: string;
    role: 'client' | 'admin';
    iat: number;
    exp: number;
}

export function authenticateToken(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return { success: false, message: "Token not found" };
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedPayload;
        return { success: true, decoded };
    } catch (err: any) {
        return { success: false, message: "Invalid token", error: err.message };
    }
}
