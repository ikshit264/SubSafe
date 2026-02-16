import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing — SubSafe Plans & Features",
    description:
        "Compare SubSafe pricing plans. Start free with 3 daily checks, upgrade to Pro Creator for unlimited analyses, or go Agency for team features and API access.",
    keywords: [
        "SubSafe pricing",
        "Reddit compliance tool pricing",
        "SubSafe Pro",
        "SubSafe plans",
    ],
    openGraph: {
        title: "SubSafe Pricing — Plans & Features",
        description:
            "Start free with 3 daily checks or upgrade for unlimited Reddit post analyses, auto-rewrites, and advanced features.",
        url: "/payments",
    },
    twitter: {
        card: "summary",
        title: "SubSafe Pricing — Plans & Features",
        description:
            "Start free with 3 daily checks or upgrade for unlimited Reddit post analyses and advanced features.",
    },
    alternates: {
        canonical: "/payments",
    },
};

export default function PaymentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
