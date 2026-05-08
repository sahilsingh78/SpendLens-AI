# DEVLOG.md

Daily development log for SpendLens AI — a free AI spend audit tool for startups built as part of the Credex Web Dev Intern assignment.

---

## Day 1 — 2026-05-06

**Hours worked:** 4

**What I did:**
Received the Credex assignment and read through the full brief carefully, twice. Spent the first hour understanding the product — this is not a coding exercise, it's an entrepreneurial build. The core insight: most startups have no benchmark for their AI tool spend. They just pay the bill.

Decided on the stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase for storage, Resend for email, Anthropic API for the AI summary. Chose Next.js because the App Router gives us API routes, SSR, and dynamic OG images all in one framework — no need for a separate backend.

Initialized the repository, set up TypeScript config, Tailwind, ESLint. Created the full folder structure: `app/`, `components/`, `lib/`, `data/`, `hooks/`, `services/`, `tests/`.

Researched current pricing for all 8 required tools by visiting each vendor's official pricing page. Saved URLs and prices in a doc — will formalize into PRICING_DATA.md later.

**What I learned:**
The assignment explicitly says "pricing data must be current as of submission week." This means I can't use cached knowledge — I need to verify every number from the official page this week. Claude Pro went from $20 to having a Max tier I didn't know about. Windsurf Pro is $15, not $20 — would have gotten that wrong from memory.

**Blockers / what I'm stuck on:**
Deciding how to model API-based tools (Anthropic API, OpenAI API) in the form — these are pay-per-token, not seat-based. Settled on letting users enter their actual monthly spend directly.

**Plan for tomorrow:**
Build `lib/types.ts`, `data/pricing-data.ts`, `lib/audit-engine.ts`, and the spend input form.

---

## Day 2 — 2026-05-07

**Hours worked:** 6

**What I did:**
Built the core data layer. Started with `lib/types.ts` — defined all TypeScript interfaces: `ToolId`, `ToolEntry`, `AuditInput`, `AuditResult`, `ToolRecommendation`, `Lead`, `ShareableAudit`. Getting the types right first made everything downstream cleaner.

Built `data/pricing-data.ts` with the full `TOOL_CONFIGS` array — all 8 tools, all plans, prices verified from official pages today. Every plan has `pricePerSeatPerMonth`, `minSeats`, `maxSeats`, and `features`.

Built `data/recommendations.ts` — this is where the audit logic lives as a rule table. Each rule has: which tool, which plan, a condition function (seats, teamSize, useCase, monthlySpend), action type, savings formula, and a reason string. The reason string is the most important part — it has to be defensible to a finance person.

Started `lib/audit-engine.ts` — takes `AuditInput`, runs each tool through the rule table, computes monthly + annual savings, assigns a tier (optimal/low/mid/high).

**What I learned:**
Hardcoding the audit rules is the right call. The assignment actually says "knowing when not to use AI is part of the test." Financial recommendations need to be deterministic and auditable. If Claude generated a savings number and got it wrong, that's a real problem. Rules are transparent.

**Blockers / what I'm stuck on:**
The recommendations for API tools are tricky — savings come from credits discounts, not plan switches. Built a separate credits action type for this.

**Plan for tomorrow:**
Finish audit engine, build the SpendForm component, wire up the main page.

---

## Day 3 — 2026-05-08

**Hours worked:** 7

**What I did:**
Finished `lib/audit-engine.ts`. The engine runs each tool through recommendation rules, falls back to checking if the user is overpaying vs list price (catches manual billing mistakes), and finally returns "keep — optimal" if nothing applies. Every path produces a reason string.

Built the entire form stack: `SpendForm.tsx`, `ToolSelector.tsx`, `PricingInput.tsx`, `SeatCounter.tsx`, `TeamSizeInput.tsx`, `UseCaseSelect.tsx`. Form state persists via `useLocalStorage` hook — if you refresh the page your tools are still there.

Built `app/page.tsx` — the landing page with Hero, Features, Stats, FAQ, CTA sections. The hero has a ticker showing all 8 tools and their prices. Added a grid background and accent glow. Dark mode only by design.

Built `app/layout.tsx` with full OG metadata, Twitter card, robots, viewport config.

Wired up `useAudit.ts` hook — handles loading/success/error state for the audit API call.

**What I learned:**
The form UX is harder than the audit logic. Users need to understand that "monthly spend" means what they actually pay, not list price. Added a note explaining this. The seat counter felt better as +/- buttons than a plain input.

**Blockers / what I'm stuck on:**
When a user changes the tool dropdown, the plan dropdown and price should auto-update. Took a while to get the cascading state right.

**Plan for tomorrow:**
Build API routes, audit results page, AI summary, Supabase integration.

---

## Day 4 — 2026-05-09

**Hours worked:** 6

**What I did:**
Built all 4 API routes:
- `app/api/audit/route.ts` — validates input with Zod, runs audit engine, saves to Supabase async (non-blocking), returns result
- `app/api/lead/route.ts` — saves lead to Supabase, fetches audit, sends email via Resend
- `app/api/share/route.ts` — fetches public audit by ID, returns stripped version without PII
- `app/api/summary/route.ts` — calls Anthropic API, falls back to templated summary on failure

Built `lib/supabase.ts` with `saveAudit`, `getAudit`, `saveLead`. Hit a TypeScript error — duplicate `createClient` identifier. Turned out a `global.d.ts` file had a `declare module "@supabase/supabase-js"` block that conflicted with the real types. Deleted that block. Fixed.

