"use client";
import { useEffect, useState } from "react";
import { IProgram } from "@/models/Program";
import { FetchApi } from "@/lib/fetchApi";
import SlotsCardContainer from "./components/SlotCardsContainer";
import DateScroller from "./components/DateScroller";
import ProtectedRoute from "@/components/ProtectedRoute";

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

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "");
        setUserId(localStorage.getItem("userId") ?? "");
    }, []);

    useEffect(() => {
        setLoading(false);
        const fetchPrograms = async () => {
            const res = await FetchApi.get("/program", {
                headers: { Authorization: `Bearer ${token}` },
            });
            res && setPrograms(res.data);
        };
        !loading && fetchPrograms();
    }, [token]);
    return (loading) ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 font-medium">Loading...</span>
            </div>
        </div>
    ) : (
        <ProtectedRoute allowedRoles={["admin", "client"]}>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-sm md:max-w-4xl mx-auto p-4 md:p-6">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                            Book Your Session
                        </h1>
                        <p className="text-gray-600 text-center text-sm md:text-base">
                            Select a date and choose your preferred time slot
                        </p>
                    </div>

                    {/* Date selector */}
                    <div className="mb-6 md:mb-8">
                        <DateScroller
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            days={30}
                        />
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
                                            <SlotsCardContainer
                                                programId={program._id + ""}
                                                name={program.name}
                                                description={
                                                    program.description ?? ""
                                                }
                                                date={selectedDate}
                                                userId={userId}
                                                token={token}
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
                                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4h3a2 2 0 012 2v2M8 7H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-5 0V7"
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
        </ProtectedRoute>
    );
}
