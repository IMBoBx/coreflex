"use client";
import { FetchApi } from "@/lib/fetchApi";
import { ISlot } from "@/models/Slot";
import { IUser } from "@/models/User";
import { useAuth } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { IST_TIMEZONE } from "@/lib/dateUtils";

interface AdminSessionModalProps {
    slot: ISlot;
    programName: string;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    onAlert: (alert: {
        text: string;
        color: "green" | "red" | "orange";
    }) => void;
}

export default function AdminSessionModal({
    slot,
    programName,
    isOpen,
    onClose,
    onUpdate,
    onAlert,
}: AdminSessionModalProps) {
    const { token } = useAuth();
    const [members, setMembers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editableSlot, setEditableSlot] = useState({
        capacity: slot.capacity,
        filled: slot.filled,
        time_start: slot.time_start,
        time_end: slot.time_end,
        date: new Date(slot.time_start).toLocaleDateString("en-CA", {
            timeZone: IST_TIMEZONE,
        }), // YYYY-MM-DD format
    });
    const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    useEffect(() => {
        if (isOpen && slot) {
            fetchSlotMembers();
            setEditableSlot({
                capacity: slot.capacity,
                filled: slot.filled,
                time_start: slot.time_start,
                time_end: slot.time_end,
                date: new Date(slot.time_start).toLocaleDateString("en-CA", {
                    timeZone: IST_TIMEZONE,
                }),
            });
            setIsEditing(false);
            setConfirmRemove(null);
            setConfirmDelete(false);
        }
    }, [isOpen, slot]);

    const fetchSlotMembers = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await FetchApi.get(`/slot/${slot._id}?populate=true`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data) {
                setMembers(res.data.members || []);
            }
        } catch (error) {
            onAlert({ text: "Failed to load session details", color: "red" });
        } finally {
            setLoading(false);
        }
    };
    const handleRemoveMember = async (userId: string) => {
        if (!token) return;
        try {
            const res = await FetchApi.patch(
                `/slot/${slot._id}`,
                {
                    action: "cancel",
                    userId: userId,
                    force: "true",
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res?.data.success) {
                onAlert({
                    text: "Removed successfully",
                    color: "green",
                });
                onUpdate();
                fetchSlotMembers();
                setConfirmRemove(null);
            } else {
                onAlert({
                    text: res?.data.error || "Failed to remove member",
                    color: "red",
                });
            }
        } catch (error) {
            onAlert({ text: "Failed to remove member", color: "red" });
        }
    };
    const handleSave = async () => {
        if (!token) return;
        try {
            // Create new dates with the selected date and times
            const startDate = new Date(editableSlot.time_start);
            const endDate = editableSlot.time_end
                ? new Date(editableSlot.time_end)
                : null;

            // If date changed, update both start and end dates
            const selectedDateStr = editableSlot.date;
            const originalDateStr = new Date(
                slot.time_start
            ).toLocaleDateString("en-CA", {
                timeZone: IST_TIMEZONE,
            });

            if (selectedDateStr !== originalDateStr) {
                // Parse the new date and combine with existing times
                const [year, month, day] = selectedDateStr
                    .split("-")
                    .map(Number);

                // Update start time with new date
                startDate.setFullYear(year, month - 1, day);

                // Update end time with new date if it exists
                if (endDate) {
                    endDate.setFullYear(year, month - 1, day);
                }
            }

            const res = await FetchApi.patch(
                `/slot/${slot._id}`,
                {
                    action: "update",
                    capacity: editableSlot.capacity,
                    filled: editableSlot.filled,
                    time_start: startDate,
                    time_end: endDate,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res?.data.success) {
                onAlert({
                    text: "Session updated successfully",
                    color: "green",
                });
                onUpdate();
                setIsEditing(false);
            } else {
                onAlert({
                    text: res?.data.error || "Failed to update session",
                    color: "red",
                });
            }
        } catch (error) {
            onAlert({ text: "Failed to update session", color: "red" });
        }
    };
    const handleCancel = () => {
        setEditableSlot({
            capacity: slot.capacity,
            filled: slot.filled,
            time_start: slot.time_start,
            time_end: slot.time_end,
            date: new Date(slot.time_start).toLocaleDateString("en-CA", {
                timeZone: IST_TIMEZONE,
            }),
        });
        setIsEditing(false);
    };

    const handleDeleteSession = async () => {
        if (!token) return;
        try {
            const res = await FetchApi.delete(`/slot/${slot._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res?.data.success) {
                onAlert({
                    text: "Session deleted successfully",
                    color: "green",
                });
                onUpdate();
                onClose();
            } else {
                onAlert({
                    text: res?.data.error || "Failed to delete session",
                    color: "red",
                });
            }
        } catch (error) {
            onAlert({ text: "Failed to delete session", color: "red" });
        } finally {
            setConfirmDelete(false);
        }
    };

    if (!isOpen) return null;

    const timeStart = new Date(slot.time_start);
    const timeEnd = slot.time_end ? new Date(slot.time_end) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/93"
                onClick={onClose}
            ></div>
            <div className="relative mt-10 bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[85vh] overflow-y-auto">
                <div className="p-6">
                    {" "}
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Session Details
                            </h2>
                            <p className="text-sm text-gray-600">
                                {programName}
                            </p>
                        </div>{" "}
                        <div className="flex items-center gap-2">
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-300 rounded-md hover:bg-blue-50 transition"
                                    >
                                        Edit
                                    </button>
                                    {!confirmDelete ? (
                                        <button
                                            onClick={() =>
                                                setConfirmDelete(true)
                                            }
                                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded-md hover:bg-red-50 transition"
                                        >
                                            Delete
                                        </button>
                                    ) : (
                                        <div className="flex gap-1">
                                            <span className="px-2 py-1 text-xs text-gray-600">
                                                Sure?
                                            </span>
                                            <button
                                                onClick={handleDeleteSession}
                                                className="px-2 py-1 text-xs text-white bg-red-600 hover:bg-red-700 rounded-md transition"
                                            >
                                                Yes
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setConfirmDelete(false)
                                                }
                                                className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                                            >
                                                No
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                            >
                                &times;
                            </button>
                        </div>
                    </div>{" "}
                    {/* Session Info - Simplified */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Session Information
                        </h3>

                        {/* Date Input */}
                        <div className="flex flex-row">
                            <label className="text-sm font-medium text-gray-700 mb-2 w-30 text-left content-center">
                                Date
                            </label>
                            <input
                                type="date"
                                value={editableSlot.date}
                                onChange={(e) =>
                                    setEditableSlot({
                                        ...editableSlot,
                                        date: e.target.value,
                                    })
                                }
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            />
                        </div>

                        {/* Start Time Input */}
                        <div className="flex flex-row">
                            <label className="text-sm font-medium text-gray-700 mb-2  w-30 text-left content-center">
                                Start Time
                            </label>
                            <input
                                type="time"
                                value={new Date(
                                    editableSlot.time_start
                                ).toLocaleTimeString("en-CA", {
                                    hour12: false,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                onChange={(e) => {
                                    const timeValue = e.target.value;
                                    const [hours, minutes] =
                                        timeValue.split(":");
                                    const newDate = new Date(
                                        editableSlot.time_start
                                    );
                                    newDate.setHours(
                                        parseInt(hours),
                                        parseInt(minutes),
                                        0,
                                        0
                                    );
                                    setEditableSlot({
                                        ...editableSlot,
                                        time_start: newDate,
                                    });
                                }}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            />
                        </div>

                        {/* End Time Input */}
                        {editableSlot.time_end && (
                            <div className="flex flex-row">
                                <label className="text-sm font-medium text-gray-700 mb-2  w-30 text-left content-center">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    value={new Date(
                                        editableSlot.time_end
                                    ).toLocaleTimeString("en-CA", {
                                        hour12: false,
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    onChange={(e) => {
                                        const timeValue = e.target.value;
                                        const [hours, minutes] =
                                            timeValue.split(":");
                                        const newDate = new Date(
                                            editableSlot.time_end!
                                        );
                                        newDate.setHours(
                                            parseInt(hours),
                                            parseInt(minutes),
                                            0,
                                            0
                                        );
                                        setEditableSlot({
                                            ...editableSlot,
                                            time_end: newDate,
                                        });
                                    }}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                />
                            </div>
                        )}

                        {/* Capacity Input */}
                        <div className="flex flex-row">
                            <label className="text-sm font-medium text-gray-700 mb-2  w-30 text-left content-center">
                                Capacity
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={editableSlot.capacity}
                                onChange={(e) =>
                                    setEditableSlot({
                                        ...editableSlot,
                                        capacity: parseInt(e.target.value) || 1,
                                    })
                                }
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            />
                        </div>

                        {/* Filled Input */}
                        <div className="flex flex-row">
                            <label className="text-sm font-medium text-gray-700 mb-2  w-30 text-left content-center">
                                Filled
                            </label>
                            <input
                                type="number"
                                min="0"
                                max={editableSlot.capacity}
                                value={editableSlot.filled}
                                onChange={(e) =>
                                    setEditableSlot({
                                        ...editableSlot,
                                        filled: parseInt(e.target.value) || 0,
                                    })
                                }
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            />
                        </div>
                    </div>{" "}
                    {/* Members List */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Registered Clients ({slot.members.length})
                            {editableSlot.filled !== slot.members.length &&
                                ` + Trial/Other Clients (${
                                    editableSlot.filled - slot.members.length
                                })`}
                        </h3>

                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className="ml-2 text-gray-600">
                                    Loading members...
                                </span>
                            </div>
                        ) : members.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No members registered yet
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {members.map((member) => (
                                    <div
                                        key={member._id.toString()}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {member.username ||
                                                    "Unknown User"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {member.phone || "No phone"}
                                            </p>
                                        </div>
                                        {confirmRemove ===
                                        member._id.toString() ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-600">
                                                    Sure?
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveMember(
                                                            member._id.toString()
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded-md hover:bg-red-50 border border-red-300 hover:border-red-400 transition"
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setConfirmRemove(null)
                                                    }
                                                    className="text-gray-600 hover:text-gray-800 text-xs font-medium px-2 py-1 rounded-md hover:bg-gray-50 border border-gray-300 hover:border-gray-400 transition"
                                                >
                                                    No
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    setConfirmRemove(
                                                        member._id.toString()
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 border border-red-300 hover:border-red-400 transition"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
