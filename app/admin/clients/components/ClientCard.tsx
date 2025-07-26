import { IUserPopulated } from "@/models/User";

export default function ClientCard({
    client,
    onViewDetails,
}: {
    client: IUserPopulated;
    onViewDetails: () => void;
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full max-w-xs mx-auto hover:shadow-md transition-shadow duration-200">
            {/* User Info */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {client.username}
                </h3>

                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                        <span className="truncate">{client.phone}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="truncate">{client.email}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 pt-3 border-t border-gray-100">
                <button
                    onClick={onViewDetails}
                    className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
