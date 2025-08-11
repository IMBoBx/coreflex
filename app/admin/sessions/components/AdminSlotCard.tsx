"use client";
import mongoose from "mongoose";
import { IST_TIMEZONE } from "@/lib/dateUtils";

export default function AdminSlotCard(props: {
    slotId: string;
    program: string;
    time_start: Date | string;
    time_end?: Date | string;
    capacity: number;
    filled: number;
    onClick?: () => void;
    members: mongoose.Types.ObjectId[];
}) {
    const { capacity, filled, onClick } = props;
    const time_start = new Date(props.time_start);

    function getCardStyle(): string {
        const remaining = capacity - filled;

        if (remaining === 0) {
            return "border-green-400 bg-green-50 hover:bg-green-100";
        } else if (remaining === 1) {
            return "border-red-400 bg-red-50 hover:bg-red-100";
        } else if (remaining <= capacity / 2) {
            return "border-orange-400 bg-orange-50 hover:bg-orange-100";
        } else {
            return "border-blue-400 bg-blue-50 hover:bg-blue-100";
        }
    }

    function getTextColor(): string {
        const remaining = capacity - filled;

        if (remaining === 0) {
            return "text-green-600";
        } else if (remaining === 1) {
            return "text-red-600";
        } else if (remaining <= capacity / 2) {
            return "text-orange-600";
        } else {
            return "text-blue-700";
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button
                className={`block w-28 text-center rounded-lg border shadow-sm px-3 py-2 my-0 md:my-0 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${getCardStyle()}`}
                onClick={() => {
                    if (onClick) {onClick()}
                    console.log(time_start)
                }}
                type="button"
            >
                {" "}
                <span className={`text-base font-semibold ${getTextColor()}`}>
                    {time_start.toLocaleTimeString("en-IN", {
                        timeZone: IST_TIMEZONE,
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </span>
            </button>
            <div className={`mt-1 text-xs font-semibold ${getTextColor()}`}>
                {filled}/{capacity}
            </div>
        </div>
    );
}
