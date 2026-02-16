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
    template: "%s | SubSafe",
  },
  description:
    "SubSafe is an AI-powered Reddit compliance tool. Analyze your posts against subreddit rules, shadowban triggers, and automod filters before you publish.",
  keywords: [
    "Reddit compliance tool",
    "Reddit post checker",
    "subreddit rules checker",
    "Reddit shadowban detector",
    "Reddit automod filter",
    "Reddit marketing tool",
    "Reddit post analyzer",
    "avoid Reddit ban",
    "Reddit content optimizer",
  ],
  authors: [{ name: "SubSafe" }],
  creator: "SubSafe",
  publisher: "SubSafe",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SubSafe",
    title: "SubSafe — Post on Reddit Without Getting Banned",
    description:
      "AI-powered Reddit post compliance checker. Analyze subreddit rules, avoid bans, and optimize your posts for virality.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubSafe — Post on Reddit Without Getting Banned",
    description:
      "AI-powered Reddit post compliance checker. Analyze subreddit rules, avoid bans, and optimize your posts for virality.",
  },
  robots: {
    index: true,
    follow: true,
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
  description:
    "AI-powered Reddit post compliance and optimization tool for marketers and founders.",
  foundingDate: "2024",
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SubSafe",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Analyze your Reddit posts against subreddit rules, hidden bans, and toxicity filters instantly.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "29",
    priceCurrency: "USD",
    offerCount: 3,
  },
};

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
      </body>
    </html>
  );
}
