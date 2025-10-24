"use client";
import { FetchApi } from "@/lib/fetchApi";
import { IProgram } from "@/models/Program";
import { useAuth } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import {
    IST_TIMEZONE,
    calculateEndTime,
    createISTDateTime,
} from "@/lib/dateUtils";

interface CreateSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onAlert: (alert: {
        text: string;
        color: "green" | "red" | "orange";
    }) => void;
}

interface StartTime {
    id: string;
    time: string;
}

export default function CreateSessionModal({
    isOpen,
    onClose,
    onSuccess,
    onAlert,
}: CreateSessionModalProps) {
    const { token } = useAuth();
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);

    // Form state
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toLocaleDateString("en-CA", { timeZone: IST_TIMEZONE })
    );
    const [startTimes, setStartTimes] = useState<StartTime[]>([]);
    const [currentTimeInput, setCurrentTimeInput] = useState<string>("");
    const [duration, setDuration] = useState<number>(60); // Default 60 minutes
    const [capacity, setCapacity] = useState<number>(1);

    useEffect(() => {
        if (isOpen) {
            fetchPrograms();
            // Reset form
            setSelectedProgram("");
            setSelectedDate(
                new Date().toLocaleDateString("en-CA", {
                    timeZone: IST_TIMEZONE,
                })
            );
            setStartTimes([]);
            setCurrentTimeInput("");
            setDuration(60);
            setCapacity(1);
        }
    }, [isOpen]);

    const fetchPrograms = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await FetchApi.get("/program", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data && Array.isArray(res.data)) {
                setPrograms(res.data);
            }
        } catch (error) {
            onAlert({ text: "Failed to load programs", color: "red" });
        } finally {
            setLoading(false);
        }
    };

    const addStartTime = () => {
        if (!currentTimeInput.trim()) {
            onAlert({ text: "Please enter a start time", color: "orange" });
            return;
        }

        // Check if time already exists
        if (startTimes.some((st) => st.time === currentTimeInput)) {
            onAlert({ text: "This time is already added", color: "orange" });
            return;
        }

        const newStartTime: StartTime = {
            id: Date.now().toString(),
            time: currentTimeInput,
        };

        setStartTimes([...startTimes, newStartTime]);
        setCurrentTimeInput("");
    };

    const removeStartTime = (id: string) => {
        setStartTimes(startTimes.filter((st) => st.id !== id));
    };

    const handleCreateSessions = async () => {
        // Validation
        if (!selectedProgram) {
            onAlert({ text: "Please select a program", color: "orange" });
            return;
        }
        if (!selectedDate) {
            onAlert({ text: "Please select a date", color: "orange" });
            return;
        }
        if (startTimes.length === 0) {
            onAlert({
                text: "Please add at least one start time",
                color: "orange",
            });
            return;
        }
        if (duration <= 0) {
            onAlert({
                text: "Duration must be greater than 0",
                color: "orange",
            });
            return;
        }
        if (capacity <= 0) {
            onAlert({
                text: "Capacity must be greater than 0",
                color: "orange",
            });
            return;
        }

        setCreating(true);
        let successCount = 0;
        let errorCount = 0;

        try {
            // Create sessions for each start time
            for (const startTime of startTimes) {
                try {
                    const startDateTime = createISTDateTime(
                        selectedDate,
                        startTime.time
                    );
                    const endDateTime = calculateEndTime(
                        startDateTime,
                        duration
                    );

                    const res = await FetchApi.post(
                        "/slot",
                        {
                            program: selectedProgram,
                            time_start: startDateTime,
                            time_end: endDateTime,
                            capacity: capacity,
                            filled: 0,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (res?.data && !res.data.error) {
                        successCount++;
                    } else {
                        errorCount++;
                        console.error(
                            `Failed to create session at ${startTime.time}:`,
                            res?.data?.error
                        );
                    }
                } catch (error) {
                    errorCount++;
                    console.error(
                        `Error creating session at ${startTime.time}:`,
                        error
                    );
                }
            }

            // Show result message
            if (successCount > 0 && errorCount === 0) {
                onAlert({
                    text: `Successfully created ${successCount} session${
                        successCount > 1 ? "s" : ""
                    }`,
                    color: "green",
                });
                onSuccess();
                onClose();
            } else if (successCount > 0 && errorCount > 0) {
                onAlert({
                    text: `Created ${successCount} sessions, ${errorCount} failed`,
                    color: "orange",
                });
                onSuccess();
            } else {
                onAlert({
                    text: "Failed to create sessions",
                    color: "red",
                });
            }
        } catch (error) {
            onAlert({ text: "Error creating sessions", color: "red" });
        } finally {
            setCreating(false);
        }
    };

    if (!isOpen) return null;

    const selectedProgramName =
        programs.find((p) => p._id.toString() === selectedProgram)?.name || "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/93"
                onClick={onClose}
            ></div>
            <div className="relative mt-10 bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Create New Sessions
                            </h2>
                            <p className="text-sm text-gray-600">
                                Add multiple sessions for a program
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                        >
                            &times;
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">
                                Loading programs...
                            </span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Program Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Program
                                </label>
                                <select
                                    value={selectedProgram}
                                    onChange={(e) =>
                                        setSelectedProgram(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select a program</option>
                                    {programs.map((program) => (
                                        <option
                                            key={program._id.toString()}
                                            value={program._id.toString()}
                                        >
                                            {program.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Start Times */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Times
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="time"
                                        value={currentTimeInput}
                                        onChange={(e) =>
                                            setCurrentTimeInput(e.target.value)
                                        }
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        onClick={addStartTime}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Added Start Times List */}
                                {startTimes.length > 0 && (
                                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                                        {startTimes.map((startTime) => (
                                            <div
                                                key={startTime.id}
                                                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                                            >
                                                <span className="text-sm font-medium">
                                                    {new Date(
                                                        `2000-01-01T${startTime.time}:00`
                                                    ).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        removeStartTime(
                                                            startTime.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 text-sm px-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    step="5"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    End time will be calculated automatically
                                </p>
                            </div>

                            {/* Capacity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={capacity}
                                    onChange={(e) =>
                                        setCapacity(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Preview */}
                            {selectedProgramName &&
                                selectedDate &&
                                startTimes.length > 0 && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                                        <h4 className="text-sm font-medium text-blue-900 mb-2">
                                            Preview
                                        </h4>
                                        <p className="text-xs text-blue-700 mb-2">
                                            <strong>
                                                {selectedProgramName}
                                            </strong>{" "}
                                            on{" "}
                                            <strong>
                                                {new Date(
                                                    selectedDate + "T12:00:00"
                                                ).toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </strong>
                                        </p>
                                        <div className="space-y-1">
                                            {startTimes.map((startTime) => {
                                                const start = new Date(
                                                    `2000-01-01T${startTime.time}:00`
                                                );
                                                const end = calculateEndTime(
                                                    start,
                                                    duration
                                                );
                                                return (
                                                    <div
                                                        key={startTime.id}
                                                        className="text-xs text-blue-600"
                                                    >
                                                        {start.toLocaleTimeString(
                                                            "en-US",
                                                            {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            }
                                                        )}{" "}
                                                        -{" "}
                                                        {end.toLocaleTimeString(
                                                            "en-US",
                                                            {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            }
                                                        )}{" "}
                                                        (Capacity: {capacity})
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateSessions}
                            disabled={
                                creating ||
                                startTimes.length === 0 ||
                                !selectedProgram
                            }
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {creating
                                ? "Creating..."
                                : `Create ${startTimes.length} Session${
                                      startTimes.length !== 1 ? "s" : ""
                                  }`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
