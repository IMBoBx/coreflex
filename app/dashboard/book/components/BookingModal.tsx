import TimedAlert from "@/components/TimedAlert";
import { FetchApi } from "@/lib/fetchApi";

export default function BookingModal(props: {
    slotId: string;
    program: string;
    time_start: Date | string;
    time_end?: Date | string;
    capacity: number;
    filled: number;
    userId: string;
    isOpen: boolean;
    onClose: () => void;
    onBook?: () => void | Promise<void>;
}) {
    const {
        slotId: slotId,
        program,
        capacity,
        filled,
        userId,
        isOpen,
        onClose,
        onBook,
    } = props;
    const time_start = new Date(props.time_start);
    const time_end = props.time_end ? new Date(props.time_end) : undefined;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-xs md:max-w-md p-6 flex flex-col items-center text-gray-900 min-h-fit md:min-h-0">
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                {/* Slot details */}
                <div className="w-full text-center mb-6 mt-2">
                    <div className="text-lg font-bold mb-2">Book Session</div>
                    <div className="mb-1 text-base font-semibold">
                        {program}
                    </div>
                    <div className="mb-1 text-sm text-gray-700">
                        {time_start.toLocaleDateString([], {
                            dateStyle: "full",
                        })}
                        <br />
                        {time_start.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                        })}
                        {time_end ? (
                            <>
                                {" - "}
                                {time_end.toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                            </>
                        ) : (
                            " onwards"
                        )}
                    </div>
                    {/* <div className="mb-1 text-sm text-gray-600">
                        Capacity:{" "}
                        <span className="font-semibold">{filled}</span> /{" "}
                        {capacity}
                    </div> */}
                </div>
                {/* Book button */}
                <button
                    className="mt-auto w-full px-6 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
                    onClick={onBook}
                >
                    Book Your Slot
                </button>
            </div>
        </div>
    );
}
