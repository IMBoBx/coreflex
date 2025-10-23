import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.BASE_URL; // Replace with your actual domain

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/login"],
                disallow: ["/dashboard/", "/admin/", "/api/"],
            },
            {
                userAgent: "Googlebot",
                allow: ["/", "/login"],
                disallow: ["/dashboard/", "/admin/", "/api/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
