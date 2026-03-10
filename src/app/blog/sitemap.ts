import { MetadataRoute } from "next";
import blogsData from '@/seo-data/blogs.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subsafe.app";

    return blogsData.map((post: any) => ({
        url: `${siteUrl}/blog/${post.slug || post.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));
}
