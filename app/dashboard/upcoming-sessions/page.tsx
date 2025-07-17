"use client";
import { FetchApi } from "@/lib/fetchApi";
import { ISlotPopulated } from "@/models/Slot";
import { useEffect, useState } from "react";
import { CancelModal } from "./components/CancelModal";
import TimedAlert from "@/components/TimedAlert";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
    const [token, setToken] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
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
        // Only access localStorage on the client side
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token") ?? "";
            const storedUserId = localStorage.getItem("userId") ?? "";

            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, []);
    useEffect(() => {
        if (token !== "" && userId !== "") {
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
        <ProtectedRoute allowedRoles={["admin", "client"]}>
            <div className="max-w-sm md:max-w-7xl mx-auto p-2">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    Upcoming Sessions
                </h2>
                <div className="flex flex-wrap justify-baseline gap-2">
                    {slots.length <= 0 && "no slots found"}
                    {slots.length >= 1 &&
                        slots.map((slot) => {
                            return (
                                <div
                                    key={slot._id + ""}
                                    className="flex flex-col w-full md:w-96 h-auto border border-gray-300 rounded-lg shadow-md p-4 mx-3 md:mx-none mb-4 relative"
                                >
                                    <div className="button-and-dropdown relative">
                                        <button
                                            className="absolute top-2 right-2 text-gray-300 cursor-pointer focus:outline-none"
                                            onClick={() =>
                                                setDropdownOpen(
                                                    slot._id.toString()
                                                )
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-7 h-7"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75v.008M12 12v.008M12 17.25v.008"
                                                />
                                            </svg>
                                        </button>
                                        {dropdownOpen ===
                                            slot._id.toString() && (
                                            <div className="absolute top-10 md:-top-8 -right-8 md:-right-15 bg-white border border-gray-300 rounded-xl shadow-md dropdown-menu">
                                                <button
                                                    className="block px-4 py-2 text-md text-red-500  w-full h-12 text-left cursor-pointer"
                                                    onClick={() =>
                                                        handleShowModal(slot)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {modalSlot && (
                                        <CancelModal
                                            slot={modalSlot}
                                            userId={userId}
                                            onClose={() => setModalSlot(null)}
                                            onCancel={() =>
                                                handleCancel(modalSlot)
                                            }
                                        />
                                    )}

                                    <span className="text-lg font-semibold text-purple-400">
                                        {slot.program.name}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {slot.time_start.toLocaleDateString(
                                            [],
                                            {
                                                dateStyle: "full",
                                            }
                                        )}
                                    </span>
                                    <span className="text-sm text-gray-400">
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
                            );
                        })}
                </div>
                {showAlert && (
                    <TimedAlert
                        text={showAlert.text}
                        duration={3}
                        color={showAlert.color}
                    />
                )}
            </div>
        </ProtectedRoute>
    );
}
