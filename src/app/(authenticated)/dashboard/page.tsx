import { Metadata } from 'next';
import EditorView from '@/components/dashboard/EditorView';

export const metadata: Metadata = {
    title: "Analysis Dashboard — Reddit Post Compliance",
    description: "Analyze your Reddit posts in real-time. Our AI engine checks for subreddit rule violations, shadowban triggers, and content quality.",
    keywords: [
        "Reddit Post Analytics",
        "Subreddit Rule Check",
        "Reddit Shadowban Trigger Analysis",
        "Reddit Post Optimizer",
        "Safe Reddit Posting Tool",
        "Reddit Content Compliance",
        "Subreddit Guidelines Analyzer",
        "Reddit Post Score",
        "Automated Reddit Moderator Check",
        "Reddit Post Compliance Score"
    ],
};

export default function DashboardPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "SubSafe Dashboard",
                        "description": "Real-time Reddit post analysis and compliance dashboard.",
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
                                    "name": "Dashboard",
                                    "item": "https://subsafe.com/dashboard"
                                }
                            ]
                        }
                    })
                }}
            />
            <EditorView />
        </>
    );
}