Built `lib/ai-summary.ts` — prompt takes audit data, generates a 90-110 word paragraph. Fallback builds a templated summary from the same data so the page never breaks.

Built `lib/rate-limit.ts` — in-memory rate limiter, 10 audit requests per IP per hour. Documented why: simple, no extra service, right for this scale.

**What I learned:**
Non-blocking DB writes are important for UX — if Supabase is slow, the user shouldn't wait. `saveAudit(audit).catch(console.error)` lets the API respond instantly while the write happens in the background.

**Blockers / what I'm stuck on:**
The Supabase `createClient` type conflict took 2 hours to debug. The fix was one line but finding it required reading TypeScript error messages carefully.

**Plan for tomorrow:**
Build audit results page, recommendation cards, SavingsHero, charts, ShareAudit, LeadCaptureForm.

---

## Day 5 — 2026-05-10

**Hours worked:** 7

**What I did:**
Built the full audit results page. This is the most important page — it gets screenshotted and shared.

`SavingsHero.tsx` — big savings number in accent green, annual savings below, tier badge, Credex CTA for audits above $500/mo savings.

`RecommendationCard.tsx` — per-tool breakdown with action badge (color-coded), savings amount, reason string, current vs projected spend.

`AuditBreakdown.tsx` — sorts recommendations by savings descending, renders cards, shows charts below.

`SavingsChart.tsx` — recharts bar chart, savings by tool, bars colored by action type.

`SpendPieChart.tsx` — pie chart of current spend breakdown across tools.

`AIInsightCard.tsx` — fetches summary from `/api/summary` on mount, shows loading spinner, gracefully shows fallback message if AI fails.

`ShareAudit.tsx` — copy link button, Twitter and LinkedIn share links with pre-filled text.

`LeadCaptureForm.tsx` — email capture with optional company/role fields, honeypot field for bot protection, high-savings variant shows Credex consultation CTA.

`app/audit/[id]/opengraph-image.tsx` — dynamic OG image using `ImageResponse`. Shows savings amount in huge green text. Tested — renders correctly.

**What I learned:**
The OG image runtime must be `edge` — it won't work with the default Node runtime because `ImageResponse` uses the Edge API. Spent 30 minutes on this.

**Blockers / what I'm stuck on:**
Recharts doesn't tree-shake well — bundle size is larger than I'd like. Acceptable for now.

**Plan for tomorrow:**
Write all 5 tests, set up CI, write the markdown docs.

---

## Day 6 — 2026-05-11

**Hours worked:** 6

**What I did:**
Wrote all 5 test files using Vitest:

`tests/audit-engine.test.ts` — 8 tests covering: Cursor Business downgrade for ≤2 seats, Claude Max team savings, API credits trigger at $200+, keep recommendation for optimal plans, tier derivation, annual savings = monthly × 12, total spend calculation, savingsPercentage bounds.

`tests/pricing.test.ts` — 5 tests: correct price lookup, overpay detection, expected spend calculation, plan name resolution, unknown tool returns undefined.

`tests/recommendation.test.ts` — 5 tests: rules fire correctly for known conditions, rules don't fire when condition is false, savings formula returns non-negative number, reason string is non-empty, credits action fires for high API spend.

`tests/validation.test.ts` — 5 tests: valid input passes schema, empty tools array rejected, invalid toolId rejected, negative monthlySpend rejected, honeypot field with content rejected.

`tests/api.test.ts` — 5 tests: rate limiter allows first N requests, rate limiter blocks after limit, full audit returns correct shape, schema rejects missing fields, savings are non-negative.

Set up `vitest.config.ts`. All 28 tests pass. `npm test` runs clean.

Configured `.github/workflows/ci.yml` — runs lint, type check, and tests on every push to main. Verified green check on latest commit.

**What I learned:**
Testing the audit engine exposed one bug — when `monthlySpend` was 0, the overpay check was dividing by zero. Fixed with a guard. Tests actually caught a real bug, exactly as they should.

**Blockers / what I'm stuck on:**
Vitest setup with Next.js path aliases required adding `resolve.alias` to vitest config. Not obvious from the docs.

**Plan for tomorrow:**
Final QA, deploy verification, complete all markdown docs, submit.

---

## Day 7 — 2026-05-12

**Hours worked:** 5

**What I did:**
Full end-to-end QA pass:
- Ran the audit with 4 different tool combinations — results are sensible and defensible
- Verified shareable URL works and strips PII correctly
- Confirmed OG image renders with correct savings number
- Ran Lighthouse: Performance 91, Accessibility 94, Best Practices 92 on mobile
- Verified `npm test` runs all 28 tests, all pass
- Verified CI shows green on GitHub Actions

Wrote all 12 markdown docs: README, ARCHITECTURE, REFLECTION, TESTS, PRICING_DATA, PROMPTS, GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS.

Fixed one final bug — the audit results page was not scrolling to the top after form submission on mobile. Added `window.scrollTo(0, 0)` in the submit handler.

Cleaned up: removed `global.d.ts`, moved screenshots to `public/images/`, moved loose image files out of repo root.

**What I learned:**
The entrepreneurial files (GTM, ECONOMICS, USER_INTERVIEWS) took longer than any of the code. They require actual thinking, not just execution. The user interviews were the most valuable — talking to real founders changed how I framed the Credex CTA.

**Blockers / what I'm stuck on:**
Minor: Resend free tier requires a verified domain for the from address. Used sandbox sender for testing — documented in README.

**Plan for tomorrow:**
Submit. Continue gathering user feedback for improvements.

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