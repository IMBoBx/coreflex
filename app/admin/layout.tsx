import type { Metadata } from "next";
import "@/app/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import NavbarButton from "@/components/NavbarButton";

export const metadata: Metadata = {
    title: "Admin Dashboard | Coreflex",
    description:
        "Admin dashboard for managing Coreflex Pilates Studio operations, sessions, and clients.",
    openGraph: {
        title: "Admin Dashboard | Coreflex",
        description:
            "Admin dashboard for managing Coreflex Pilates Studio operations, sessions, and clients.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <Navbar>
                <NavbarButton
                    href="/admin"
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                >
                    Admin Dashboard
                </NavbarButton>
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
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                            />
                        </svg>
                    }
                >
                    Sessions Manager
                </NavbarButton>{" "}
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
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    }
                >
                    Client Management
                </NavbarButton>
            </Navbar>
            <div className="pt-16">{children}</div>
        </ProtectedRoute>
    );
}
