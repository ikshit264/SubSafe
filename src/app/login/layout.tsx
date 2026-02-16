import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Log In to SubSafe",
    description:
        "Log in to your SubSafe account to analyze Reddit posts, check subreddit compliance, and access your analysis history.",
    openGraph: {
        title: "Log In to SubSafe",
        description:
            "Access your SubSafe dashboard to analyze Reddit posts and manage your compliance checks.",
        url: "/login",
    },
    twitter: {
        card: "summary",
        title: "Log In to SubSafe",
        description:
            "Access your SubSafe dashboard to analyze Reddit posts and manage your compliance checks.",
    },
    alternates: {
        canonical: "/login",
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
