"use client";
import { useEffect, useState } from "react";
import { IProgram } from "@/models/Program";
import { FetchApi } from "@/lib/fetchApi";
import AdminSlotsCardContainer from "./components/AdminSlotsCardContainer";
import DateScroller from "@/components/DateScroller";
import { useAuth } from "@/components/ProtectedRoute";
import { IST_TIMEZONE } from "@/lib/dateUtils";

export default function AdminSessionsPage() {
    const { token, userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    return loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 font-medium">Loading...</span>
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-sm md:max-w-4xl mx-auto p-4 md:p-6">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                        Sessions Manager
                    </h1>
                    <p className="text-gray-600 text-center text-sm md:text-base">
                        Manage sessions and view member bookings
                    </p>{" "}
                </div>{" "}
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
        </div>
    );
}
