# REFLECTION.md

---

## 1. The hardest bug I hit this week

The worst one was `Duplicate identifier 'createClient'` — a TypeScript error that broke my Vercel deployment completely.

The error message said: `./lib/supabase.ts:4:19 Type error: Duplicate identifier 'createClient'`. I stared at `supabase.ts` for probably 20 minutes. I hadn't imported createClient twice. I hadn't exported it from two places. Everything looked fine.

First hypothesis — maybe there's another file somewhere exporting a function with the same name. Searched the whole codebase. Nothing.

Second hypothesis — maybe the @supabase/supabase-js package itself has a conflict internally. Deleted node_modules and reinstalled. Same error.

Third hypothesis — maybe a type declaration file. Searched the repo for `declare module`. Found it. Early in the project I had created a `global.d.ts` with:

```ts
declare module "@supabase/supabase-js" {
  export function createClient(...): any;
}
```

I had added this to fix a completely different error like 2 days earlier and totally forgot it existed. TypeScript was seeing `createClient` declared both in the real package and in my declaration file — hence "duplicate identifier."

Deleted the declare module block. Fixed immediately.

Total time wasted: almost 2 hours. The error pointed to `supabase.ts` but the actual problem was in `global.d.ts`. I learned to always search for `declare module` first when you see duplicate identifier errors on npm packages.

---

## 2. A decision I reversed mid-week

I started with the plan to use Prisma + Postgres on Render. I've used Prisma before, I like the TypeScript integration, and I wanted "proper" database tooling.

Reversed this on Day 2 when I actually sat down to set it up.

The setup alone was going to take 2-3 hours minimum — Render free tier has cold starts, I'd need to handle connection pooling, set up migrations, configure environment variables across local and production separately. And for what? Two tables. `audits` and `leads`. Both with basically just inserts and selects.

Supabase gave me a hosted Postgres, a typed JS client, and a dashboard where I could see the leads coming in — all in about 15 minutes of setup.

The honest reason I wanted Prisma was familiarity, not fit. That's a bad reason. Switched to Supabase and never looked back.

---

## 3. What I'd build in week 2

Three things, in this order:

**Embeddable widget.** A `<script>` tag that anyone can drop on their blog or newsletter. Form loads inline, audit runs, results page is SpendLens. This is the distribution play — every embed is passive acquisition. The assignment mentions this as a bonus and it's genuinely the highest-leverage thing to build next.

**Real benchmark database.** Right now the benchmark card uses hardcoded averages I estimated. In week 2 I'd aggregate real anonymized audit data — median AI spend per developer by company stage, updated as more audits run. "Your team spends $136/dev/month. 847 early startups average $75." That's actually useful and sticky.

**Credex credit calculator.** For users with $200+/month API spend, show the exact savings with Credex credits interactively. "You spend $600/month on Anthropic API → at 35% off that's $210/month saved → $2,520/year." Turn the audit result into a specific dollar offer, not just a recommendation.

---

## 4. How I used AI tools

Used Claude (claude.ai) throughout the week. I'm going to be honest about this.

**What I used it for:**
- Boilerplate for repetitive form components — SeatCounter, PricingInput, the email HTML template
- Drafting recommendation reason strings (I reviewed and edited every single one)
- Debugging help — pasting error messages and asking what's causing them
- Writing first drafts of markdown docs

**What I didn't use it for:**
- The actual recommendation rules — every condition, savings formula, and reason string I wrote or verified manually against vendor pricing pages
- Pricing data — hand-verified every number from official URLs
- Architecture decisions — I made those myself
- The TypeScript types — wrote those from scratch

**One specific time it was wrong:**
I asked Claude to help me with Gemini pricing. It said Gemini Advanced is $19.99/month. That's technically correct but incomplete — it's billed as part of Google One AI Premium which includes 2TB of storage. For the audit, I had to decide: is the relevant price $19.99 (total bundle) or effectively $20 for just the AI features? Claude just gave me the number without this context. I had to figure out the right framing myself by actually reading the Google One pricing page.

The rule I ended up with: use AI for structure and boilerplate. Never use it for financial numbers or anything where being wrong has real consequences.

---

## 5. Self-ratings

**Discipline: 6/10**
I got the assignment on May 6 and committed across 5 days (May 8-12). Days 1 and 2 were planning/research with no commits which looks bad in git history even if I was working. Should have committed something every day from Day 1. Lost points here.

**Code quality: 7/10**
TypeScript throughout, clean separation between lib/components/services. The audit engine is pure and testable. Loses points because I used `any` in a few places under time pressure and test coverage is only at the logic layer — no component tests.

**Design sense: 8/10**
Dark-mode only with the green accent is deliberate and consistent throughout. The results page is designed to be screenshot-worthy — big savings number, clear hierarchy, benchmark card. Loses 2 points because mobile responsiveness on the form isn't perfect and I didn't have time to fix it.

**Problem solving: 7/10**
Found and fixed real bugs — the global.d.ts issue, the lazy initialization pattern for Supabase/Resend, the React number input UX problem. Loses 3 points because I created some of these problems myself (the global.d.ts was my own doing) and I should have caught them earlier.

**Entrepreneurial thinking: 7/10**
I understand the product — free audit as lead gen for Credex credits, email after value not before, Credex CTA only when genuinely relevant. The shareable URL is designed as a viral loop. The benchmark card answers the question real users actually ask ("is my spend normal?"). Loses 3 points because I ran out of time for the embeddable widget which is the real distribution multiplier.