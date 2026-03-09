import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "SubSafe — Post on Reddit Without Getting Banned",
    template: "%s | SubSafe - Reddit Compliance & Post Optimization",
  },
  description:
    "SubSafe is the #1 AI-powered Reddit compliance tool. Analyze your posts against subreddit rules, shadowban triggers, and automod filters in real-time. Avoid bans and grow your Reddit presence safely.",
  keywords: [
    "Reddit Shadowban Checker",
    "Reddit Compliance Tools",
    "Reddit Keyword Monitoring",
    "Reddit Moderation Tools",
    "Reddit Account Health",
    "Reddit SEO",
    "Subreddit Rules Analyzer",
    "Reddit Post Optimization",
    "Reddit Marketing Tools",
    "Reddit Growth Strategies",
    "How to avoid Reddit ban",
    "Reddit content optimizer",
    "Reddit automod filter check",
    "Subreddit rules checker",
    "New Reddit account tips",
  ],
  authors: [{ name: "SubSafe Team" }],
  creator: "SubSafe",
  publisher: "SubSafe",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SubSafe",
    title: "SubSafe — Reddit Compliance & Post Optimization Engine",
    description:
      "Stop getting banned on Reddit. Use SubSafe to analyze subreddit rules, identify shadowban triggers, and optimize your posts for maximum visibility and safety.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubSafe — The Smart Way to Post on Reddit",
    description:
      "AI-powered Reddit post compliance checker. Analyze rules, avoid bans, and optimize your posts for maximum engagement.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SubSafe",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`,
  description:
    "SubSafe provides AI-powered Reddit post compliance and optimization tools for marketers, founders, and community managers to ensure safe and effective Reddit engagement.",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/subsafe",
    "https://linkedin.com/company/subsafe"
  ]
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SubSafe",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Analyze your Reddit posts against subreddit rules, hidden bans, and toxicity filters instantly using advanced AI compliance scoring.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "29",
    priceCurrency: "USD",
    offerCount: 3,
  },
};

import UpvoteWidget from "@/components/UpvoteWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        {children}
        <UpvoteWidget />
      </body>
    </html>
  );
}
