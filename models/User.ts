import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IUser extends Document {
    _id: Types.ObjectId;

    username: string;
    role: "client" | "admin";
    sessions_left: Types.Map<number>,
    email: string;
    phone: string;

    hasSessionsLeft(programId: string): boolean;
    addSessions(programId: string, inc: number) : number;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["client", "admin"],
        required: true,
    },
    sessions_left: {
        type: Map,
        of: Number,
        default: {},
        // this map is supposed to be {**programId** (str) -> noOfSessionsLeft (int)}
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

userSchema.methods.hasSessionsLeft = function (programId: string) {
    return (this.sessions_left.get(programId) ?? 0) > 0;
};

userSchema.methods.addSessions = async function (
    programId: string,
    inc: number
) {
    const current = this.sessions_left.get(programId) ?? 0;
    this.sessions_left.set(programId, current + inc);
    await this.save();

    return this.sessions_left_get(programId);
};

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
