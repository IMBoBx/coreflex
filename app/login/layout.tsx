import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Coreflex",
    description:
        "Login to your Coreflex Pilates Studio account to book sessions and manage your fitness journey.",
    openGraph: {
        title: "Login | Coreflex",
        description:
            "Login to your Coreflex Pilates Studio account to book sessions and manage your fitness journey.",
        type: "website",
    },
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
