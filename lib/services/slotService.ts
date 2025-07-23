import mongoose from "mongoose";
import Slot from "@/models/Slot";
import User from "@/models/User";
import { getCurrentISTDate } from "@/lib/dateUtils";

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

                if (!user.isPackageActive(programId)) {
                    throw new Error(
                        "Cannot book. Package for this program not active."
                    );
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

                await user.removeSessions(programId, 1);

                await user.save({ session: mongoSession });
            });
        } finally {
            mongoSession.endSession();
        }
    }
    static async cancelBooking(
        userId: string,
        slotId: string,
        force: boolean = false
    ) {
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

                // Check cancellation time restrictions (unless force is true)
                if (!force) {
                    const currentTimeIST = getCurrentISTDate();
                    const sessionStartTime = new Date(slot.time_start);
                    const timeLeftInHours =
                        (sessionStartTime.getTime() -
                            currentTimeIST.getTime()) /
                        (1000 * 60 * 60);

                    // Get hour in IST to determine if it's morning or evening class
                    const sessionHourIST = sessionStartTime.toLocaleString(
                        "en-US",
                        {
                            timeZone: "Asia/Kolkata",
                            hour12: false,
                            hour: "2-digit",
                        }
                    );
                    const hourIST = parseInt(sessionHourIST);

                    const isMorningClass = hourIST >= 0 && hourIST < 15;
                    const isEveningClass = hourIST >= 15 && hourIST <= 23;

                    if (isMorningClass && timeLeftInHours < 12) {
                        throw new Error(
                            "Cannot cancel morning sessions within 12 hours of start time."
                        );
                    }

                    if (isEveningClass && timeLeftInHours < 6) {
                        throw new Error(
                            "Cannot cancel evening sessions within 6 hours of start time."
                        );
                    }
                }

                slot.members = slot.members.filter(
                    (member: mongoose.Types.ObjectId) =>
                        !member.equals(user._id)
                );
                slot.filled--;

                await user.addSessions(programId, 1);

                await slot.save({ session: mongoSession });
                await user.save({ session: mongoSession });
            });
        } finally {
            mongoSession.endSession();
        }
    }
}
