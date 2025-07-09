import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IProgram } from "./Program";
import { IUser } from "./User";

export interface ISlot extends Document {
    _id: Types.ObjectId;
    program: mongoose.Types.ObjectId;
    time_start: Date;
    time_end?: Date;
    capacity: number;
    filled: number;
    members: mongoose.Types.ObjectId[];

    isFull(): boolean;
    hasUser(userId: Types.ObjectId): boolean;
}

export interface ISlotPopulated extends Omit<ISlot, "program" | "members"> {
    program: IProgram;
    members: IUser[];
}

export interface ISlotModel extends Model<ISlot> {
    findByProgramId(programId: Types.ObjectId): Promise<ISlot[]>;
}

const slotSchema: Schema<ISlot> = new Schema({
    program: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Program",
        required: true,
    },
    time_start: {
        type: Date,
        required: true,
    },
    time_end: {
        type: Date,
    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
    },
    filled: {
        type: Number,
        default: 0,
        min: 0,
    },
    members: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
    ],
});

slotSchema.pre("save", function (next) {
    if (!this.time_end) {
        this.time_end = new Date(this.time_start.getTime() + 60 * 60 * 1000);
    }

    if (this.time_end < this.time_start) {
        return next(
            new Error("Session end time must be after session start time.")
        );
    }

    next();
});

slotSchema.methods.isFull = function () {
    return this.filled >= this.capacity;
};

slotSchema.methods.hasUser = function (userId: Types.ObjectId) {
    return (
        this.members.findIndex((member: Types.ObjectId) =>
            member.equals(userId)
        ) != -1
    );
};

slotSchema.statics.findByProgramId = async function (
    programId: Types.ObjectId
) {
    return this.find({ program: programId });
};

const Slot: ISlotModel =
    (mongoose.models.Slot as ISlotModel) ||
    mongoose.model<ISlot, ISlotModel>("Slot", slotSchema);

export default Slot;
