import type { Metadata } from "next";
import { BLOG_POSTS } from "@/constants";

type Props = {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = BLOG_POSTS.find((p) => p.id === parseInt(id));

    if (!post) {
        return {
            title: "Post Not Found",
            robots: { index: false, follow: false },
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: [
            "Reddit marketing",
            post.category.toLowerCase(),
            "Reddit growth",
            "SubSafe",
        ],
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.id}`,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : undefined,
        },
        alternates: {
            canonical: `/blog/${post.id}`,
        },
    };
}

export default async function BlogPostLayout({ params, children }: Props) {
    const { id } = await params;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const post = BLOG_POSTS.find((p) => p.id === parseInt(id));

    if (!post) {
        return <>{children}</>;
    }

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: {
            "@type": "Person",
            name: post.author,
        },
        datePublished: post.date,
        publisher: {
            "@type": "Organization",
            name: "SubSafe",
        },
        image: post.imageUrl || undefined,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/blog/${post.id}`,
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${siteUrl}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {children}
        </>
    );
}
