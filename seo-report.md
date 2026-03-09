# SEO Risk & Confidence Report: SubSafe

## Framework & Capability Detection (Phase 1)
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript (TS)
- **Rendering Model:** SSR / Client-side Hydration
- **SEO Mechanisms:**
  - **Head Management:** Metadata API (`generateMetadata` and static `metadata`)
  - **Robots/Sitemap:** File-based (`robots.ts`, `sitemap.ts`)
  - **AEO Capability:** Selective JSON-LD injection via server components

## Page Eligibility Resolution (Phase 2)
Based on `business-intent.md` surface classification:

| Page | Indexable | Sitemap | AEO Eligible | Strategy |
|------|-----------|---------|--------------|----------|
| Home (`/`) | Yes | Yes | Yes | Aggressive |
| Blog (`/blog`) | Yes | Yes | Yes | Content-heavy |
| Blog Post (`/blog/*`) | Yes | Yes | Yes | Dynamic AEO |
| Payments (`/payments`) | Yes | Yes | No | Transactional |
| Login/Signup | Yes | Yes | No | Conversational |
| Dashboard (`/dashboard`) | NO | NO | NO | AUTH PROTECTED |
| History (`/history`) | NO | NO | NO | AUTH PROTECTED |
| API (`/api/*`) | NO | NO | NO | BACKEND |

## Implementation Scope (Phase 3 & 4)
- **Global:** refined `layout.tsx` (already exists, will refine if gaps found).
- **Core:** Refine metadata for Home, blog, and dynamic blog posts.
- **Sitemap:** Ensure `BLOG_POSTS` in `sitemap.ts` are stable.
- **Robots:** Explicitly block `/payments/success` and `/payments/error`.

## Risk Assessment
- **Breaking Logic:** Low. Using native Metadata API prevents side-effects.
- **Performance:** Low. Metadata handled by Next.js at build/request time.
- **AEO Confidence:** High for Home/Blog; Moderate for dynamic posts (generic titles used).

## Framework Limitations encountered
- Dynamic `generateMetadata` for blog posts currently uses IDs because real content fetching is mock-dependent in this environment. Skip fetching real titles to avoid runtime errors.
