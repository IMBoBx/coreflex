"use client";
import Link from "next/link";
import { useAuth } from "@/components/ProtectedRoute";

export default function AdminDashboard() {
    const { token, userId } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            {/* Header */}
            <div className="max-w-sm mx-auto mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                    Admin Dashboard
                </h1>
            </div>

            {/* Main Action Cards */}
            <div className="max-w-sm mx-auto flex flex-col gap-3">
                {/* Sessions Manager Card */}
                <Link href="/admin/sessions">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg duration-200 active:scale-[0.98] transition-all">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Sessions Manager
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Create and manage class sessions
                                </p>
                            </div>
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </div>
                </Link>

                {/* Client Management Card */}
                <Link href="/admin/clients">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg duration-200 active:scale-[0.98] transition-all">
                        <div className="flex items-center space-x-4">
                            {" "}
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Client Management
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Manage users and memberships
                                </p>
                            </div>
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Admin Stats Section */}
            {/* <div className="max-w-sm mx-auto mt-8">
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl text-white p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                    <div className="text-center py-4">
                        <p className="opacity-80 text-sm">
                            Studio analytics coming soon
                        </p>
                        <p className="opacity-60 text-xs mt-1">
                            Track sessions, clients, and revenue
                        </p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
