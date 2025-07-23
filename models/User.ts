import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IProgram } from "./Program";
import {
    toISTStartOfDay,
    toISTEndOfDay,
    getCurrentISTDate,
} from "@/lib/dateUtils";

export interface IPackageDetail {
    program: Types.ObjectId;
    sessions_left: number;
    start_date: Date;
    end_date: Date;
}

export interface IUser extends Document {
    _id: Types.ObjectId;

    username: string;
    role: "client" | "admin";
    email: string;
    phone: string;
    package_details: Types.Map<IPackageDetail>;

    otp?: {
        value: string;
        expiresAt: Date;
    };

    isPackageActive(programId: string): boolean;
    addSessions(programId: string, inc: number): number;
    removeSessions(programId: string, dec: number): number;
}

export interface IPackageDetailPopulated
    extends Omit<IPackageDetail, "program"> {
    program: IProgram;
}

export interface IUserPopulated extends Omit<IUser, "package_details"> {
    package_details: Types.Map<IPackageDetailPopulated>;
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
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    package_details: {
        type: Map,
        of: new mongoose.Schema(
            {
                program: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "Program",
                    required: true,
                },
                sessions_left: {
                    type: Number,
                    required: true,
                },
                start_date: {
                    type: Date,
                    required: true,
                    default: new Date(),
                },
                end_date: {
                    type: Date,
                    required: true,
                    default: new Date(),
                },
            },
            { _id: false } // disable _id for subdocuments inside the map
        ),
        default: {},
    },
    otp: {
        value: { type: String },
        expiresAt: { type: Date },
    },
});

userSchema.pre("save", function (next) {
    this.package_details.forEach((pkg) => {
        // Convert dates to IST start/end of day
        const start_date = toISTStartOfDay(new Date(pkg.start_date));
        const end_date = toISTEndOfDay(new Date(pkg.end_date));

        pkg.start_date = start_date;
        pkg.end_date = end_date;
    });

    next();
});

userSchema.methods.isPackageActive = function (programId: string): boolean {
    const pkg = this.package_details.get(programId);
    if (!pkg) return false;

    // Use IST current time for comparison
    const todayIST = getCurrentISTDate();
    const start_date = new Date(pkg.start_date);
    const end_date = new Date(pkg.end_date);

    if (todayIST < start_date || todayIST > end_date) return false;

    return pkg.sessions_left > 0;
};

userSchema.methods.addSessions = async function (
    programId: string,
    inc: number
) {
    const pkg = this.package_details.get(programId);
    if (pkg) {
        pkg.sessions_left += inc;
        this.package_details.set(programId, pkg);
        await this.save();
        return pkg.sessions_left;
    }
    return 0;
};

userSchema.methods.removeSessions = async function (
    programId: string,
    dec: number
) {
    const pkg = this.package_details.get(programId);
    if (pkg && pkg.sessions_left >= dec) {
        pkg.sessions_left -= dec;
        this.package_details.set(programId, pkg);
        await this.save();
        return pkg.sessions_left;
    }
    return -1;
};

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
