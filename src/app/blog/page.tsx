import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
    title: "Reddit Marketing & Growth Blog — SubSafe",
    description: "Expert tips on Reddit marketing, avoiding bans, and growing your community safely. Read the latest strategies and case studies from the SubSafe team.",
    keywords: [
        "Reddit Marketing Guide 2026",
        "Subreddit Growth Strategies",
        "How to Avoid Getting Banned on Reddit",
        "Reddit Karma Building Tips",
        "Reddit Community Engagement Best Practices",
        "Subreddit Success Stories",
        "Reddit SEO Optimization Guide",
        "Reddit Content Strategy",
        "Modern Reddit Marketing Trends",
        "Advanced Reddit Automation"
    ],
};

export default function Blog() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "SubSafe Blog",
                        "description": "Educational content for Reddit marketers and founders.",
                        "url": "https://subsafe.com/blog",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://subsafe.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Blog",
                                    "item": "https://subsafe.com/blog"
                                }
                            ]
                        }
                    })
                }}
            />
            <BlogClient />
        </>
    );
}
