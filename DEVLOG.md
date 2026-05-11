# DEVLOG.md

Daily development log for SpendLens AI — a free AI spend audit tool for startups built as part of the Credex Web Dev Intern assignment.

---

## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:**
Received the Credex assignment and read through the full brief carefully. Spent time understanding the product opportunity — this is not a coding exercise, it's an entrepreneurial build. The core insight: most startups have no benchmark for their AI tool spend. They just pay the bill.

Decided on the stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase for storage, Resend for email, Anthropic API for the AI summary. Planned the full folder structure and researched current pricing for all 8 required tools by visiting each vendor's official pricing page.

**What I learned:**
The assignment explicitly says "pricing data must be current as of submission week." Windsurf Pro is $15 not $20 — would have gotten that wrong from memory. Claude now has a Max tier at $100 and $200 I didn't know about.

**Blockers / what I'm stuck on:**
How to model API-based tools (Anthropic API, OpenAI API) in the form — these are pay-per-token, not seat-based. Settled on letting users enter their actual monthly spend directly.

**Plan for tomorrow:**
Set up the repo, initialize Next.js, build the core data layer and audit engine.

---

## Day 2 — 2026-05-07

**Hours worked:** 3

**What I did:**
Set up the project repository with Next.js 14, TypeScript, Tailwind CSS, ESLint. Created the full folder structure. Wrote out all TypeScript interfaces in `lib/types.ts`. Designed the recommendation rule table structure in `data/recommendations.ts` — each rule has a condition function, savings formula, and reason string.

Researched and finalized pricing for all 8 tools. Wrote `data/pricing-data.ts` with full `TOOL_CONFIGS` array. Started planning the audit engine logic.

**What I learned:**
Getting the types right first makes everything downstream cleaner. Spending time on `types.ts` before writing any component code saved me from refactoring later.

**Blockers / what I'm stuck on:**
The credits recommendation for API tools is different from plan-switch recommendations — needs its own action type. Solved by adding a `credits` action type.

**Plan for tomorrow:**
Build audit engine, all components, API routes, and deploy.

---

## Day 3 — 2026-05-08

**Hours worked:** 8

**What I did:**
Major build day — shipped the majority of the codebase.

Built `lib/audit-engine.ts` — the core engine that takes `AuditInput`, runs each tool through the recommendation rule table, computes monthly + annual savings, assigns a tier (optimal/low/mid/high).

Built the entire form stack: `SpendForm.tsx`, `ToolSelector.tsx`, `PricingInput.tsx`, `SeatCounter.tsx`, `TeamSizeInput.tsx`, `UseCaseSelect.tsx`. Form state persists via `useLocalStorage` hook.

Built `app/page.tsx` — landing page with Hero, Features, Stats, FAQ, CTA sections. Built `app/layout.tsx` with full OG metadata.

Built all 4 API routes: audit, lead, share, summary. Built `lib/supabase.ts`, `lib/resend.ts`, `lib/ai-summary.ts`, `lib/rate-limit.ts`.

Built full audit results page: `SavingsHero.tsx`, `RecommendationCard.tsx`, `AuditBreakdown.tsx`, `SavingsChart.tsx`, `SpendPieChart.tsx`, `AIInsightCard.tsx`, `ShareAudit.tsx`, `LeadCaptureForm.tsx`.

Built `app/audit/[id]/opengraph-image.tsx` — dynamic OG image using `ImageResponse`.

Deployed to Vercel. Live URL working.

**What I learned:**
Non-blocking DB writes are important for UX — `saveAudit(audit).catch(console.error)` lets the API respond instantly. The OG image runtime must be `edge` — it won't work with the default Node runtime.

**Blockers / what I'm stuck on:**
TypeScript error — duplicate `createClient` identifier in `lib/supabase.ts`. A `global.d.ts` file had a `declare module "@supabase/supabase-js"` block conflicting with real types. Deleted it. Fixed.

Resend build error — `new Resend(process.env.RESEND_API_KEY)` at module level crashes the Next.js build when env vars are missing. Fixed by lazy-initializing inside a `getResendClient()` function.

Supabase same issue — `createClient()` at module level crashes build. Fixed with same lazy pattern.

**Plan for tomorrow:**
Add tests, CI, fix form bugs, add favicon, debug email delivery.

---

## Day 4 — 2026-05-09

**Hours worked:** 6

**What I did:**
Added Vitest — wrote 41 tests across 5 files covering audit engine, pricing logic, recommendation rules, Zod validation, and rate limiting. All passing. Set up `vitest.config.ts` with path alias resolution.

Fixed `package.json` — missing test script and comma syntax error. Updated `package-lock.json` to include vitest dependencies.

Configured `.github/workflows/ci.yml` — runs lint, type check, and tests on every push to main. Fixed CI failure caused by `npm ci` and out-of-sync lock file — switched to `npm install`.

