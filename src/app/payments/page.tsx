import { Metadata } from 'next';
import PaymentsClient from './PaymentsClient';

export const metadata: Metadata = {
    title: "Pricing & Plans — SubSafe Reddit Compliance Tool",
    description: "Choose the perfect plan to grow your Reddit presence safely. From free hobby checks to unlimited agency-level post analysis.",
    keywords: [
        "SubSafe Pricing",
        "SubSafe Creator Plus Plan",
        "Reddit Marketing Tool Costs",
        "Affordable Reddit Compliance",
        "Reddit Growth Tool Subscription",
        "SubSafe Agency Plan",
        "Reddit Marketing Automation Cost",
        "Professional Reddit Posting Tool Pricing",
        "SubSafe Unlimited Post Checks",
        "Upgrade Reddit Account Health"
    ],
};

export default function PaymentsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "SubSafe Pricing",
                        "description": "Subscription plans for SubSafe Reddit compliance engine.",
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
                                    "name": "Pricing",
                                    "item": "https://subsafe.com/payments"
                                }
                            ]
                        }
                    })
                }}
            />
            <PaymentsClient />
        </>
    );
}
