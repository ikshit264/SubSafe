import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/blog", "/blog/*", "/login", "/signup", "/payments"],
                disallow: [
                    "/dashboard",
                    "/history",
                    "/history/*",
                    "/settings",
                    "/api/*",
                    "/payments/success",
                    "/payments/error",
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
