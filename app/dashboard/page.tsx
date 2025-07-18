"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IPackageDetail {
    program: {
        _id: string;
        name: string;
        description?: string;
    };
    sessions_left: number;
    start_date: string;
    end_date: string;
}

export default function Page() {
    const [username, setUsername] = useState<string>("");
    const [activePackages, setActivePackages] = useState<IPackageDetail[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Get username from userData or fallback to localStorage
            const userData = localStorage.getItem("userData");
            let displayName = "User";

            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    displayName = parsedUser.username || "User";

                    // Extract active packages
                    if (parsedUser.package_details) {
                        const packages: IPackageDetail[] = [];
                        const today = new Date();

                        // Convert Map entries to array if it's a Map
                        const packageEntries =
                            parsedUser.package_details instanceof Map
                                ? Array.from(
                                      parsedUser.package_details.entries()
                                  )
                                : Object.entries(parsedUser.package_details);

                        packageEntries.forEach(
                            //@ts-ignore
                            ([programId, pkg]: [string, any]) => {
                                const endDate = new Date(pkg.end_date);

                                // Check if package is active (not expired and has sessions left)
                                if (endDate > today && pkg.sessions_left > 0) {
                                    packages.push({
                                        program: pkg.program,
                                        sessions_left: pkg.sessions_left,
                                        start_date: pkg.start_date,
                                        end_date: pkg.end_date,
                                    });
                                }
                            }
                        );

                        setActivePackages(packages);
                    }
                } catch (error) {
                    console.error("Error parsing user data:", error);
                }
            } else {
                // Fallback to just username from localStorage
                displayName = localStorage.getItem("username") ?? "User";
            }

            setUsername(displayName);
        }
    }, []);

    return (
        <ProtectedRoute allowedRoles={["client", "admin"]}>
            <div className="min-h-screen bg-gray-50 px-4 py-6">
                {/* Header */}
                <div className="max-w-sm mx-auto mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                        Welcome back, {username}!
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        What would you like to do today?
                    </p>
                </div>{" "}
                {/* Main Action Cards */}
                <div className="max-w-sm mx-auto flex flex-col gap-3">
                    {/* Book Classes Card */}
                    <Link href="/dashboard/book">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg duration-200 active:scale-[0.98] transition-all">
                            <div className="flex items-center space-x-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
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
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Book a Class
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        Find and book your next session
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

                    {/* Upcoming Sessions Card */}
                    <Link href="/dashboard/upcoming-sessions">
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
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        My Sessions
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        View and manage your bookings
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
                </div>{" "}
                {/* Active Packages */}
                <div className="max-w-sm mx-auto mt-8">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Active Packages
                        </h3>

                        {activePackages.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="opacity-80 text-sm">
                                    No active packages
                                </p>
                                <p className="opacity-60 text-xs mt-1">
                                    Contact the studio to purchase a package
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activePackages.map((pkg, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                                    >
                                        <h4 className="font-semibold text-sm mb-2">
                                            {pkg.program.name}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <p className="opacity-80">
                                                    Sessions Left
                                                </p>
                                                <p className="text-lg font-bold">
                                                    {pkg.sessions_left}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="opacity-80">
                                                    Expires
                                                </p>
                                                <p className="text-sm font-semibold">
                                                    {new Date(
                                                        pkg.end_date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
