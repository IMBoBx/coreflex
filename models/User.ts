import mongoose, { Schema, Document, Model, Types } from "mongoose";

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
                    type: Number,
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
        const start_date = new Date(pkg.start_date);
        const end_date = new Date(pkg.end_date);

        start_date.setHours(0, 0, 0, 0); // 00:00 hrs
        end_date.setHours(23, 59, 59, 999); // 23:59 hrs

        pkg.start_date = start_date;
        pkg.end_date = new Date(end_date);
    });

    next();
});

userSchema.methods.isPackageActive = function (programId: string): boolean {
    const pkg = this.package_details.get(programId);
    const today = new Date();
    if (!pkg) return false;
    const end_date = new Date(pkg.end_date); // Correctly use pkg.end_date

    if (today < pkg.start_date || today > end_date) return false;

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
