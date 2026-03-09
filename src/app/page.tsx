import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "SubSafe — Reddit Shadowban Checker & Compliance Engine",
  description: "Check if your Reddit account is shadowbanned and analyze your posts against subreddit rules instantly. SubSafe is the ultimate compliance engine for Redditors.",
  keywords: [
    "Reddit Shadowban Checker",
    "Subreddit Rules Analyzer",
    "Reddit Post Compliance",
    "Avoid Reddit Ban",
    "Reddit Marketing Tool",
    "Reddit Automated Moderation",
    "Post on Reddit Safely",
    "Reddit Compliance Engine",
    "Reddit Account Health Test",
    "Free Reddit Shadowban Test"
  ],
  openGraph: {
    title: "SubSafe — #1 Reddit Shadowban Checker",
    description: "Instantly check your Reddit account's health and post compliance. Don't get banned, use SubSafe.",
    url: '/',
    siteName: 'SubSafe',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SubSafe Landing Page',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "SubSafe Home",
            "description": "Reddit compliance and shadowban checker tool.",
            "url": "https://subsafe.com",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://subsafe.com"
              }]
            }
          })
        }}
      />
      <HomeClient />
    </>
  );
}
