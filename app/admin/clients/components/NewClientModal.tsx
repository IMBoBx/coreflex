"use client";

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

export default function NewClientModal({
    isOpen,
    onClose,
    onSave,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => Promise<void>;
}) {
    const { token } = useAuth();
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // New client data
    const [clientData, setClientData] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const [packages, setPackages] = useState<IPackageDetail[]>([]);

    useEffect(() => {
        if (isOpen && token) {
            fetchPrograms();
            // Reset form when modal opens
            setClientData({
                username: "",
                email: "",
                phone: "",
            });
            setPackages([]);
        }
    }, [isOpen, token]);

    const fetchPrograms = async () => {
        setLoading(true);
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
            setSaving(true);

            // Convert packages array to Map format for Mongoose
            const packageDetailsMap: Record<string, any> = {};
            packages.forEach((pkg) => {
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

            const res = await FetchApi.post(
                "/user",
                {
                    username: clientData.username,
                    email: clientData.email,
                    phone: clientData.phone,
                    role: "client",
                    package_details: packageDetailsMap,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res?.data && !res.data.error) {
                console.log("Client created successfully");
                if (onSave) await onSave();
                onClose();
            } else {
                console.error("Failed to create client:", res?.data?.error);
                alert(
                    "Failed to create client: " +
                        (res?.data?.error || "Unknown error")
                );
            }
        } catch (error) {
            console.error("Error creating client:", error);
            alert("Error creating client. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const addPackage = () => {
        setPackages([
            ...packages,
            {
                programId: "",
                sessions_left: 0,
                start_date: new Date().toISOString().split("T")[0],
                end_date: new Date().toISOString().split("T")[0],
            },
        ]);
    };

    const removePackage = (index: number) => {
        setPackages(packages.filter((_, i) => i !== index));
    };

    const updatePackage = (
        index: number,
        field: keyof IPackageDetail,
        value: string | number
    ) => {
        const updatedPackages = [...packages];
        updatedPackages[index] = {
            ...updatedPackages[index],
            [field]: value,
        };
        setPackages(updatedPackages);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>
            <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                New Client
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Create a new client account
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
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Basic Information
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username *
                                    </label>
                                    <input
                                        type="text"
                                        value={clientData.username}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                username: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter client username"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={clientData.email}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter client email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={clientData.phone}
                                        onChange={(e) =>
                                            setClientData({
                                                ...clientData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter client phone number"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Package Details */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Package Details
                                    </h3>
                                    <button
                                        onClick={addPackage}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        + Add Package
                                    </button>
                                </div>

                                {packages.length === 0 ? (
                                    <p className="text-gray-500 text-sm">
                                        No packages added yet. Click "Add
                                        Package" to get started.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {packages.map((pkg, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-medium text-gray-900">
                                                        Package {index + 1}
                                                    </h4>
                                                    <button
                                                        onClick={() =>
                                                            removePackage(index)
                                                        }
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Program
                                                        </label>
                                                        <select
                                                            value={
                                                                pkg.programId
                                                            }
                                                            onChange={(e) =>
                                                                updatePackage(
                                                                    index,
                                                                    "programId",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value="">
                                                                Select Program
                                                            </option>
                                                            {programs.map(
                                                                (program) => (
                                                                    <option
                                                                        key={program._id.toString()}
                                                                        value={program._id.toString()}
                                                                    >
                                                                        {
                                                                            program.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Sessions Left
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={
                                                                pkg.sessions_left
                                                            }
                                                            onChange={(e) =>
                                                                updatePackage(
                                                                    index,
                                                                    "sessions_left",
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Start Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={
                                                                pkg.start_date
                                                            }
                                                            onChange={(e) =>
                                                                updatePackage(
                                                                    index,
                                                                    "start_date",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            End Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={pkg.end_date}
                                                            onChange={(e) =>
                                                                updatePackage(
                                                                    index,
                                                                    "end_date",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={
                                        saving ||
                                        !clientData.username ||
                                        !clientData.email ||
                                        !clientData.phone
                                    }
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? "Creating..." : "Create Client"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
