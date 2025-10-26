import { FetchApi } from "@/lib/fetchApi";
import { ISlotPopulated } from "@/models/Slot";

export function CancelModal({
    slot,
    userId,
    onClose,
    onCancel
}: {
    slot: ISlotPopulated;
    userId: string;
    onClose: () => void;
    onCancel: () => void;
}) {
    // const isMorningSession = slot.time_start.getHours() < 12;
    // const timeLeft =
    //     (slot.time_start.getTime() - Date.now()) / (1000 * 60 * 60); // Time left in hours

    // const canCancel = isMorningSession ? timeLeft > 12 : timeLeft > 6;


    return (
        <div className="fixed top-0 left-0 modal-bg w-screen h-screen bg-black/40 flex items-center justify-center z-10">
            <div className="modal flex flex-col bg-white p-6 rounded-lg shadow-lg w-9/10 md:w-1/3">
                <div className="text-black text-xl mb-4">
                    Are you sure you want to cancel this booking?
                </div>

                <div className="text-red-500 text-sm mb-4">
                    Note: Morning sessions cannot be cancelled within 12 hours
                    of the start time, and evening sessions cannot be cancelled
                    within 6 hours.
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        onClick={() =>
                            onCancel()
                        }
                    >
                        Cancel Booking
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={() => onClose()}
                    >
                        Don't Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
