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
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
