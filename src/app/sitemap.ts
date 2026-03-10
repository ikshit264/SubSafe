import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/payments`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/login`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.2,
        },
        {
            url: `${siteUrl}/signup`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ];

    const subsafeData = require('@/seo-data/products/subsafe.json');
    const industriesData = require('@/seo-data/industries.json');
    const problemsData = require('@/seo-data/problems.json');
    const blogsData = require('@/seo-data/blogs.json');

    const useCasesPages: MetadataRoute.Sitemap = subsafeData.use_cases.map((uc: any) => ({
        url: `${siteUrl}/use-cases/${uc.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const vsPages: MetadataRoute.Sitemap = subsafeData.competitors.map((c: any) => ({
        url: `${siteUrl}/vs/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const featurePages: MetadataRoute.Sitemap = subsafeData.features.map((f: any) => ({
        url: `${siteUrl}/features/${f.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    const industryPages: MetadataRoute.Sitemap = industriesData.map((ind: any) => ({
        url: `${siteUrl}/industries/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const problemPages: MetadataRoute.Sitemap = problemsData.map((p: any) => ({
        url: `${siteUrl}/solutions/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
    }));

    const blogPages: MetadataRoute.Sitemap = blogsData.map((blog: any) => ({
        url: `${siteUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.date || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    return [
        ...staticPages,
        ...useCasesPages,
        ...vsPages,
        ...featurePages,
        ...industryPages,
        ...problemPages,
        ...blogPages
    ];
}
