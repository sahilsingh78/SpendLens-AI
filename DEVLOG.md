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

Built `lib/rate-limit.ts` — in-memory rate limiter, 10 audit requests per IP per hour.

Added Vitest, wrote all 41 tests across 5 files. All passing. Set up `vitest.config.ts` with path alias resolution. Configured `.github/workflows/ci.yml` — runs lint, type check, and tests on every push to main.

Written all 12 required markdown docs and pushed to repo root.

**What I learned:**
Non-blocking DB writes are important for UX — if Supabase is slow, the user shouldn't wait. `saveAudit(audit).catch(console.error)` lets the API respond instantly while the write happens in the background.

The Supabase `createClient` type conflict took 2 hours to debug. The fix was one line but finding it required reading TypeScript error messages carefully.

**Blockers / what I'm stuck on:**
CI was failing with `npm ci` because `package-lock.json` was out of sync after adding Vitest. Fixed by switching to `npm install` in CI workflow and committing the updated lock file.

**Plan for tomorrow:**
Fix form input bugs, add favicon, debug email delivery.

---

## Day 5 — 2026-05-10

**Hours worked:** 5

**What I did:**
Fixed three form input bugs — `TeamSizeInput` and `PricingInput` were showing leading zeros (e.g. "05" instead of "5") and couldn't be cleared with backspace. Root cause was controlled inputs using `value={value}` with a number type — replaced with `value={value === 0 ? "" : value}` and added proper `onBlur` handlers to reset to minimum on empty. Fixed `SeatCounter` with the same pattern.

Aligned Tool and Plan dropdowns to sit at the same height using `grid-cols-2` with `flex flex-col gap-1.5` wrappers — previously they were misaligned because labels had inconsistent spacing.

Added SpendLens favicon — green S logo — using icon files placed in `public/icons/`. Updated `app/layout.tsx` icons section to point to the correct paths.

Fixed Resend email sender — `FROM_EMAIL` had a broken format `SpendLens <onboarding@>` which caused all email sends to fail silently. Corrected to plain `onboarding@resend.dev`. Verified email delivery working in Resend dashboard.

Removed Twitter/LinkedIn share buttons from `ShareAudit.tsx` — keeping only the copy link functionality.

**What I learned:**
Controlled number inputs in React need special handling — you can't just bind `value={someNumber}` because clearing the field sets it to NaN or 0 immediately. The pattern of using empty string as the displayed value when the number is 0 solves this cleanly.

Resend sandbox sender restrictions — `onboarding@resend.dev` only delivers to the Resend account owner's verified email. For production use, a verified domain is required.

**Blockers / what I'm stuck on:**
`NEXT_PUBLIC_APP_URL` not being picked up correctly — the email CTA link was showing `localhost:3000` instead of the Vercel URL. Fixed by ensuring the env var is set in Vercel dashboard and redeploying.

**Plan for tomorrow:**
Accessibility improvements, Lighthouse audit, CI verification, final polish.

---

## Day 6 — 2026-05-11

**Hours worked:** 4

**What I did:**
Ran Lighthouse audit on the live Vercel URL. Scores: Performance 91, Accessibility 92, Best Practices 90. All above required thresholds.

Added `aria-label` attributes to chart wrapper divs in `SavingsChart.tsx` and `SpendPieChart.tsx`. Added `role="img"` to decorative chart containers. Added `aria-label` to copy button in `ShareAudit.tsx`.

Verified GitHub Actions CI is green on latest commit. All 41 tests pass in CI.

Verified all 6 Vercel environment variables are correctly set.

Did a full end-to-end test on the live URL — form submission, audit results, email capture, shareable URL, OG image preview all working correctly.

**What I learned:**
Lighthouse accessibility checks flag missing ARIA labels on non-text elements like charts even when purely decorative. Adding `role="img"` with `aria-label` is the correct fix.

**Blockers / what I'm stuck on:**
None significant.

**Plan for tomorrow:**
Final submission prep, last DEVLOG entry, submit Google Form.

---

## Day 7 — 2026-05-12

**Hours worked:** 3

**What I did:**
Final pre-submission checklist:
- Verified live URL works in incognito: `https://spend-lens-ai-uah9.vercel.app` ✅
- Ran `npm test` — all 41 tests passing ✅
- Confirmed CI green on GitHub Actions ✅
- Confirmed all 12 markdown docs at repo root ✅
- Ran git log — commits on 5+ distinct calendar days ✅
- Verified shareable audit URL strips PII correctly ✅
- Verified OG image renders with savings number ✅

Submitted the Google Form with GitHub repo URL and live deployed URL.

**What I learned:**
The entrepreneurial files (GTM, ECONOMICS, USER_INTERVIEWS) took longer than any of the code. They require actual thinking, not just execution. The user interviews were the most valuable part — talking to real founders changed how I framed the Credex CTA.

Shipping a complete product in 7 days requires making quick decisions and not revisiting them.

**Blockers / what I'm stuck on:**
None — submission complete.

**Plan for tomorrow:**
Await Round 2 results. Continue improving the recommendation engine based on user feedback.