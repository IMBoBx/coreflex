import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upcoming Sessions | Coreflex",
    description:
        "View and manage your upcoming Pilates sessions at Coreflex Studio.",
    openGraph: {
        title: "Upcoming Sessions | Coreflex",
        description:
            "View and manage your upcoming Pilates sessions at Coreflex Studio.",
        type: "website",
    },
};

export default function UpcomingSessionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
