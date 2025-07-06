"use client";

import { useState } from "react";

export default function SlotCard(props: {
    slotId: string;
    program: string;
    time_start: Date | string;
    time_end?: Date | string;
    capacity: number;
    filled: number;
    onClick?: () => void;
}) {
    const { slotId: id, program, capacity, filled, onClick } = props;
    const time_start = new Date(props.time_start);
    const time_end = props.time_end ? new Date(props.time_end) : undefined;

    function getButtonColor(): string {
        const remaining = capacity - filled;
        if (remaining == 1) {
            return "border-red-400 bg-red-50 hover:bg-red-100";
        } else if (remaining <= capacity / 2) {
            return "border-orange-400 bg-orange-50 hover:bg-orange-100";
        } else {
            return "border-blue-400 bg-blue-50 hover:bg-blue-100";
        }
    }

    function getFontColor(): string {
        const remaining = capacity - filled;
        if (remaining == 1) {
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
                className={`block w-auto text-center rounded-lg border shadow-sm px-3 py-2 my-0 md:mx-2 md:my-0 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${getButtonColor()}`}
                onClick={onClick}
                type="button"
            >
                <span className={`text-base font-semibold ${getFontColor()}`}>
                    {time_start.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                </span>
            </button>
            {capacity - filled === 1 && (
                <div className="mt-1 text-xs text-red-400 font-semibold">
                    Last spot!
                </div>
            )}
        </div>
    );
}
