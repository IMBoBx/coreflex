import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectDB() {
    if (!MONGODB_URI) {
        return new Error("environment variable MONGODB_URI not defined");
    }

    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(MONGODB_URI);
}
