import { useEffect, useRef, useState } from "react";

interface TimedAlertProps {
    text: string;
    color: "green" | "red" | "orange";
    duration: number; // seconds
    onClose?: () => void;
}

export default function TimedAlert({
    text,
    color,
    duration,
    onClose,
}: TimedAlertProps) {
    
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const start = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsed = (Date.now() - start) / 1000;
            const percent = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(percent);
            if (elapsed >= duration) {
                setVisible(false);
                if (onClose) onClose();
            }
        }, 30);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [duration, onClose]);

    if (!visible) return null;

    let colorClass = "bg-white ";
    let barClass = "";
    switch (color) {
        case "green":
            colorClass += "text-green-600";
            barClass = "bg-green-400";
            break;
        case "red":
            colorClass += "text-red-600";
            barClass = "bg-red-400";
            break;
        case "orange":
            colorClass += "text-orange-500";
            barClass = "bg-orange-300";
            break;
    }

    return (
        <div className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 w-[90vw] max-w-md flex flex-col items-center">
            <div
                className={`rounded-lg shadow-lg px-4 py-3 mb-1 w-full text-center font-semibold ${colorClass}`}
            >
                {text}
                <div className="h-1 w-full rounded-b-lg overflow-hidden bg-black/10 mt-2">
                    <div
                        className={`h-full transition-all duration-100 ${barClass}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
