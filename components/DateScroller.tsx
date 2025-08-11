import React, { useRef } from "react";
import { getCurrentISTDate, IST_TIMEZONE } from "@/lib/dateUtils";

interface DateScrollerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    days?: number;
}

const getDateArray = (days: number) => {
    const arr = [];
    const today = getCurrentISTDate(); // Use IST current date
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        arr.push(d);
    }
    return arr;
};

export default function DateScroller({
    selectedDate,
    setSelectedDate,
    days = 30,
}: DateScrollerProps) {
    const dateArray = getDateArray(days);
    const scrollerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="mb-4">
            <div
                className="flex-1 overflow-x-auto scrollbar-hide no-scrollbar"
                style={{ minWidth: 0 }}
            >
                <div ref={scrollerRef} className="flex gap-1">
                    {dateArray.map((date) => (
                        <button
                            key={date.toISOString()}
                            className={`flex flex-col justify-center items-center px-2 py-1 h-18 min-w-12 md:min-w-14 rounded border transition text-xs md:text-sm ${
                                date.toLocaleDateString("en-CA", {
                                    timeZone: IST_TIMEZONE,
                                }) ===
                                selectedDate.toLocaleDateString("en-CA", {
                                    timeZone: IST_TIMEZONE,
                                })
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                            }`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <span className="font-bold text-lg md:text-xl">
                                {date.toLocaleDateString("en-US", {
                                    timeZone: IST_TIMEZONE,
                                    day: "numeric",
                                })}
                            </span>
                            <span>
                                {date.toLocaleDateString("en-US", {
                                    timeZone: IST_TIMEZONE,
                                    month: "short",
                                })}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
