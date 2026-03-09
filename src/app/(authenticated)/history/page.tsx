import { Metadata } from 'next';
import HistoryClient from './HistoryClient';

export const metadata: Metadata = {
    title: "Your Report History — SubSafe Reddit Post Analysis",
    description: "Access and review all your previous Reddit post compliance reports. Track your progress, revisit optimized content, and manage your analysis history safely.",
    keywords: [
        "Reddit Analysis History",
        "SubSafe Report Archive",
        "Previous Reddit Post Checks",
        "Reddit Compliance History",
        "Saved Reddit Optimization Reports",
        "SubSafe User Dashboard",
        "Reddit Account Health Logs",
        "Track Reddit Marketing Progress",
        "My SubSafe Reports",
        "Reddit Content Archive"
    ],
};

export default function HistoryPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "SubSafe History",
                        "description": "User's previous Reddit report history and analysis archives.",
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
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "History",
                                    "item": "https://subsafe.com/history"
                                }
                            ]
                        }
                    })
                }}
            />
            <HistoryClient />
        </>
    );
}
