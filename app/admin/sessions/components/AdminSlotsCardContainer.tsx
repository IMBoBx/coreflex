"use client";
import { FetchApi } from "@/lib/fetchApi";
import { ISlot } from "@/models/Slot";
import { useEffect, useState } from "react";
import AdminSlotCard from "./AdminSlotCard";
import AdminSessionModal from "./AdminSessionModal";
import TimedAlert from "@/components/TimedAlert";
import { useAuth } from "@/components/ProtectedRoute";

export default function AdminSlotsCardContainer(props: {
    programId: string;
    name: string;
    description: string;
    date: Date;
}) {
    const { programId: id, name, description, date } = props;
    const { token } = useAuth();
    const [slots, setSlots] = useState<ISlot[]>([]);
    const [morningSlots, setMorningSlots] = useState<ISlot[]>([]);
    const [eveningSlots, setEveningSlots] = useState<ISlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
    const [showAlert, setShowAlert] = useState<null | {
        text: string;
        color: "green" | "red" | "orange";
    }>(null);

    const fetchSlots = async () => {
        if (!token) return;
        // Format date as YYYY-MM-DD
        const dateStr = date.toISOString().slice(0, 10);
        const res = await FetchApi.get(
            `/slot?programId=${id}&date=${dateStr}&all=true`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setSlots(res?.data || []);
    };

    useEffect(() => {
        fetchSlots();
    }, [id, date, token]);

    // Group slots by time of day
    useEffect(() => {
        setMorningSlots(
            slots.filter((slot) => {
                const hour = new Date(slot.time_start).getHours();
                return hour >= 0 && hour <= 14;
            })
        );

        setEveningSlots(
            slots.filter((slot) => {
                const hour = new Date(slot.time_start).getHours();
                return hour >= 15 && hour <= 24;
            })
        );
    }, [slots]);

    function handleSlotClick(slot: ISlot) {
        setSelectedSlot(slot);
    }

    const refreshSlots = () => {
        fetchSlots();
    };

    return (
        <div className="p-3 text-center">
            <div className="mb-2 text-center md:text-left font-bold text-base md:text-lg">
                Morning
            </div>
            <div className="flex flex-wrap justify-center md:justify-normal gap-x-6 gap-y-4 mb-4">
                {morningSlots.length === 0 && (
                    <span className="text-gray-400 text-sm">No slots yet</span>
                )}
                {morningSlots.map((slot) => (
                    <AdminSlotCard
                        key={slot._id + ""}
                        slotId={slot._id + ""}
                        program={name}
                        time_start={slot.time_start}
                        time_end={slot.time_end}
                        capacity={slot.capacity}
                        filled={slot.filled}
                        onClick={() => handleSlotClick(slot)}
                        members={slot.members}
                    />
                ))}
            </div>
            <div className="mb-2 text-center md:text-left font-bold text-base md:text-lg">
                Evening
            </div>
            <div className="flex flex-wrap justify-center md:justify-normal gap-x-6 gap-y-4 md:gap-3.5">
                {eveningSlots.length === 0 && (
                    <span className="text-gray-400 text-sm">No slots yet</span>
                )}
                {eveningSlots.map((slot) => (
                    <AdminSlotCard
                        key={slot._id + ""}
                        slotId={slot._id + ""}
                        program={name}
                        time_start={slot.time_start}
                        time_end={slot.time_end}
                        capacity={slot.capacity}
                        filled={slot.filled}
                        onClick={() => handleSlotClick(slot)}
                        members={slot.members}
                    />
                ))}
            </div>
            {selectedSlot && (
                <AdminSessionModal
                    slot={selectedSlot}
                    programName={name}
                    isOpen={true}
                    onClose={() => setSelectedSlot(null)}
                    onUpdate={refreshSlots}
                    onAlert={setShowAlert}
                />
            )}
            {showAlert && (
                <TimedAlert
                    text={showAlert.text}
                    color={showAlert.color}
                    duration={3}
                    onClose={() => setShowAlert(null)}
                />
            )}
        </div>
    );
}
