import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).id;
    // In a real app, you'd fetch the post title from a DB/CMS here.
    // For now, we'll use a generic descriptive title that includes the ID or a placeholder.
    return {
        title: `Blog Post #${id} — Reddit Insights & Compliance | SubSafe`,
        description: `Deep dive into Reddit marketing strategies and compliance. Read our latest insights on post ID ${id} and learn how to grow your community safely.`,
    };
}

export default function BlogPost() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": "Reddit Strategy Deep Dive",
                        "description": "Advanced insights into Reddit compliance and growth.",
                        "author": {
                            "@type": "Organization",
                            "name": "SubSafe"
                        }
                    })
                }}
            />
            <BlogPostClient />
        </>
    );
}
