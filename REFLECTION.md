# REFLECTION.md

---

## 1. The hardest bug I hit this week, and how I debugged it

The hardest bug was the `Duplicate identifier 'createClient'` TypeScript error that broke my Vercel deployment on Day 4.

The error message was: `./lib/supabase.ts:4:19 Type error: Duplicate identifier 'createClient'`. My first hypothesis was that I had imported `createClient` twice in the same file — I checked, I hadn't. Second hypothesis: two files were both exporting a function called `createClient` and TypeScript was seeing a collision. I checked every file in `lib/` — nothing.

Third hypothesis: a type declaration file somewhere was redeclaring the Supabase module. I searched the repo for `declare module` and found it — a `global.d.ts` file in the root that I had created early in the project to suppress a different type error. It contained:

```ts
declare module "@supabase/supabase-js" {
  export function createClient(supabaseUrl: string, supabaseAnonKey: string): any;
}
```

This was conflicting directly with the real type definitions from the installed `@supabase/supabase-js` package. TypeScript was seeing `createClient` declared in both `node_modules/@supabase/supabase-js/dist/...` and in my `global.d.ts`, hence "duplicate identifier."

The fix was to delete the `declare module` block from `global.d.ts` entirely. The real package types handle everything correctly — I had added the declaration early on to suppress an unrelated error and forgotten it was there.

What I'd do differently: never use `declare module` to patch a type from a real npm package. Use `skipLibCheck: true` in tsconfig (which I already had) or fix the root cause instead.

The lesson: TypeScript's error messages point to the symptom, not always the cause. The error said `supabase.ts` line 4 — but the real problem was in `global.d.ts`. Always search for `declare module` when you see duplicate identifier errors on npm packages.

---

## 2. A decision I reversed mid-week, and what made me reverse it

On Day 1, I planned to use Prisma + Postgres on Render as my database instead of Supabase. My reasoning was that Prisma gives better TypeScript types, more control over schema migrations, and I'm more familiar with it.

I reversed this on Day 2 for three reasons.

First, the assignment deadline is 7 days. Prisma setup with a hosted Postgres instance on Render requires more configuration time — connection pooling, migration management, environment variable setup across local and production. Supabase gives me a Postgres instance, a JS client, and a dashboard in under 10 minutes.

Second, Supabase's `@supabase/supabase-js` client is lighter for this use case. I'm doing simple inserts and selects — I don't need an ORM. The Supabase client is essentially typed fetch calls to PostgREST.

Third, I realized I was making a familiar-technology choice, not a right-for-the-problem choice. Prisma is better for complex relational data models with many joins. This app has two tables: `audits` and `leads`. That doesn't justify the overhead.

The reversal cost me about 30 minutes of restructuring. The benefit was faster development velocity for the rest of the week. I'd make the same call again.

---

## 3. What I would build in week 2 if I had it

Week 2 would be three things in priority order.

**First: real benchmark mode.** Right now the audit compares your spend against plan pricing. It doesn't tell you how you compare to other startups your size. I'd add a benchmark database — aggregate anonymized audit data to compute median and P75 AI spend per developer by company stage. "Your team spends $110/dev/month. Startups your size average $75. Here's why." This makes the tool genuinely sticky — people run it quarterly to track their position.

**Second: embeddable widget.** A `<script>` tag that any blogger or newsletter author can drop into their site. The form loads in an iframe, the audit runs, the results page is SpendLens. This is a distribution multiplier — every embedded widget is a passive acquisition channel. The spec mentions this as a bonus feature and it's the right call for growth.

**Third: Credex credit calculator.** For users with API spend, show exactly how much they'd save with Credex credits at the current discount rate. Make it interactive — "I spend $X/month on Anthropic API" → "With Credex credits at 35% off, that's $Y saved, or $Z/year." This turns the audit from a lead magnet into a direct sales tool with a clear number attached.

---

## 4. How I used AI tools

I used Claude (claude.ai, Sonnet 4.5) throughout the week as a pair programmer and thinking partner.

**Where I used it:** Generating boilerplate for repetitive components (SeatCounter, PricingInput, EmptyState). Drafting the Resend email HTML — email HTML is tedious and error-prone. Helping structure the recommendation rule table in `data/recommendations.ts`. Writing the Anthropic API prompt for the AI summary feature.

**What I didn't trust it with:** The audit engine logic itself. Every recommendation rule — the condition, the savings formula, the reason string — I wrote manually and verified against vendor pricing pages. AI would have hallucinated numbers. The pricing data in `PRICING_DATA.md` was hand-verified from official URLs this week.

**One specific time the AI was wrong and I caught it:** I asked Claude to help me write the Gemini pricing. It said Gemini Advanced was $19.99/month. I checked the actual Google One AI Premium page — it's $19.99/month in the US but billed as part of the Google One plan which includes storage. For the audit, the relevant price is the incremental cost for Gemini AI features, which is effectively $20/month. Claude got the number roughly right but missed the bundling nuance. I corrected the framing in the pricing data.

**What I'd tell someone else:** Use AI for code structure and boilerplate. Never use it for financial numbers, pricing data, or anything that requires current real-world accuracy.

---

## 5. Self-rating

**Discipline: 7/10**
I started the same day I got the assignment and worked every day. My commit history reflects real daily progress. I lose 3 points because I could have been more systematic about writing DEVLOG entries in real time rather than end-of-day.

**Code quality: 7/10**
TypeScript throughout, clean separation of concerns — lib handles logic, components handle UI, services handle API calls, data handles static configuration. Types are explicit. I lose 3 points because test coverage could be higher and there are a few places where I used `any` under time pressure.

**Design sense: 8/10**
The dark-mode-only aesthetic with the `#00ff88` accent is deliberate and consistent. The audit results page is designed to be screenshotted and shared — big savings number, clean hierarchy. The OG image matches the app. I lose 2 points because I didn't have time to polish mobile responsiveness on every component to the level I wanted.

**Problem solving: 8/10**
The Supabase type conflict took 2 hours but I found and fixed it systematically. The cascade state on the form tool selector took iteration but I got it right. I lose 2 points because I should have caught the `global.d.ts` issue earlier — I introduced it myself and then forgot about it.

**Entrepreneurial thinking: 7/10**
I understand the product clearly — free audit tool as lead gen for Credex credits. The Credex CTA surfaces only when genuinely relevant ($500+ savings), not on every audit. The shareable URL is designed as a viral loop. The email captures after value shown, not before. I lose 3 points because I only did 3 user interviews — more conversations would have improved the product further.

