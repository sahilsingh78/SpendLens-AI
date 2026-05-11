# DEVLOG.md

Daily log for SpendLens AI — built for Credex Web Dev Intern Round 1.

---

## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:**
Got the assignment email. Read it twice because it's actually a lot. First thought was "okay this is basically a SaaS product not just a coding problem." Spent most of the time just understanding what they actually want — the Credex business model, why a free audit tool makes sense as lead gen, why email should come after results not before.

Stack decision was pretty quick — Next.js because I've used it before and API routes + SSR in one framework just makes sense here. Tailwind because I'm faster with it. Supabase because I didn't want to set up Postgres from scratch in 7 days.

Spent an hour going through all the pricing pages. Cursor Business is $40 not $20 like I thought. Claude has a Max plan now at $100 and $200 that I had no idea existed.

**What I learned:**
Don't assume you know current pricing. I would've hardcoded wrong numbers from memory. Always check the actual page.

**Blockers / what I'm stuck on:**
API tools like Anthropic API and OpenAI API are pay-per-token not seat based. Didn't know how to put that in a form. Decided to just let users type their actual monthly spend — simple and honest.

**Plan for tomorrow:**
Set up the repo properly and start building the audit engine and types.

---

## Day 2 — 2026-05-07

**Hours worked:** 3

**What I did:**
Initialized the Next.js project. Spent longer than expected on the TypeScript types in `lib/types.ts` — wanted to get `ToolEntry`, `AuditInput`, `AuditResult` right before writing any component because changing types later is painful.

Started designing the recommendation rule table. Each rule has: which tool, which plan, a condition, a savings formula, and a reason string. The reason string is the most important part — it has to sound like a finance person wrote it, not a developer.

Went through all 8 pricing pages again and finalized `data/pricing-data.ts`.

**What I learned:**
Doing types first actually saves time. Every component I write after this just autocompletes because TS knows the shape of everything.

**Blockers / what I'm stuck on:**
Credits recommendations (for API tools) are different from plan-switch recommendations. A "downgrade" saves money by switching plans. A "credits" recommendation saves money through a different purchasing channel. Needed a separate action type for this.

**Plan for tomorrow:**
Build everything — audit engine, form, API routes, results page. Big day.

---

## Day 3 — 2026-05-08

**Hours worked:** 8

**What I did:**
Long day. Built basically the entire app.

`lib/audit-engine.ts` — takes your tools, runs them through the rule table, spits out savings per tool, total savings, and a tier (optimal/low/mid/high).

Form components — `SpendForm.tsx`, `ToolSelector.tsx`, `PricingInput.tsx`, `SeatCounter.tsx`, `TeamSizeInput.tsx`, `UseCaseSelect.tsx`. Form state saves to localStorage so if you refresh you don't lose everything.

Landing page — hero with ticker, features grid, FAQ accordion, stats section.

All 4 API routes — audit, lead, share, summary.

Results page — savings hero, per-tool cards, bar chart, pie chart, AI insight card, share button, email form.

Deployed to Vercel at the end of the day. It actually worked first try which was surprising.

**What I learned:**
Two things broke the Vercel build:

1. `createClient()` from Supabase at module level — `process.env.NEXT_PUBLIC_SUPABASE_URL` is undefined at build time. Fix was to move the client creation inside a function so it only runs when actually called at runtime.

2. Same issue with Resend — `new Resend(process.env.RESEND_API_KEY)` at the top of the file = build crash. Same lazy initialization fix.

OG image needs `export const runtime = "edge"` — took me 30 mins to find this in the docs.

**Blockers / what I'm stuck on:**
TypeScript was throwing `Duplicate identifier 'createClient'`. Spent almost 2 hours on this. I had created a `global.d.ts` file early on with `declare module "@supabase/supabase-js"` to fix a different error, forgot about it, and it was conflicting with the real package types. Deleted the block and it fixed immediately. The error message pointed to `supabase.ts` line 4 but the actual problem was in `global.d.ts`. Annoying.

**Plan for tomorrow:**
Tests, CI, markdown docs, fix anything broken.

---

## Day 4 — 2026-05-09

**Hours worked:** 6

