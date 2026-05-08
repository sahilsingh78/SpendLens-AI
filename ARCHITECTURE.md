# ARCHITECTURE.md

## System Diagram

```mermaid
flowchart TD
    A[User visits spendlens.vercel.app] --> B[Landing Page - app/page.tsx]
    B --> C[SpendForm Component]
    C -->|tool, plan, seats, spend, teamSize, useCase| D[POST /api/audit]
    D --> E[Zod Validation]
    E -->|invalid| F[422 Error Response]
    E -->|valid| G[runAuditEngine - lib/audit-engine.ts]
    G --> H[Match tools against RECOMMENDATION_RULES]
    H --> I[Compute monthlySavings per tool]
    I --> J[Derive tier: optimal / low / mid / high]
    J --> K[AuditResult object with nanoid ID]
    K --> L[saveAudit to Supabase - async, non-blocking]
    K --> M[Return AuditResult to client]
    M --> N[Audit Results Page - client renders]
    N --> O[POST /api/summary - Anthropic API]
    O -->|success| P[AI Summary paragraph]
    O -->|failure| Q[Templated fallback summary]
    N --> R[User sees SavingsHero + RecommendationCards]
    R --> S[User enters email - LeadCaptureForm]
    S --> T[POST /api/lead]
    T --> U[saveLead to Supabase]
    T --> V[Send email via Resend]
    R --> W[Share button - unique URL]
    W --> X[/audit/id - public shareable page]
    X --> Y[GET /api/share?id=...]
    Y --> Z[getAudit from Supabase - returns public_data only]
    X --> AA[opengraph-image.tsx - dynamic OG image]
```

---

## Data Flow: Input → Audit Result

1. **User fills SpendForm** — selects tools, plans, seat counts, enters actual monthly spend, sets team size and use case. Form state is persisted in `localStorage` so refreshing doesn't lose progress.

2. **POST /api/audit** — request body is validated with Zod (`AuditInputSchema`). Invalid requests get 422. Rate limit is checked (10 requests/IP/hour) — exceeded requests get 429.

3. **runAuditEngine(input)** — pure function in `lib/audit-engine.ts`. For each tool in the input:
   - Looks up matching rules in `RECOMMENDATION_RULES` (data/recommendations.ts)
   - Runs the rule's condition function — `(seats, teamSize, useCase, monthlySpend) => boolean`
   - If a rule fires: computes savings via the rule's formula, sets action and reason
   - If no rule fires: checks if user is overpaying vs list price
   - If neither: returns `action: "keep"` with a reason
   - Aggregates total savings, computes `savingsPercentage`, derives `tier`

4. **Supabase write** — `saveAudit()` writes two copies: `data` (full audit including input) and `public_data` (stripped of email, company — safe for public URLs). Write is fire-and-forget — doesn't block the API response.

5. **Client renders results** — React state updates, results page animates in. `AIInsightCard` fetches `/api/summary` in the background.

6. **Lead capture** — after user enters email, `/api/lead` saves to `leads` table and triggers Resend email with the full breakdown.

7. **Share URL** — `/audit/[id]` fetches `public_data` only from Supabase. No PII exposed. `opengraph-image.tsx` generates a dynamic PNG with the savings number for Twitter/LinkedIn previews.

---

## Why This Stack

**Next.js 14 (App Router)**
Single framework handles: React UI, API routes, server components, dynamic OG images, SSR for audit result pages. No separate backend needed. Vercel deployment is one `git push`.

**TypeScript**
The audit engine is financial logic — incorrect types would cause incorrect savings calculations. TypeScript makes the rule table self-documenting and prevents entire classes of bugs.

**Tailwind CSS**
Rapid iteration on UI without context-switching to CSS files. Dark-mode-only design made the palette trivial to maintain as CSS variables.

**Supabase (Postgres)**
Two tables, simple inserts and selects. Supabase gives us hosted Postgres, a typed JS client, and a dashboard for viewing leads — all in 10 minutes of setup. No ORM needed at this scale.

**Resend**
3000 free emails/month. Simple API. Better deliverability than raw SMTP. The React Email-style HTML template renders consistently across clients.

**Anthropic API (claude-3-5-haiku)**
Haiku is the right model for a 100-word summary — fast, cheap, sufficient quality. Graceful fallback means the page never breaks if the API is down or rate limited.

**Vitest**
Fast, ESM-native, works with the TypeScript config without extra setup. Better DX than Jest for this stack.

---

## What I'd Change at 10k Audits/Day

**Rate limiting → Redis/Upstash**
Current in-memory rate limiter resets on cold start and doesn't work across multiple Vercel instances. At scale, replace with Upstash Redis for distributed rate limiting. 10 minutes of work.

**Supabase connection pooling → PgBouncer**
At 10k audits/day (~7 req/minute average, spiky to 50+/minute), Postgres direct connections become a bottleneck. Supabase's built-in PgBouncer connection pooler handles this — enable it in the Supabase dashboard.

**Audit persistence → async queue**
Currently DB write is fire-and-forget in the API handler. At high volume, failed writes are silently lost. Add a simple queue (Upstash QStash or Vercel Cron) to retry failed writes.

**AI summary → edge caching**
The `/api/summary` route calls Anthropic on every page load. At scale, cache the summary in Supabase alongside the audit — generate once, serve from DB forever. Already partially set up with the `aiSummary` field on `AuditResult`.

**Analytics**
Add PostHog or Plausible to measure: form start → completion rate, audit-to-lead conversion, which tools appear most often, which recommendations are most common. This data improves the recommendation engine over time.

---

## Author

**Sahil Singh**  
GitHub: [@sahilsingh78](https://github.com/sahilsingh78)  
Submission for: Credex Web Dev Intern — Round 1, May 2026

---

## License

MIT License

Copyright (c) 2026 Sahil Singh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

*Pricing data verified May 2026. SpendLens is a free tool by [Credex](https://credex.rocks) — discounted AI credits for startups.*