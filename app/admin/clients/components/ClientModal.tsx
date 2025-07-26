"use client";

import { IUserPopulated } from "@/models/User";
import { IProgram } from "@/models/Program";
import { FetchApi } from "@/lib/fetchApi";
import { useAuth } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";

interface IPackageDetail {
    programId: string;
    sessions_left: number;
    start_date: string;
    end_date: string;
}

export default function ClientModal({
    client,
    isOpen,
    onClose,
    onSave,
}: {
    client: IUserPopulated;
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => Promise<void>;
}) {
    const { token } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [loading, setLoading] = useState(true);

    // Editable client data
    const [editableClient, setEditableClient] = useState({
        username: client.username,
        email: client.email,
        phone: client.phone,
    });
    const [editablePackages, setEditablePackages] = useState<IPackageDetail[]>(
        () => {
            if (!client.package_details) return [];
            if (Array.isArray(client.package_details)) {
                // Convert the array format to our interface format
                return client.package_details
                    .filter((pkg) => pkg.programId) // Only include packages with valid programId
                    .map((pkg) => ({
                        programId: pkg.programId,
                        sessions_left: pkg.sessions_left || 0,
                        start_date:
                            pkg.start_date ||
                            new Date().toISOString().split("T")[0],
                        end_date:
                            pkg.end_date ||
                            new Date().toISOString().split("T")[0],
                    }));
            }
            return [];
        }
    );

    useEffect(() => {
        if (isOpen && token) {
            fetchPrograms();
        }
    }, [isOpen, token]);

    const fetchPrograms = async () => {
        try {
            const res = await FetchApi.get("/program", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data && Array.isArray(res.data)) {
                setPrograms(res.data);
            } else {
                console.error("Failed to fetch programs:", res?.data);
                setPrograms([]);
            }
        } catch (error) {
            console.error("Error fetching programs:", error);
            setPrograms([]);
        } finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        try {
            // Convert editablePackages array back to Map format for Mongoose
            const packageDetailsMap: Record<string, any> = {};
            editablePackages.forEach((pkg) => {
                // Ensure we have a valid programId and meaningful data
                if (
                    pkg.programId &&
                    pkg.programId.trim() !== "" &&
                    (pkg.sessions_left > 0 || pkg.start_date || pkg.end_date)
                ) {
                    packageDetailsMap[pkg.programId] = {
                        program: pkg.programId,
                        sessions_left: Number(pkg.sessions_left) || 0,
                        start_date: pkg.start_date
                            ? new Date(pkg.start_date).toISOString()
                            : new Date().toISOString(),
                        end_date: pkg.end_date
                            ? new Date(pkg.end_date).toISOString()
                            : new Date().toISOString(),
                    };
                }
            });

            // Prepare the update payload
            const updatePayload = {
                username: editableClient.username,
                email: editableClient.email,
                phone: editableClient.phone,
                package_details: packageDetailsMap,
            };

            // Send update request using PATCH method
            const res = await FetchApi.patch(
                `/user/${client._id}`,
                updatePayload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res && res.status === 200) {
                setIsEditing(false);
                console.log("Client updated successfully");

                // Call the onSave callback to refresh the clients list
                if (onSave) {
                    await onSave();
                }

                // Show success message (you might want to add a toast notification here)
            } else {
                console.error(
                    "Failed to update client:",
                    res?.data?.error || "Unknown error"
                );
                // You might want to show an error message to the user
            }
        } catch (error) {
            console.error("Error updating client:", error);
            if (error instanceof Error) {
                console.error("Error message:", error.message);
            }
            // You might want to show an error message to the user
        }
    };
    const handleCancel = () => {
        setEditableClient({
            username: client.username,
            email: client.email,
            phone: client.phone,
        });
        setEditablePackages(() => {
            if (!client.package_details) return [];
            if (Array.isArray(client.package_details)) {
                return client.package_details
                    .filter((pkg) => pkg.programId) // Only include packages with valid programId
                    .map((pkg) => ({
                        programId: pkg.programId,
                        sessions_left: pkg.sessions_left || 0,
                        start_date:
                            pkg.start_date ||
                            new Date().toISOString().split("T")[0],
                        end_date:
                            pkg.end_date ||
                            new Date().toISOString().split("T")[0],
                    }));
            }
            return [];
        });
        setIsEditing(false);
    };
    const updatePackageDetail = (
        programId: string,
        field: keyof Omit<IPackageDetail, "programId">,
        value: any
    ) => {
        setEditablePackages((prev) => {
            const existingIndex = prev.findIndex(
                (pkg) => pkg.programId === programId
            );

            if (existingIndex >= 0) {
                // Update existing package
                return prev.map((pkg, index) =>
                    index === existingIndex ? { ...pkg, [field]: value } : pkg
                );
            } else {
                // Create new package if it doesn't exist
                const newPackage: IPackageDetail = {
                    programId,
                    sessions_left:
                        field === "sessions_left" ? Number(value) || 0 : 0,
                    start_date:
                        field === "start_date"
                            ? value
                            : new Date().toISOString().split("T")[0],
                    end_date:
                        field === "end_date"
                            ? value
                            : new Date().toISOString().split("T")[0],
                };
                return [...prev, newPackage];
            }
        });
    };

    const getPackageDetail = (programId: string): IPackageDetail | null => {
        return (
            editablePackages.find((pkg) => pkg.programId === programId) || null
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Client Details
                    </h2>
                    <div className="flex items-center space-x-2">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="p-6 space-y-6">
                        {/* Basic Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            isEditing
                                                ? editableClient.username
                                                : client.username
                                        }
                                        onChange={(e) =>
                                            setEditableClient((prev) => ({
                                                ...prev,
                                                username: e.target.value,
                                            }))
                                        }
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={
                                            isEditing
                                                ? editableClient.email
                                                : client.email
                                        }
                                        onChange={(e) =>
                                            setEditableClient((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={
                                            isEditing
                                                ? editableClient.phone
                                                : client.phone
                                        }
                                        onChange={(e) =>
                                            setEditableClient((prev) => ({
                                                ...prev,
                                                phone: e.target.value,
                                            }))
                                        }
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />{" "}
                                </div>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                Package Details
                            </h3>
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    <span className="ml-2 text-gray-600">
                                        Loading programs...
                                    </span>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {programs.map((program) => {
                                        const packageDetail = getPackageDetail(
                                            program._id.toString()
                                        );
                                        const hasPackage =
                                            packageDetail !== null;

                                        return (
                                            <div
                                                key={program._id.toString()}
                                                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                            >
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-lg md:text-xl font-bold text-gray-700 mb-1">
                                                            {program.name}
                                                        </label>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Sessions Left
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    packageDetail?.sessions_left ||
                                                                    0
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const value =
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) || 0;
                                                                    if (
                                                                        hasPackage
                                                                    ) {
                                                                        updatePackageDetail(
                                                                            program._id.toString(),
                                                                            "sessions_left",
                                                                            value
                                                                        );
                                                                    } else {
                                                                        // Create new package
                                                                        setEditablePackages(
                                                                            (
                                                                                prev
                                                                            ) => [
                                                                                ...prev,
                                                                                {
                                                                                    programId:
                                                                                        program._id.toString(),
                                                                                    sessions_left:
                                                                                        value,
                                                                                    start_date:
                                                                                        new Date().toISOString(),
                                                                                    end_date:
                                                                                        new Date().toISOString(),
                                                                                },
                                                                            ]
                                                                        );
                                                                    }
                                                                }}
                                                                disabled={
                                                                    !isEditing
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Start Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                value={
                                                                    packageDetail?.start_date
                                                                        ? new Date(
                                                                              packageDetail.start_date
                                                                          )
                                                                              .toISOString()
                                                                              .split(
                                                                                  "T"
                                                                              )[0]
                                                                        : ""
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const value =
                                                                        new Date(
                                                                            e.target.value
                                                                        ).toISOString();
                                                                    if (
                                                                        hasPackage
                                                                    ) {
                                                                        updatePackageDetail(
                                                                            program._id.toString(),
                                                                            "start_date",
                                                                            value
                                                                        );
                                                                    } else {
                                                                        setEditablePackages(
                                                                            (
                                                                                prev
                                                                            ) => [
                                                                                ...prev,
                                                                                {
                                                                                    programId:
                                                                                        program._id.toString(),
                                                                                    sessions_left: 0,
                                                                                    start_date:
                                                                                        value,
                                                                                    end_date:
                                                                                        new Date().toISOString(),
                                                                                },
                                                                            ]
                                                                        );
                                                                    }
                                                                }}
                                                                disabled={
                                                                    !isEditing
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                End Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                value={
                                                                    packageDetail?.end_date
                                                                        ? new Date(
                                                                              packageDetail.end_date
                                                                          )
                                                                              .toISOString()
                                                                              .split(
                                                                                  "T"
                                                                              )[0]
                                                                        : ""
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const value =
                                                                        new Date(
                                                                            e.target.value
                                                                        ).toISOString();
                                                                    if (
                                                                        hasPackage
                                                                    ) {
                                                                        updatePackageDetail(
                                                                            program._id.toString(),
                                                                            "end_date",
                                                                            value
                                                                        );
                                                                    } else {
                                                                        setEditablePackages(
                                                                            (
                                                                                prev
                                                                            ) => [
                                                                                ...prev,
                                                                                {
                                                                                    programId:
                                                                                        program._id.toString(),
                                                                                    sessions_left: 0,
                                                                                    start_date:
                                                                                        new Date().toISOString(),
                                                                                    end_date:
                                                                                        value,
                                                                                },
                                                                            ]
                                                                        );
                                                                    }
                                                                }}
                                                                disabled={
                                                                    !isEditing
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