**What I did:**
Wrote 41 tests using Vitest across 5 files — audit engine, pricing, recommendations, validation, API logic. Setting up Vitest with Next.js path aliases required adding `resolve.alias` to vitest config manually — not in the docs anywhere obvious.

CI pipeline — `npm ci` was failing because `package-lock.json` didn't have vitest in it after I installed locally. Switched to `npm install` in the workflow.

Wrote all 12 markdown docs. GTM, ECONOMICS and USER_INTERVIEWS took the longest.

Email debugging — FROM_EMAIL was broken, rendering as `SpendLens <onboarding@>` with nothing after the @. Fixed to just `onboarding@resend.dev`.

Found that `NEXT_PUBLIC_APP_URL` wasn't set in Vercel so all share links were showing `localhost:3000`. Added it to env vars and redeployed.

**What I learned:**
`npm ci` is strict about lock file sync. Install something locally, forget to commit the lock file, CI breaks. Should have committed it immediately.

Resend sandbox only sends to your own registered email — not obvious from the docs.

**Blockers / what I'm stuck on:**
The lock file issue took longer than it should have.

**Plan for tomorrow:**
Fix form bugs, add favicon, accessibility checks.

---

## Day 5 — 2026-05-10

**Hours worked:** 5

**What I did:**
Three form bugs that were bothering me:

1. Team size input was showing "05" when you typed 5. React controlled number input issue — if `value={someNumber}` and the number is 0, you can't clear it to type something new. Fixed with `value={value === 0 ? "" : value}` and `onBlur` to reset to minimum if empty.

2. Same fix for PricingInput and SeatCounter.

3. Tool and Plan dropdowns weren't at the same height — label spacing was inconsistent. Fixed with `grid-cols-2` and `flex flex-col gap-1.5`.

Added SpendPieChart which I had missed — `AuditBreakdown.tsx` was only showing the bar chart. Added both side by side.

Added favicon — green S logo, placed in `public/icons/`.

**What I learned:**
React number inputs are surprisingly tricky. Empty string as the displayed fallback when value is 0 is the right pattern.

**Blockers / what I'm stuck on:**
Charts weren't showing at first. `SpendPieChart` was using `ToolInput` type which doesn't exist in my types — should be `ToolEntry`. Classic typo.

**Plan for tomorrow:**
Lighthouse audit, accessibility fixes, final polish.

---

## Day 6 — 2026-05-11

**Hours worked:** 4

**What I did:**
Ran Lighthouse on mobile. Performance 99, Accessibility 84, Best Practices 100, SEO 100. Accessibility was below required 90 so fixed:

- Added `htmlFor` + `id` to form labels and inputs — TeamSizeInput and UseCaseSelect labels weren't connected to their inputs
- Added `role="img"` + `aria-label` to chart wrappers
- Changed `--text-muted` from `#888888` to `#a0a0a0` — `#888` on `#111` fails WCAG AA contrast

After fixes Accessibility went 84 → 91. ✅

Added benchmark comparison card to results page — shows your spend per dev vs peer average for your company stage.

Fixed pie chart tooltip text color — wasn't setting `labelStyle` and `itemStyle` explicitly so values showed in dark on hover.

**What I learned:**
`labelStyle` and `itemStyle` go on the Tooltip in Recharts, not Legend. Putting them on Legend throws a TypeScript overload error.

**Blockers / what I'm stuck on:**
Nothing major.

**Plan for tomorrow:**
Final QA, submit.

---

## Day 7 — 2026-05-12

**Hours worked:** 4

**What I did:**
Final QA in incognito — full flow: form → audit → results → share link → email.

Share buttons (X and LinkedIn) weren't clickable — they were `<button>` elements calling `window.open()`. Browsers block this pattern. Fixed by replacing with `<a href="..." target="_blank">`.

Ran `npm test` — 41 pass. GitHub Actions green. All 12 docs present. Lighthouse still 91 Accessibility.

Lighthouse mobile final scores: Performance 99, Accessibility 91, Best Practices 100, SEO 100.

Submitted the Google Form.

**What I learned:**
Always use actual anchor tags for external links. `window.open()` inside a button click handler gets blocked by browsers as a popup.

**Blockers / what I'm stuck on:**
Nothing. Done.

**Plan for tomorrow:**
Wait for Round 2.