import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import Logout from "@/components/Logout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Coreflex Pilates Studio | Transform Your Body & Mind",
    description:
        "Transform your body, strengthen your core, elevate your mind at Coreflex Pilates Studio. Professional Pilates classes in Rajouri Garden, New Delhi.",
    keywords: [
        "pilates",
        "fitness",
        "core strength",
        "rajouri garden",
        "new delhi",
        "wellness",
        "body transformation",
        "pilates studio",
        "studio",
        "pilates near me",
        "near me",
        "yoga",
        "aerial yoga",
        "aerial",
        "pilates class",
        "yoga class",
        "reformer",
        "reformer pilates",
        "mat",
        "mat pilates",
    ],
    authors: [{ name: "Coreflex Pilates Studio" }],
    creator: "Coreflex Pilates Studio",
    publisher: "Coreflex Pilates Studio",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.BASE_URL!), // Replace with your actual domain
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Coreflex Pilates Studio | Transform Your Body & Mind",
        description:
            "Transform your body, strengthen your core, elevate your mind at Coreflex Pilates Studio.",
        type: "website",
        locale: "en_US",
        url: process.env.BASE_URL, // Replace with your actual domain
        siteName: "Coreflex Pilates Studio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Coreflex Pilates Studio | Transform Your Body & Mind",
        description:
            "Transform your body, strengthen your core, elevate your mind at Coreflex Pilates Studio.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Add your verification codes here when you have them
        // google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* <nav className="sticky top-0 left-0 w-full h-12 md:h-14 bg-black text-white z-50"> */}
                {/* Placeholder Navbar */}
                {/* <Logout /> */}
                {/* </nav> */}
                {children}
            </body>
        </html>
    );
}
