# SubSafe: AI Product Context & Single Source of Truth

## Product Overview
SubSafe is an AI-powered SaaS web application designed to help Reddit users—specifically marketers, startup founders, and community managers—validate and optimize their Reddit posts before publishing. It acts as a pre-flight check, analyzing post content against subreddit-specific rules, shadowban triggers, and automated moderation filters to maximize the chances of a post surviving and thriving on the platform.

## Why This Product Exists
Reddit is notoriously hostile to overt marketing and self-promotion. Many legitimate users, especially founders and marketers, experience account bans, shadowbans, or immediate post removals because they unknowingly trigger automod filters or violate nuanced, undocumented subreddit etiquette. SubSafe exists to bridge this gap, providing an AI "moderator" that coaches users on compliance before they risk their account health.

## Target Users & Use Cases
- **Target Audience:** Indie hackers, startup founders, digital marketers, and community managers attempting to leverage Reddit for organic growth.
- **Primary Use Case:** A user drafts a promotional post (e.g., launching an app in `r/startups`). They paste the draft into SubSafe. SubSafe analyzes the draft, flags aggressive promotional language, highlights missing required tags (e.g., `[Offer]`), and generates a compliance score and an actionable rewrite suggestion.

## What the Product Does
1. **Real-time AI Analysis:** Accepts user input (Subreddit name, Title, Body) and uses an LLM (currently Google Gemini) to analyze the content against known Reddit meta-rules and specific subreddit guidelines.
2. **Compliance Scoring:** Returns a percentage score indicating the likelihood of the post passing moderation.
3. **Violation Flagging:** Explicitly lists triggered rules (e.g., "Excessive self-promotion", "Missing flair").
4. **Visual Preview:** Renders a WYSIWYG preview of how the post will look on Reddit's native UI (Desktop/Mobile).
5. **History Tracking:** Archives previous analyses so users can reference past successful (or failed) compliance checks.

## MVP Definition
The current Minimum Viable Product (MVP) consists of:
- A public landing page with a limited, "smoke-screen" interactive demo.
- User authentication (JWT based, handling login/registration).
- A protected Dashboard containing the core Editor/Analysis engine.
- A History view to access past reports.
- A Stripe/Dodo Payments integration for upgrading to paid tiers.
- A credit system restricting free users to 3 analyses per day, while paid tiers ("Creator Plus", "Agency") receive unlimited access.

## How the Product Works (Textual)
A user arrives at the landing page and is incentivized to sign up to use the full analysis tool. Upon authentication, they are routed to the `/dashboard`. Here, they enter the target subreddit, post title, and body text. 

When the user clicks "Analyze", the frontend sends the payload to the `/api/analyze` endpoint. This endpoint verifies the user's JWT token and checks their credit balance. If credits are available, the server crafts a rigid prompt containing the user's draft and sends it to the Gemini AI API via `@google/genai`. 

The LLM returns a structured JSON response containing the compliance score, rule violations, and suggested edits. The server decrements the user's credit count, saves the result to the MongoDB database as an `AnalysisRequest`, and returns the JSON payload to the frontend. The frontend then updates the UI to display the score, the violations, and the Reddit-style visual preview.

## Technical Architecture & Tech Stack
- **Framework:** Next.js 16 (React 19) utilizing the App Router architecture.
- **Language:** TypeScript (Strict).
- **Styling:** Tailwind CSS v4 with custom brand tokens (lime, orange, dark slate).
- **Database:** MongoDB, abstracted via Prisma ORM.
- **Authentication:** Custom JWT-based auth utilizing `bcryptjs` for password hashing and HTTP-only cookies for session management.
- **AI Integration:** Google Gemini (`@google/genai`) for natural language processing and compliance scoring.
- **Payments:** Dodo Payments (or conceptual equivalent) handling checkout flows via external redirects and webhooks.

## Folder & Responsibility Mapping
- `/src/app/` - Next.js App Router root. Contains all page routes, layouts, and API endpoints.
  - `/src/app/(authenticated)/` - Route group enforcing JWT presence via middleware/guard components. Contains `/dashboard`, `/history`, `/settings`.
  - `/src/app/api/` - Backend API routes (Auth, Analysis, Payments, Products, History).
  - `/src/app/blog/` - Public-facing SEO content directory.
- `/src/components/` - Reusable UI components.
  - `/src/components/dashboard/` - Complex, stateful views for the core product (EditorView, HistoryView, Pricing).
  - `/src/components/ui/` - Abstracted, reusable design primitives (`NeoButton`, `LoadingScreen`).
- `/src/lib/` - High-level server utilities (`prisma.client`, `auth.ts`, `credits.ts`).
- `/src/services/` - Abstractions for external APIs (`geminiService.ts`).
- `/prisma/` - Database schema definition (`schema.prisma`) and seeding logic (`seed.ts`).

## SEO & Discoverability Strategy
The product relies on organic search for acquisition. 
- **SEO Architecture:** Uses Next.js Metadata API and JSON-LD (`layout.tsx`, `page.tsx`).
- **Target Keywords:** "Reddit Shadowban Checker", "Reddit Compliance Tools", "Subreddit Rules Analyzer", "Reddit Marketing Guide".
- **Indexable Surface:** `/`, `/blog`, `/blog/[id]`, `/payments`, `/login`, `/signup`.
- **Blocked Surface:** All authenticated routes (`/dashboard`, `/history`, `/settings`, `/api`) to prevent crawler traps and leaking private states.
- **Strategy Implementation:** Global generic organization data in root layout, highly specific, targeted descriptions in individual public page metadata.

## Constraints, Tradeoffs & Assumptions
- **Constraint (Database Level):** The tool simulates Reddit API rule-fetching. It currently relies on the LLM's internal knowledge of general Reddit etiquette rather than real-time scraping of subreddit sidebars via the Reddit API. *(Inference based on `geminiService` implementation).*
- **Tradeoff (Auth System):** The system uses a roll-your-own JWT implementation instead of an established provider like Auth0, NextAuth, or Clerk. This reduces external dependency costs but increases maintenance and security liability.
- **Tradeoff (Client/Server Balance):** To support Next.js 13+ SEO Metadata, interactive pages (like `/`, `/payments`, `/blog/[id]`) are split into Server Components for `<head>` injection and client-side `*Client.tsx` components for interactive React hooks, leading to slight file bloat.

## What Success Looks Like
- **Technical Metrics:** Low latency on AI generation (< 3 seconds), zero client-side crashes, successful automated daily credit resets.
- **Product Metrics:** High conversion rate from free tier (3 credits) to "Creator Plus" plan. High retention rate governed by users returning for subsequent post checks.
- **Marketing Metrics:** Rapid indexing of `/` and `/blog` routes, resulting in organic top-10 SERP placement for "Reddit Shadowban Checker".

## Future Direction & Evolution
Based on current architecture and natural product progression:
- **Direct Reddit API Integration:** Transitioning from LLM-hallucinated subreddit rules to actual live fetches of `r/subreddit/about/rules`.
- **Scheduled Posting:** Taking the optimized draft and utilizing OAuth to post directly to Reddit on behalf of the user.
- **Browser Extension:** Building a Chrome extension that injects the SubSafe compliance score directly into the native `reddit.com/submit` text box.
