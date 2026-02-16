import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up for SubSafe — Free Reddit Post Checker",
    description:
        "Create a free SubSafe account. Get 3 daily Reddit post compliance checks, AI-powered rewrites, and subreddit rule analysis — no credit card required.",
    keywords: [
        "SubSafe sign up",
        "free Reddit post checker",
        "Reddit compliance tool free",
    ],
    openGraph: {
        title: "Sign Up for SubSafe — Free Reddit Post Checker",
        description:
            "Create a free account. Get 3 daily Reddit post compliance checks, AI-powered rewrites, and subreddit rule analysis.",
        url: "/signup",
    },
    twitter: {
        card: "summary",
        title: "Sign Up for SubSafe — Free Reddit Post Checker",
        description:
            "Create a free account. Get 3 daily compliance checks, AI rewrites, and subreddit rule analysis.",
    },
    alternates: {
        canonical: "/signup",
    },
};

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
