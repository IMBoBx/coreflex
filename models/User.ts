import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IUser extends Document {
    _id: Types.ObjectId;

    username: string;
    role: "client" | "admin";
    sessions_left: {
        [programId: string]: number;
    };
    email: string;
    phone: string;

    hasSessionsLeft(programId: string): boolean;
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
    return this.sessions_left[programId] > 0;
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
