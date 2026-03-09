# SubSafe: Business & Execution Readiness Assessment

## 1. Product Identity & Business Intent
- **What product this appears to be:** An AI-powered SaaS tool ("SubSafe") designed to act as a compliance and pre-flight optimization engine for Reddit posts.
- **Business problem being addressed:** Reducing the risk of users (marketers, founders, community managers) receiving account shadowbans or post removals due to nuanced, undocumented, or automated subreddit rules.
- **Market or operational context:** Targets a highly restrictive top-tier social/distribution channel where promotional mistakes are heavily penalized.
- **Confidence level of this assessment:** High. 

## 2. Product Stage & Readiness Assessment
- **Current stage:** Early Production / MVP Candidate.
- **Evidence from code supporting this classification:** 
  - Robust routing separating public and `(authenticated)` spaces.
  - Functional integration with an external LLM (`@google/genai`) and payment gateway (`Dodo Payments`).
  - Active credential storage/authentication handling (`bcryptjs`, HTTP-only cookies).
  - Production-level SEO tagging and OpenGraph data is injected via Next.js metadata API.
- **What is realistically usable today:** User registration, AI-driven rule analysis of a draft post, credit consumption, viewing of analysis history, and initiation of a paid subscription upgrade.

## 3. What Is Implemented (Fact-Based)
- **Fully implemented features:**
  - **Authentication:** Custom JWT-based user login and registration (`/api/auth/*`).
  - **Compliance Engine:** Text processing and LLM-scoring based on subreddit targets, titles, and bodies (`geminiService.ts`).
  - **Credit System:** Free users receive 3 daily credits, tracking `lastCreditReset` and deducting via the database (`credits.ts`).
  - **Dashboard & History:** Archiving analysis results in MongoDB (`AnalysisRequest` model) and retrieving them in UI (`HistoryView.tsx`).
  - **SEO Infrastructure:** Server-component based meta-tagging, XML sitemaps, and robots.txt blocking private states.
- **Partially implemented features:**
  - **Payments:** The `Payment` schema and Dodo Payments checkout flow operate correctly to initiate checkout, but the full webhook ingestion to finalize the upgrade locally relies on implied external callbacks (`redirect_url` appended).
- **Supporting technical evidence:** Evaluated against `schema.prisma`, route configurations in Next.js `app` folder, and explicit service implementations.

## 4. What Is Missing or Incomplete
- **Business-critical missing features:**
  - **Live Reddit API Integration:** The tool utilizes generalized AI knowledge rather than actively scraping or importing live `r/subreddit/about/rules` definitions via the official Reddit API.
- **Technical gaps:**
  - **Webhook Receivers:** Explicit handling of Dodo Payments webhook callbacks (e.g., verifying signature, securely updating `user.plan` asynchronously rather than just relying on a success redirect page) is not overtly visible in standard routes.
  - **Email Infrastructure:** No visible integration (SendGrid, Resend, etc.) for welcome emails, password resets, or billing receipts.
- **Operational gaps (auth, billing, monitoring, etc.):** 
  - Lack of application performance monitoring (APM) or error-reporting SaaS (like Sentry).
  - Auth is a custom JWT implementation without 2FA or robust session-invalidation structures currently visible beyond clearing cookies.

## 5. MVP Scope vs Current Reality
- **Intended MVP (inferred):** A functional web app where users can sign up, paste Reddit drafts, receive AI feedback on safety, and pay to remove daily limits.
- **What currently matches MVP:** The core loop (Draft -> AI Analysis -> History) and the free vs. paid segmentation (Credit limits vs. Unlimited).
- **What exceeds MVP:** Advanced Reddit-style WYSIWYG previewing, which adds significant visual value over raw text feedback. 
- **What falls short:** The absence of a robust automated webhook handler for payments could cause manual support overhead for plan upgrades.

## 6. How the System Works (Execution Summary)
- **High-level runtime behavior:** Next.js Server Components handle routing and public SEO. Protected client components fetch data securely from Next.js API endpoints, which interact with Prisma/MongoDB.
- **Data movement (textual):** 
  - `Client Draft` → `API Route` → `AI Service (Gemini)`
  - `AI Service Response` → `API Route` → `MongoDB (Save History)` → `Client UI (Render Score & Rules)`
- **Key execution paths:** The most critical path is the POST request to the analysis engine, which hinges on the JWT token verification and credit balance check before invoking the rate-limited LLM API.

## 7. Technical Architecture & Stack Assessment
- **Tech stack used:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Prisma ORM, MongoDB, custom JWT Auth, Google Gemini AI.
- **Architectural quality:** High. Modern separation of concerns with Server vs. Client components. Database schema is normalized.
- **Scalability posture:** Moderate. MongoDB scales well horizontally, and Next.js can be deployed serverlessly (e.g., Vercel). The bottleneck will be the external LLM API rate limits.
- **Maintainability signals:** Good. Strict TypeScript typing, utility extraction (`/lib`, `/services`), and cohesive component structuring (`/components/dashboard`, `/components/ui`).

## 8. Folder & Code Responsibility Mapping
- `src/app/api/`: State mutation, external API brokering, authentication guards, business logic execution.
- `src/app/(authenticated)/`: High-value private data rendering (Dashboard, User History).
- `src/app/blog/` & `src/app/page.tsx`: Top-of-funnel acquisition, SEO optimization, value proposition messaging.
- `src/lib/`: Reusable, critical backend invariants (Database singleton, Auth token decoding, Credit logic).
- `prisma/`: The structural anchor for application state and relationships.

## 9. SEO, Distribution & Discoverability Readiness
- **Whether SEO is relevant:** Highly relevant. This is a B2B/Prosumer SaaS that requires organic inbound traffic.
- **Current readiness based on code:** Excellent. Strong use of Semantic HTML, dynamic Metadata API, generated JSON-LD for rich snippets, and disciplined `sitemap.ts`/`robots.ts` usage to funnel web crawlers efficiently.
- **Missing pieces if SEO is a goal:** Nothing structurally. Content scaling (publishing more blog entries) is the only required task.

## 10. Risks, Constraints & Tradeoffs
- **Technical risks:** Custom JWT implementation carries higher security risk than OAuth providers.
- **Business risks:** Complete dependency on Google Gemini for the core value proposition. If the model hallucinates compliance, user trust degrades instantly.
- **Cost or scale limitations:** LLM inference costs and rate limits directly impact gross margins, especially if free users exhaust their 3 daily credits consistently without converting.
- **Product risks:** Reddit changing their moderation UI/rules rendering the visual preview obsolete or the AI assumptions incorrect.

## 11. Success Criteria & Metrics (Analytical)
- **What success would look like:** Organic top 3 SERP ranking for "Reddit Shadowban Checker". High conversion percentage from free sign-up to paid subscriber.
- **What metrics are currently trackable:** Registered users, credits consumed per day, active subscriptions (via DB).
- **What is missing to measure success:** Frontend analytics tracking (e.g., Google Analytics, PostHog) to measure landing page bounce rates and funnel drop-off between signup -> first draft analysis.

## 12. Strategic Outlook
- **What this product can realistically become:** A niche but highly profitable Micro-SaaS targeting digital PR firms, indie hackers, and community managers.
- **What must be built next to reach viability:** Hardened webhook infrastructure for payment finalization and automated welcome/receipt emails to reduce support tickets.
- **Long-term feasibility signals:** Strong. The foundational architecture supports rapid iteration and the core problem (Reddit moderation opacity) is enduring. 
