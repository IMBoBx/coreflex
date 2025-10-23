import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Session Management | Coreflex",
    description:
        "Manage Pilates sessions, create new sessions, and view session schedules for Coreflex Studio.",
    openGraph: {
        title: "Session Management | Coreflex",
        description:
            "Manage Pilates sessions, create new sessions, and view session schedules for Coreflex Studio.",
        type: "website",
    },
};

export default function SessionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
