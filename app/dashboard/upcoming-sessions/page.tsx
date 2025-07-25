"use client";
import { FetchApi } from "@/lib/fetchApi";
import { ISlotPopulated } from "@/models/Slot";
import { useEffect, useState } from "react";
import { CancelModal } from "./components/CancelModal";
import TimedAlert from "@/components/TimedAlert";
import { useAuth } from "@/components/ProtectedRoute";

export default function Page() {
    const { token, userId } = useAuth();
    const [slots, setSlots] = useState<ISlotPopulated[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [modalSlot, setModalSlot] = useState<ISlotPopulated | null>(null);
    const [showAlert, setShowAlert] = useState<null | {
        text: string;
        color: "green" | "red" | "orange";
    }>(null);
    const fetchSlots = async (userId: string, authToken: string) => {
        try {
            const res = await FetchApi.get(
                `/slot?userId=${userId}&populated=true&all=true`,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            if (res?.data && Array.isArray(res.data)) {
                const populatedSlots = res.data.map((slot: any) => ({
                    ...slot,
                    time_start: new Date(slot.time_start),
                    time_end: slot.time_end
                        ? new Date(slot.time_end)
                        : undefined,
                }));
                setSlots(populatedSlots);
            } else {
                console.error("Invalid response format:", res);
                setSlots([]);
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
            setSlots([]);
        }
    };
    useEffect(() => {
        if (token && userId) {
            fetchSlots(userId, token);
        }
    }, [token, userId]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".dropdown-menu")) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleShowModal(slot: ISlotPopulated) {
        setDropdownOpen(null);
        setModalSlot(slot);
    }
    async function handleCancel(slot: ISlotPopulated) {
        if (!token || !userId) return;

        const res = await FetchApi.patch(
            `/slot/${slot._id + ""}`,
            {
                action: "cancel",
                userId: userId,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res?.data.success === true) {
            setShowAlert({
                text: "Booking cancelled successfully",
                color: "green",
            });

            fetchSlots(userId, token);

            setModalSlot(null);
            return;
        }

        setShowAlert({
            text:
                res?.data.error ??
                "Some error occurred, booking not cancelled.",
            color: "red",
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-sm md:max-w-7xl mx-auto p-4 md:p-6">
                {/* Header */}
                <div className="mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                        Upcoming Sessions
                    </h2>
                    <p className="text-gray-600 text-center text-sm md:text-base">
                        View and manage your scheduled sessions
                    </p>
                </div>

                {/* Sessions Grid */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {slots.length <= 0 && (
                        <div className="w-full text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <svg
                                    className="mx-auto h-16 w-16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4h3a2 2 0 012 2v2M8 7H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-5 0V7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No sessions scheduled
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">
                                You don't have any upcoming sessions.
                            </p>
                            <a
                                href="/dashboard/book"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Book a Session
                            </a>
                        </div>
                    )}
                    {slots.length >= 1 &&
                        slots.map((slot) => {
                            return (
                                <div
                                    key={slot._id + ""}
                                    className="w-full md:w-80 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden relative"
                                >
                                    {/* Action Menu Button */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <button
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={() =>
                                                setDropdownOpen(
                                                    dropdownOpen ===
                                                        slot._id.toString()
                                                        ? null
                                                        : slot._id.toString()
                                                )
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75v.008M12 12v.008M12 17.25v.008"
                                                />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen ===
                                            slot._id.toString() && (
                                            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dropdown-menu z-30 min-w-[120px]">
                                                <button
                                                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    onClick={() =>
                                                        handleShowModal(slot)
                                                    }
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {/* Modal */}{" "}
                                    {modalSlot && userId && (
                                        <CancelModal
                                            slot={modalSlot}
                                            userId={userId}
                                            onClose={() => setModalSlot(null)}
                                            onCancel={() =>
                                                handleCancel(modalSlot)
                                            }
                                        />
                                    )}
                                    {/* Card Content */}
                                    <div className="p-6">
                                        {/* Program Badge */}
                                        <div className="mb-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                {slot.program.name}
                                            </span>
                                        </div>

                                        {/* Date and Time */}
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-700">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium">
                                                    {slot.time_start.toLocaleDateString(
                                                        [],
                                                        {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center text-gray-700">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium">
                                                    {slot.time_start.toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour12: true,
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status indicator */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                                <span className="text-xs text-gray-600 font-medium">
                                                    Confirmed
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* Alert */}
                {showAlert && (
                    <TimedAlert
                        text={showAlert.text}
                        duration={3}
                        color={showAlert.color}
                    />
                )}
            </div>
        </div>
    );
}
