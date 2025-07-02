import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IProgram extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
}

const programSchema: Schema<IProgram> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
});

const Program: Model<IProgram> =
    mongoose.models.Program ||
    mongoose.model<IProgram>("Program", programSchema);

export default Program;
