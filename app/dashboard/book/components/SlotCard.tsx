"use client";

import mongoose from "mongoose";
import { useState } from "react";

export default function SlotCard(props: {
    slotId: string;
    program: string;
    time_start: Date | string;
    time_end?: Date | string;
    capacity: number;
    filled: number;
    onClick?: () => void;
    members: mongoose.Types.ObjectId[];
    userId: string;
}) {
    const { capacity, filled, onClick, members, userId } = props;
    const time_start = new Date(props.time_start);

    const checkBooked = () => {
        for (let user of members) {
            if (user.toString() === userId) {
                return true;
            }
        }
        return false;
    };

    const booked = checkBooked();

    function getButtonColor(): string {
        if (booked) {
            return "border-green-400 bg-green-50 hover:bg-green-100 disabled";
        }

        const remaining = capacity - filled;
        if (remaining == 0) {
            return "border-gray-400 bg-gray-50 hover:bg-gray-100 disabled";
        } else if (remaining == 1) {
            return "border-red-400 bg-red-50 hover:bg-red-100";
        } else if (remaining <= capacity / 2) {
            return "border-orange-400 bg-orange-50 hover:bg-orange-100";
        } else {
            return "border-blue-400 bg-blue-50 hover:bg-blue-100";
        }
    }

    function getFontColor(): string {
        if (booked) {
            return "text-green-600";
        }

        const remaining = capacity - filled;

        if (remaining == 0) {
            return "text-gray-600";
        } else if (remaining == 1) {
            return "text-red-600";
        } else if (remaining <= capacity / 2) {
            return "text-orange-500";
        } else {
            return "text-blue-700";
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button
                className={`block w-28 text-center rounded-lg border shadow-sm px-3 py-2 my-0 md:my-0 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${getButtonColor()}`}
                onClick={onClick}
                type="button"
                disabled={booked || capacity - filled === 0}
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
            {capacity - filled <= capacity / 2 && capacity - filled !== 1 && (
                <div className="mt-1 text-xs text-orange-500 font-semibold">
                    Filling Fast!
                </div>
            )}
            {booked && (
                <div className="mt-1 text-xs text-green-600 font-semibold">
                    Booked
                </div>
            )}
            {capacity - filled === 0 && !booked && (
                <div className="mt-1 text-xs text-gray-400 font-semibold">
                    Slot full
                </div>
            )}
        </div>
    );
}
