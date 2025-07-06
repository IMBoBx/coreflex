"use client";
import { FetchApi } from "@/lib/fetchApi";
import { ISlot } from "@/models/Slot";
import { useEffect, useState } from "react";
import SlotCard from "./SlotCard";
import BookingModal from "./BookingModal";
import TimedAlert from "@/components/TimedAlert";

export default function SlotsCardContainer(props: {
    programId: string;
    name: string;
    description: string;
    date: Date;
}) {
    const { programId: id, name, description, date } = props;
    const [slots, setSlots] = useState<ISlot[]>([]);
    const [morningSlots, setMorningSlots] = useState<ISlot[]>([]);
    const [eveningSlots, setEveningSlots] = useState<ISlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
    const [showAlert, setShowAlert] = useState<null | {
        text: string;
        color: "green" | "red" | "orange";
    }>(null);

    useEffect(() => {
        const fetchSlots = async () => {
            // Format date as YYYY-MM-DD
            const dateStr = date.toISOString().slice(0, 10);
            const res = await FetchApi.get(
                `/slot?programId=${id}&date=${dateStr}&all=true`
            );
            setSlots(res?.data || []);
        };
        fetchSlots();
    }, [id, date]);

    // Group slots by time of day

    useEffect(() => {
        setMorningSlots(
            slots.filter((slot) => {
                const hour = new Date(slot.time_start).getHours();
                return hour >= 0 && hour < 14;
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

    async function handleBook(slotId: string, userId: string) {
        // Replace with real userId as needed
        // const userId = "demo-user";
        const res = await FetchApi.patch(`/slot/${slotId}`, {
            action: "book",
            userId,
        });
        if (res?.data.success == "true") {
            setShowAlert({ text: "Booking successful!", color: "green" });
            setSelectedSlot(null);
            // Optionally refresh slots
            const dateStr = date.toISOString().slice(0, 10);
            const refreshed = await FetchApi.get(
                `/slot?programId=${id}&date=${dateStr}&all=true`
            );
            setSlots(refreshed?.data || []);
        } else {
            setShowAlert({
                text: res?.data.error || "Booking failed",
                color: "red",
            });
        }
    }

    return (
        <div className="p-3 text-center">
            <div className="mb-2 text-left font-bold text-base md:text-lg">
                Morning
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {morningSlots.length === 0 && (
                    <span className="text-gray-400 text-sm">No slots</span>
                )}
                {morningSlots.map((slot) => (
                    <SlotCard
                        key={slot._id + ""}
                        slotId={slot._id + ""}
                        program={name}
                        time_start={slot.time_start}
                        time_end={slot.time_end}
                        capacity={slot.capacity}
                        filled={slot.filled}
                        onClick={() => handleSlotClick(slot)}
                    />
                ))}
            </div>
            <div className="mb-2 text-left font-bold text-base md:text-lg">
                Evening
            </div>
            <div className="flex flex-wrap gap-2">
                {eveningSlots.length === 0 && (
                    <span className="text-gray-400 text-sm">No slots</span>
                )}
                {eveningSlots.map((slot) => (
                    <SlotCard
                        key={slot._id + ""}
                        slotId={slot._id + ""}
                        program={name}
                        time_start={slot.time_start}
                        time_end={slot.time_end}
                        capacity={slot.capacity}
                        filled={slot.filled}
                        onClick={() => handleSlotClick(slot)}
                    />
                ))}
            </div>
            {selectedSlot && (
                <BookingModal
                    slotId={selectedSlot._id + ""}
                    program={name}
                    time_start={selectedSlot.time_start}
                    time_end={selectedSlot.time_end}
                    capacity={selectedSlot.capacity}
                    filled={selectedSlot.filled}
                    userId={"68698a1db1b51e9fa63f74ef"}
                    isOpen={true}
                    onClose={() => setSelectedSlot(null)}
                    onBook={async () => handleBook(selectedSlot._id + "", "68698a1db1b51e9fa63f74ef")}
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