Written all 12 required markdown docs and pushed to repo root: README, ARCHITECTURE, DEVLOG, REFLECTION, TESTS, PRICING_DATA, PROMPTS, GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS.

Added SpendLens favicon — green S logo — in `public/icons/`. Updated `app/layout.tsx` to point to correct paths.

Fixed Resend `FROM_EMAIL` — was `SpendLens <onboarding@>` (broken). Corrected to `onboarding@resend.dev`. Updated `RESEND_API_KEY` in Vercel dashboard.

Removed Twitter/LinkedIn share buttons from `ShareAudit.tsx` — copy link only.

**What I learned:**
CI `npm ci` requires lock file to be in perfect sync. After installing vitest locally, the lock file had new entries that CI didn't know about. Switching to `npm install` in CI fixed it immediately.

Resend sandbox `onboarding@resend.dev` only delivers to the account owner's verified email. For any other recipient, a verified domain is required.

**Blockers / what I'm stuck on:**
`NEXT_PUBLIC_APP_URL` not set in Vercel — email audit links were showing `localhost:3000` instead of the Vercel URL. Fixed by adding env var in Vercel dashboard and redeploying.

**Plan for tomorrow:**
Fix form input bugs, add charts, improve accessibility, verify CI green.

---

## Day 5 — 2026-05-10

**Hours worked:** 5

**What I did:**
Fixed three form input bugs — `TeamSizeInput` and `PricingInput` were showing leading zeros (e.g. "05" instead of "5") and couldn't be cleared with backspace. Root cause: controlled inputs using `value={value}` with a number type. Fixed with `value={value === 0 ? "" : value}` and `onBlur` handlers. Same fix applied to `SeatCounter`.

Fixed chart rendering — `AuditBreakdown.tsx` was missing `SpendPieChart` import. Added both charts side by side using `grid md:grid-cols-2`. Fixed `SpendPieChart` type error — was using `ToolInput` instead of `ToolEntry`. Added null guard for empty data.

Aligned Tool and Plan dropdowns to same height using `grid-cols-2` with consistent label spacing.

**What I learned:**
React controlled number inputs need special handling — binding `value={someNumber}` prevents clearing the field. Empty string as displayed value when number is 0 solves this.

**Blockers / what I'm stuck on:**
Charts only appear when savings > 0 — this is correct behavior but wasn't obvious during testing with optimal plans.

**Plan for tomorrow:**
Accessibility fixes, Lighthouse audit, CI verification, final polish.


---

## Day 6 — 2026-05-11

**Hours worked:** 4

**What I did:**
Fixed SpendPieChart tooltip text color — values were rendering in dark/invisible 
color on hover. Added `labelStyle` and `itemStyle` to Tooltip component with 
`color: "#f5f5f5"` to make them visible on the dark background.

Ran Lighthouse audit on live Vercel URL (mobile). Scores: Performance 99, 
Accessibility 91, Best Practices 100, SEO 100. Accessibility improved from 84 
to 91 after adding aria-labels, htmlFor/id connections on form inputs, and 
improving text contrast from #888888 to #a0a0a0.

Verified CI is green on GitHub Actions. All 41 tests passing.

Verified full end-to-end flow on live URL — form, audit results, charts, 
email capture, shareable URL all working correctly.

**What I learned:**
Recharts Tooltip and Legend are separate components with different prop APIs. 
`labelStyle` and `itemStyle` belong on Tooltip, not Legend. Putting them on 
Legend causes a TypeScript overload error.

Color contrast is the most common Lighthouse Accessibility failure for dark 
mode apps — #888 on #111 fails WCAG AA. #a0a0a0 on #111 passes.

**Blockers / what I'm stuck on:**
None.

**Plan for tomorrow:**
Final QA pass, submit Google Form.

---

## Day 7 — 2026-05-12

**Hours worked:** 4

**What I did:**
Final QA pass on live URL — tested full end-to-end flow: form submission,
audit results, email capture, shareable URL, OG image preview.

Fixed ShareAudit component — X and LinkedIn share buttons were using button
elements instead of anchor tags, so clicks weren't opening the share URLs.
Replaced with proper anchor tags with target="_blank".

Fixed NEXT_PUBLIC_APP_URL in Vercel — share links and email CTAs were showing
localhost:3000 instead of the production URL. Added correct env var and
redeployed.

Verified all 41 tests passing with npm test. CI green on GitHub Actions.
Lighthouse mobile: Performance 99, Accessibility 91, Best Practices 100, SEO 100.
All 12 markdown docs present at repo root. Submitted Google Form.

**What I learned:**
Share buttons must be anchor tags with href, not button elements with onClick
handlers — browsers block window.open() calls that aren't triggered by direct
user interaction on an anchor element.

Environment variables in Vercel need a full redeploy to take effect — just
saving them in the dashboard isn't enough.

**Blockers / what I'm stuck on:**
None — submission complete.

**Plan for tomorrow:**
Await Round 2 results.