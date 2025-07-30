"use client";

import { FetchApi } from "@/lib/fetchApi";
import { IUserPopulated } from "@/models/User";
import { useEffect, useState } from "react";
import ClientCard from "./ClientCard";
import ClientModal from "./ClientModal";
import NewClientModal from "./NewClientModal";
import { useAuth } from "@/components/ProtectedRoute";

export default function ClientCardContainer() {
    const [clients, setClients] = useState<IUserPopulated[]>([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedClient, setSelectedClient] = useState<IUserPopulated | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // ...existing code...

    const isClientActive = (client: IUserPopulated): boolean => {
        if (!client.package_details) return false;

        const today = new Date();

        // Convert Map entries to array if it's a Map, or use Object.entries if it's an object
        const packageEntries =
            client.package_details instanceof Map
                ? Array.from(client.package_details.entries())
                : Object.entries(client.package_details);

        for (const [, pkg] of packageEntries) {
            const packageDetail = pkg as any; // Type assertion since we know the structure
            const startDate = new Date(packageDetail.start_date);
            const endDate = new Date(packageDetail.end_date);

            if (
                today > startDate &&
                today < endDate &&
                packageDetail.sessions_left > 0
            ) {
                return true;
            }
        }

        return false;
    };
    const getClients = async () => {
        try {
            setLoading(true);
            const res = await FetchApi.get("/user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res?.data?.error && Array.isArray(res?.data)) {
                setClients(res.data);
            } else {
                console.error("Failed to fetch clients:", res?.data?.error);
                setClients([]);
            }
        } catch (error) {
            console.error("Error fetching clients:", error);
            setClients([]);
        } finally {
            handleCloseModal();
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) return;
        getClients();
    }, [token]);

    const handleViewDetails = (client: IUserPopulated) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    // Filter clients based on search query
    const filteredClients = clients.filter((client) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const username = client.username?.toLowerCase() || "";
        const phone = client.phone?.toLowerCase() || "";

        return username.includes(query) || phone.includes(query);
    });

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            {loading ? (
                <div className="flex items-center justify-center min-h-64">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600 font-medium">
                            Loading clients...
                        </span>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto space-y-8">
                    {" "}
                    {/* Search Bar */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Client Management
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Search and manage all your clients
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-full sm:w-80">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by name or phone number..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                {/* Desktop New Client Button */}
                                <button
                                    onClick={() =>
                                        setIsNewClientModalOpen(true)
                                    }
                                    className="hidden sm:flex px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 items-center gap-2 whitespace-nowrap"
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
                                    New Client
                                </button>
                            </div>
                        </div>
                        {searchQuery && (
                            <div className="mt-4 text-sm text-gray-600">
                                Found {filteredClients.length} client
                                {filteredClients.length !== 1 ? "s" : ""}{" "}
                                matching "{searchQuery}"
                            </div>
                        )}
                    </div>{" "}
                    {/* Active Clients Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        {" "}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>{" "}
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Active Clients
                                    <span className="ml-2 text-sm font-normal text-gray-500">
                                        (
                                        {
                                            filteredClients.filter(
                                                isClientActive
                                            ).length
                                        }
                                        )
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredClients.filter(isClientActive).length >
                            0 ? (
                                filteredClients
                                    .filter(isClientActive)
                                    .map((client) => (
                                        <ClientCard
                                            key={client._id.toString()}
                                            client={client}
                                            onViewDetails={() =>
                                                handleViewDetails(client)
                                            }
                                        />
                                    ))
                            ) : (
                                <div className="col-span-full text-center py-8">
                                    <div className="text-gray-400 mb-2">
                                        <svg
                                            className="mx-auto h-12 w-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        No active clients at the moment
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Inactive Clients Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center mb-6">
                            <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>{" "}
                            <h2 className="text-xl font-semibold text-gray-900">
                                Inactive Clients
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    (
                                    {
                                        filteredClients.filter(
                                            (client) => !isClientActive(client)
                                        ).length
                                    }
                                    )
                                </span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredClients.filter(
                                (client) => !isClientActive(client)
                            ).length > 0 ? (
                                filteredClients
                                    .filter((client) => !isClientActive(client))
                                    .map((client) => (
                                        <ClientCard
                                            key={client._id.toString()}
                                            client={client}
                                            onViewDetails={() =>
                                                handleViewDetails(client)
                                            }
                                        />
                                    ))
                            ) : (
                                <div className="col-span-full text-center py-8">
                                    <div className="text-gray-400 mb-2">
                                        <svg
                                            className="mx-auto h-12 w-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        No inactive clients
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>{" "}
                </div>
            )}{" "}
            {/* Mobile Floating Button */}
            <button
                onClick={() => setIsNewClientModalOpen(true)}
                className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center z-40"
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
            {/* Modals */}
            {selectedClient && (
                <ClientModal
                    client={selectedClient}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={getClients}
                />
            )}
            <NewClientModal
                isOpen={isNewClientModalOpen}
                onClose={() => setIsNewClientModalOpen(false)}
                onSave={getClients}
            />
        </div>
    );
}
