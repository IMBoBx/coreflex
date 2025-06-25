import mongoose from "mongoose";
import Slot from "@/models/Slot";
import User from "@/models/User";

export class SlotService {
    static async bookUserToSlot(userId: string, slotId: string) {
        const mongoSession = await mongoose.startSession();

        try {
            await mongoSession.withTransaction(async () => {
                const slot = await Slot.findById(slotId).session(mongoSession);
                if (!slot) {
                    throw new Error("Session not found");
                }

                const user = await User.findById(userId).session(mongoSession);
                if (!user) {
                    throw new Error("User not found");
                }

                const programId = slot.program.toString();

                if (!user.hasSessionsLeft(programId)) {
                    throw new Error("No more sessions left.");
                }

                const updatedSlot = await Slot.findOneAndUpdate(
                    {
                        _id: slot._id,
                        filled: { $lt: slot.capacity },
                        members: { $ne: user._id },
                    },
                    {
                        $inc: { filled: 1 },
                        $push: { members: user._id },
                    },
                    {
                        new: true,
                        session: mongoSession,
                    }
                );

                if (!updatedSlot) {
                    throw new Error(
                        "Booking failed. User already booked into session or session full."
                    );
                }

                user.sessions_left[programId]--;
                await user.save({ session: mongoSession });
            });
        } finally {
            mongoSession.endSession();
        }
    }

    static async cancelBooking(userId: string, slotId: string) {
        const mongoSession = await mongoose.startSession();

        try {
            await mongoSession.withTransaction(async () => {
                const slot = await Slot.findById(slotId).session(mongoSession);
                if (!slot) {
                    throw new Error("Session not found");
                }
                const programId = slot.program.toString();

                const user = await User.findById(userId).session(mongoSession);
                if (!user) {
                    throw new Error("User not found");
                }

                if (!slot.hasUser(user._id)) {
                    throw new Error("User not booked into session.");
                }

                slot.members = slot.members.filter(
                    (member: mongoose.Types.ObjectId) =>
                        !member.equals(user._id)
                );
                slot.filled--;
                user.sessions_left[programId]++;

                await slot.save({ session: mongoSession });
                await user.save({ session: mongoSession });
            });
        } finally {
            mongoSession.endSession();
        }
    }
}
