# USER_INTERVIEWS.md

Three conversations with potential users, conducted May 7–9, 2026. Each 10–15 minutes. Names used with permission or initials where preferred.

---

## Interview 1 — R.S., CTO, 12-person SaaS startup (Seed), Bengaluru

**Context:** Connected through a college senior who works at the same company. R.S. runs a 5-person engineering team at a B2B SaaS startup building HR automation tooling for Indian SMEs. Currently paying for Cursor Business, ChatGPT Team, and Claude Pro for one person.

**Direct quotes:**

> "I set up Cursor Business when we were fundraising — I wanted everything to look professional. We never actually used the admin controls. I just never got around to downgrading."

> "Honestly I don't know what our total AI bill is. It's spread across 3-4 different credit cards and the founder's personal account. I'd have to spend an hour just to add it up."

> "Show me the number and I'll act on it the same day. Generic 'you could save money' doesn't move me."

**Most surprising thing they said:**
R.S. mentioned they were paying for GitHub Copilot Business for all 5 engineers but when he asked the team, only 2 used it daily. The other 3 had switched to Cursor but nobody cancelled the Copilot seats. He was paying for both simultaneously for 3 people — roughly $57/month in pure waste he hadn't noticed.

**What it changed:**
I made the recommendation reasoning more explicit about overlapping tools. If a user has both Cursor and GitHub Copilot, the engine now flags the overlap and asks them to confirm both are actively used — rather than assuming both are justified.

---

## Interview 2 — A.M., Founder/solo dev, pre-revenue, Pune

**Context:** Found through an IndieHackers India WhatsApp group. A.M. is building a legal document automation tool solo. 8 months in, bootstrapped. Paying for Claude Pro ($20/mo) and ChatGPT Plus ($20/mo) simultaneously.

**Direct quotes:**

> "I use Claude for writing the long legal summaries and ChatGPT when Claude refuses something or gives a weird answer. So I pay for both."

> "At pre-revenue stage, $40 a month on two AI subscriptions that do roughly the same thing is actually meaningful. That's like 3000 rupees going nowhere."

> "I assumed I needed both. I never actually tested if one was enough."

**Most surprising thing they said:**
A.M. hadn't tried using Claude's free tier as a fallback. He assumed free tiers were too limited to be useful — but for his use case (occasional fallback queries) the free tier would have been completely sufficient. He was paying $20/month for a fallback he used maybe 5 times a week.

**What it changed:**
I added language to the overlap recommendation that specifically mentions the free tier as a viable fallback option — not just "pick one paid plan." This is more actionable and saves more money for solo founders.

---

## Interview 3 — P.K., Engineering Lead, 20-person startup, Mumbai

**Context:** LinkedIn cold message — P.K. had posted about AI tooling costs in a startup founders group. He leads a 4-person engineering team at a fintech startup. Company uses Anthropic API for their core product (~$600/month), plus Cursor Pro for all 4 engineers ($60/month), plus Claude Team ($120/month).

**Direct quotes:**

> "The API cost I track carefully because it scales with usage. The SaaS subscriptions I just auto-pay and forget — they feel fixed even when they're not."

> "I didn't know you could get discounted API credits. In India we already pay a dollar-to-rupee premium on everything — if there's a way to reduce the base price I want to know."

> "Six hundred dollars a month on Anthropic API sounds like a lot but I genuinely don't know if that's normal for a fintech product our size. What's the benchmark?"

**Most surprising thing they said:**
P.K. pointed out that Indian startups face an additional pain point — they're paying USD prices but generating INR revenue, so every dollar saved is disproportionately valuable during early stages. This reframing made me realize the tool's value proposition is actually stronger for Indian users than for US users at the same absolute dollar amount.

**What it changed:**
Two things: (1) The Credex CTA copy was updated to include "same official API endpoints, no usage restrictions" — P.K.'s first reaction to discounted credits was "is this legit?" and I needed to address that directly. (2) The benchmark data in `data/benchmark-data.ts` now includes stage-appropriate comparisons so users can answer "is my spend normal?" — exactly the question P.K. was asking.