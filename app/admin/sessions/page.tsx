"use client";
import { useEffect, useState } from "react";
import { IProgram } from "@/models/Program";
import { FetchApi } from "@/lib/fetchApi";
import AdminSlotsCardContainer from "./components/AdminSlotsCardContainer";
import CreateSessionModal from "./components/CreateSessionModal";
import DateScroller from "@/components/DateScroller";
import { useAuth } from "@/components/ProtectedRoute";
import { IST_TIMEZONE } from "@/lib/dateUtils";
import TimedAlert from "@/components/TimedAlert";
import Navbar from "@/components/Navbar";
import NavbarButton from "@/components/NavbarButton";

export default function AdminSessionsPage() {
    const { token, userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [alert, setAlert] = useState<{
        text: string;
        color: "green" | "red" | "orange";
    } | null>(null);

    useEffect(() => {
        setLoading(false);
        const fetchPrograms = async () => {
            const res = await FetchApi.get("/program", {
                headers: { Authorization: `Bearer ${token}` },
            });
            res && setPrograms(res.data);
        };
        token && fetchPrograms();
    }, [token]);

    const handleRefresh = () => {
        // Trigger refresh by updating a key or calling fetch again
        const fetchPrograms = async () => {
            const res = await FetchApi.get("/program", {
                headers: { Authorization: `Bearer ${token}` },
            });
            res && setPrograms(res.data);
        };
        token && fetchPrograms();
    };

    return loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 font-medium">Loading...</span>
            </div>
        </div>
    ) : (
        <>
            <Navbar>
                <NavbarButton
                    href="/admin/sessions"
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    }
                >
                    Sessions Manager
                </NavbarButton>
                <NavbarButton
                    href="/admin/clients"
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                        </svg>
                    }
                >
                    Client Management
                </NavbarButton>
                <NavbarButton
                    href="/dashboard"
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    }
                >
                    Dashboard
                </NavbarButton>
            </Navbar>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-sm md:max-w-4xl mx-auto p-4 md:p-6">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Sessions Manager
                                </h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    Manage sessions and view member bookings
                                </p>
                            </div>
                            {/* Desktop Create Session Button */}
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="hidden sm:flex px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 items-center gap-2 whitespace-nowrap"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                Create Session
                            </button>
                        </div>
                    </div>

                    {/* Date selector */}
                    <div className="mb-6 md:mb-8 flex flex-row items-center gap-3 max-w-full">
                        {/* Date Picker */}
                        <div className="flex-shrink-0 w-auto">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3">
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 text-center">
                                    Jump to Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate.toLocaleDateString(
                                        "en-CA",
                                        {
                                            timeZone: IST_TIMEZONE,
                                        }
                                    )}
                                    onChange={(e) => {
                                        const newDate = new Date(
                                            e.target.value + "T12:00:00"
                                        );
                                        setSelectedDate(newDate);
                                    }}
                                    className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs md:text-sm"
                                />
                            </div>
                        </div>

                        {/* Date Scroller */}
                        <div className="flex-1 overflow-x-auto flex justify-center-safe">
                            <DateScroller
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                days={15}
                            />
                        </div>
                    </div>

                    {/* Programs */}
                    {programs.length > 0 ? (
                        <div className="space-y-6 md:space-y-8">
                            {programs.map((program) => {
                                return (
                                    <div
                                        key={program._id + ""}
                                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                                    >
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-5 md:px-6 md:py-6 border-b border-gray-100">
                                            <div className="text-center">
                                                <h2 className="font-bold text-xl md:text-2xl text-gray-900 mb-1">
                                                    {program.name}
                                                </h2>
                                                {program.description && (
                                                    <p className="text-gray-600 text-sm md:text-base">
                                                        {program.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4 md:p-6">
                                            <AdminSlotsCardContainer
                                                programId={program._id + ""}
                                                name={program.name}
                                                description={
                                                    program.description ?? ""
                                                }
                                                date={selectedDate}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg
                                    className="mx-auto h-16 w-16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4h3a2 2 0 012 2v2M8 7H5a2 2 0 00-2 2v8a2 2 0 002 2V9a2 2 0 00-2-2h-3m-5 0V7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No programs available
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Check back later for available programs.
                            </p>
                        </div>
                    )}
                </div>
                {/* Mobile Floating Button */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center z-40"
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
                {/* Create Session Modal */}
                <CreateSessionModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={handleRefresh}
                    onAlert={(alert) => setAlert(alert)}
                />{" "}
                {/* Alert */}
                {alert && (
                    <TimedAlert
                        text={alert.text}
                        color={alert.color}
                        duration={3}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>
        </>
    );
}
