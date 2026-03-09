# Business Intent: SubSafe

## Product Overview
- **Product Type:** AI-powered Reddit Compliance & Post Optimization SaaS.
- **Primary Function:** Analyze Reddit posts against subreddit rules, shadowban triggers, and automod filters in real-time.
- **Target Audience:** Founders, Marketers, Community Managers, and professional Redditors.
- **Monetization Model:** Tiered Subscription (Hobby, Creator Plus, Agency) with a free tier and credit-based usage.
- **Deployment Type:** Next.js Web Application with MongoDB/Prisma backend.

## Core Capabilities
- **AI Post Analysis:** Deep-scanning post titles and bodies against specific subreddit rules using Gemini AI.
- **Compliance Scoring:** Providing a numerical score (0-100%) and categorizing violations (self-promotion, toxicity, rule breaks).
- **Reddit WYSIWYG Preview:** Visualizing how the post will appear on both Desktop and Mobile Reddit before publishing.
- **Report History:** Archiving and retrieving previous analysis reports for tracking growth and compliance patterns.
- **Monetization Management:** Stripe-integrated checkout flow for plan upgrades and subscription management.

## Surface Classification

### Public Pages (Indexable Candidates)
| Route | Purpose | Confidence |
|------|--------|-----------|
| `/` | Landing page, value proposition, and live demo. | High |
| `/blog` | Educational content and Reddit marketing guides. | High |
| `/blog/[id]` | Individual post deep-dives. | High |
| `/payments` | Pricing plans and feature comparisons. | High |
| `/login` | User authentication gateway. | High |
| `/signup` | User onboarding entry point. | High |

### Private / App Pages (Never Index)
| Route Pattern | Reason | Confidence |
|--------------|--------|-----------|
| `/dashboard` | Core tool interface (hidden behind auth). | High |
| `/history` | User-specific report archive (hidden behind auth). | High |
| `/history/[id]` | Individual private report view. | High |
| `/settings` | Profile and account management. | High |
| `/api/*` | Backend logic and data processing endpoints. | High |

## User Journey Model
- **Entry Point:** Landing Page via Home or educational Blog content.
- **Core Interaction:** Inputting draft Reddit posts into the Compliance Engine for AI feedback.
- **Conversion Action:** Upgrading to "Creator Plus" or "Agency" plan on the Payments page to remove credit limits.
- **Post-Conversion State:** Unlimited post checks and access to historical compliance data on the Dashboard.

## Content Signals
- **Blog Detected:** Yes (located in `src/app/blog`).
- **FAQ Detected:** No (only standard section on the Landing Page).
- **Guides / Docs:** No (education is handled via the Blog).
- **Trust Pages Detected:** Footer links exist for Privacy & Terms (placeholder/standard).

## SEO-Safe Assumptions
- **What this product IS:** A compliance and growth tool for safe, non-spammy Reddit engagement.
- **What this product IS NOT:** A botting service, an automated spam tool, or a "black-hat" way to bypass platform rules maliciously.

## Confidence Summary
- **Overall Confidence Score (0–1):** 0.95
- **High Confidence Areas:** Product function, monetization model, route classification, and core features.
- **Low Confidence Areas:** Specific "Team" details and the existence of deep legal documentation beyond standard footers.

## SEO Execution Constraints
- **Routes that must never be indexed:** All `/(authenticated)` paths, including Dashboard, History, and Settings.
- **Routes safe for canonicalization:** Homepage (`/`) and the root Blog page (`/blog`).
- **Areas requiring conservative SEO:** Pricing and Payments (transactional intent).
