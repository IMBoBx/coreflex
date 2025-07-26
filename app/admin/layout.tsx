import type { Metadata } from "next";
import "@/app/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
    title: "Admin Dashboard | CoreFlex",
    description:
        "CoreFlex Admin Dashboard - Manage clients, programs, and sessions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>;
}
