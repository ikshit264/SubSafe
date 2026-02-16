import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog — Reddit Marketing Guides & Strategies",
    description:
        "Expert guides, case studies, and growth strategies for marketing on Reddit without getting banned. Learn from the SubSafe team.",
    keywords: [
        "Reddit marketing guide",
        "Reddit growth strategy",
        "how to post on Reddit",
        "Reddit self-promotion tips",
        "Reddit shadowban prevention",
    ],
    openGraph: {
        title: "SubSafe Blog — Reddit Marketing Guides & Strategies",
        description:
            "Expert guides, case studies, and growth strategies for marketing on Reddit without getting banned.",
        url: "/blog",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SubSafe Blog — Reddit Marketing Guides & Strategies",
        description:
            "Expert guides, case studies, and growth strategies for marketing on Reddit without getting banned.",
    },
    alternates: {
        canonical: "/blog",
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
            item: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
        },
    ],
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {children}
        </>
    );
}
