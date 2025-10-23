import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Sessions | Coreflex",
    description:
        "Book your Pilates sessions at Coreflex Studio. Choose from available time slots and programs.",
    openGraph: {
        title: "Book Sessions | Coreflex",
        description:
            "Book your Pilates sessions at Coreflex Studio. Choose from available time slots and programs.",
        type: "website",
    },
};

export default function BookLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
