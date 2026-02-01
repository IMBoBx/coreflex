import type { Metadata } from "next";
import "@/app/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import NavbarButton from "@/components/NavbarButton";

export const metadata: Metadata = {
    title: "Dashboard | Coreflex",
    description:
        "View your active packages, sessions, and manage your Pilates journey at Coreflex Studio.",
    openGraph: {
        title: "Dashboard | Coreflex",
        description:
            "View your active packages, sessions, and manage your Pilates journey at Coreflex Studio.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute allowedRoles={["client", "admin"]}>
            <Navbar logoUrl="/dashboard">
                {" "}
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
                <NavbarButton
                    href="/dashboard/book"
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
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    }
                >
                    Book a Session
                </NavbarButton>
                <NavbarButton
                    href="/dashboard/my-sessions"
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
                    My Sessions
                </NavbarButton>{" "}
            </Navbar>
            <div className="pt-16">{children}</div>
        </ProtectedRoute>
    );
}
