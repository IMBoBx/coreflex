import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Coreflex Pilates Studio",
        short_name: "Coreflex",
        description:
            "Transform your body, strengthen your core, elevate your mind at Coreflex Pilates Studio",
        start_url: "/",
        display: "standalone",
        background_color: "#f8fafc",
        theme_color: "#1e293b",
        orientation: "portrait-primary",
        scope: "/",
        lang: "en",
        categories: ["fitness", "health", "wellness", "pilates"],
        screenshots: [
            {
                src: "/studio.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
            },
        ],
        icons: [
            {
                src: "/coreflex-icon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "maskable",
            },
            {
                src: "/coreflex-icon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "any",
            },
            {
                src: "/favicon.ico",
                sizes: "16x16 32x32 48x48",
                type: "image/x-icon",
            },
        ],
        shortcuts: [
            {
                name: "Book Session",
                short_name: "Book",
                description: "Book your next Pilates session",
                url: "/dashboard/book",
                icons: [
                    {
                        src: "/coreflex-icon.svg",
                        sizes: "96x96",
                        type: "image/svg+xml",
                    },
                ],
            },
            {
                name: "Upcoming Sessions",
                short_name: "Sessions",
                description: "View your upcoming sessions",
                url: "/dashboard/upcoming-sessions",
                icons: [
                    {
                        src: "/coreflex-icon.svg",
                        sizes: "96x96",
                        type: "image/svg+xml",
                    },
                ],
            },
        ],
        related_applications: [],
        prefer_related_applications: false,
    };
}
