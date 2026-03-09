import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/blog", "/blog/*", "/login", "/signup", "/payments"],
                disallow: [
                    "/_next/*", // Next.js internal
                    "/admin/*", // Just in case
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
