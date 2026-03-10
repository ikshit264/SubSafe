import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import blogsData from '@/seo-data/blogs.json';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    return blogsData.map((post) => ({
        id: post.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const post = blogsData.find((p) => String(p.id) === String(id));

    if (!post) {
        return {
            title: "Post Not Found",
            robots: { index: false, follow: false },
        };
    }

    return {
        title: post.metadata?.title || `${post.title} — Reddit Insights & Compliance | SubSafe`,
        description: post.metadata?.description || post.excerpt,
        keywords: post.metadata?.keywords || [
            "Reddit marketing",
            post.category.toLowerCase(),
            "Reddit growth",
            "SubSafe",
        ],
        authors: [{ name: post.author }],
        openGraph: {
            title: post.metadata?.title || post.title,
            description: post.metadata?.description || post.excerpt,
            url: `/blog/${post.id}`,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.metadata?.title || post.title,
            description: post.metadata?.description || post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : undefined,
        },
        alternates: {
            canonical: `/blog/${post.id}`,
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { id } = await params;
    const post = blogsData.find((p) => String(p.id) === String(id));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subsafe.app";

    const articleJsonLd = post ? {
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
    } : null;

    return (
        <>
            {articleJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleJsonLd)
                    }}
                />
            )}
            <BlogPostClient posts={blogsData} />
        </>
    );
}
