import React, { useRef, useState } from "react";

interface DateScrollerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    days?: number;
}

const getDateArray = (days: number) => {
    const arr = [];
    const today = new Date();
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
    const [scrollIndex, setScrollIndex] = useState(0);
    const visibleCount = 4; // Number of dates visible at once (mobile-first)
    const scrollStep = 3; // Scroll 3 days per click
    const scrollerRef = useRef<HTMLDivElement>(null);
    const maxIndex = Math.max(0, dateArray.length - visibleCount);

    const handleScroll = (dir: "left" | "right") => {
        let newIndex =
            scrollIndex + (dir === "left" ? -scrollStep : scrollStep);
        newIndex = Math.max(0, Math.min(newIndex, maxIndex));
        setScrollIndex(newIndex);
        if (scrollerRef.current) {
            const width = scrollerRef.current.offsetWidth / visibleCount;
            scrollerRef.current.scrollTo({
                left: newIndex * width,
                behavior: "smooth",
            });
        }
    };

    // SVG icons for arrows (Heroicons, MIT License)
    const LeftIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
    const RightIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    );

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
                                date.toDateString() ===
                                selectedDate.toDateString()
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                            }`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <span className="font-bold text-lg md:text-xl">
                                {date.getDate()}
                            </span>
                            <span>
                                {date.toLocaleString("default", {
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
