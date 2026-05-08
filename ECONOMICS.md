# ECONOMICS.md

## What a Converted Lead Is Worth to Credex

Credex sells discounted AI infrastructure credits at roughly 30–40% below list price. The margin comes from sourcing credits from companies that overforecast usage.

**Assumptions (conservative):**
- Average startup buying Credex credits spends $500/month on AI APIs (Anthropic + OpenAI)
- Credex sources at 40% below list, sells at 25% below list → 15% gross margin on the credit value
- Average customer stays 6 months before renegotiating or churning
- Credex captures $500 × 15% margin × 6 months = **$450 LTV per converted customer**

For high-spend customers ($2,000+/month API spend), LTV scales to $1,800+.

---

## CAC by Channel

| Channel | Cost | Expected conversions | CAC |
|---|---|---|---|
| Hacker News Show HN | $0 + 2hr writing | 5–10 consultations booked | ~$0 |
| Reddit posts (r/ExperiencedDevs) | $0 + 1hr writing | 2–5 consultations | ~$0 |
| Cold DM on X (50 DMs) | $0 + 3hr time | 1–3 consultations | ~$0 |
| Newsletter mention (TLDR, etc.) | $0 (editorial) | 3–8 consultations | ~$0 |
| Paid Twitter/X ads (hypothetical) | $500/campaign | 5–10 consultations | $50–100 |

**Blended CAC for organic channels: effectively $0 cash, ~$50 in founder time per conversion.**

---

## Conversion Funnel

```
Visitors to spendlens.vercel.app
        ↓  ~35% start the form
Form started
        ↓  ~70% complete and submit
Audit completed
        ↓  ~30% enter email
Email captured
        ↓  ~40% of high-savings audits ($500+/mo) click Credex CTA
Credex consultation booked
        ↓  ~30% of consultations become paying customers
Credit purchase
```

**Math for 1,000 visitors:**
- 1,000 visitors × 35% = 350 start form
- 350 × 70% = 245 audits completed
- 245 × 30% = 74 emails captured
- Assume 30% of audits show $500+/mo savings = 74 high-savings audits
- 74 × 40% CTA click = 30 consultations booked
- 30 × 30% close rate = **9 new Credex customers**
- 9 × $450 LTV = **$4,050 revenue per 1,000 visitors**

Revenue per visitor: **$4.05** — strong unit economics for a free tool.

---

## What Makes This Profitable

The tool costs ~$0/month to run at low scale:
- Vercel free tier: handles 100k requests/month
- Supabase free tier: 500MB database, 2GB transfer
- Anthropic API (Haiku): ~$0.001 per summary = $1/1,000 audits
- Resend free tier: 3,000 emails/month

**Break-even:** 1 converted customer ($450 LTV) pays for roughly 6 months of infrastructure at scale.

At 10,000 audits/month, infrastructure costs rise to ~$50–100/month (paid Vercel, Supabase Pro, Resend). Still covered by a single customer conversion.

---

## Path to $1M ARR in 18 Months

**$1M ARR = $83,333/month in Credex revenue from SpendLens-sourced customers.**

At $450 LTV per customer and 6-month average tenure:
- Need ~185 active customers at any time
- Need to acquire ~30 new customers/month (to replace churn at ~15%)

**Funnel math to get 30 new customers/month:**
- 30 customers / 30% close rate = 100 consultations booked/month
- 100 consultations / 40% CTA conversion = 250 high-savings audits/month
- 250 / 30% high-savings rate = 833 total audits/month
- 833 / 70% completion rate = 1,190 form starts/month
- 1,190 / 35% start rate = **~3,400 visitors/month needed**

3,400 visitors/month is achievable by month 3–4 if the Hacker News launch hits and organic sharing kicks in. The shareable URL feature is specifically designed to drive this — every shared audit is a free acquisition.

**What has to be true:**
1. Audit quality is high enough that users trust the numbers (finance-defensible recommendations)
2. The Credex credits offer is genuinely better than retail (35% discount is real)
3. Consultation → purchase close rate stays at 30%+ (requires good sales process)
4. The tool is actually free and frictionless (email only after value shown)

**Sensitivity:** If close rate drops to 15%, needed visitors doubles to 6,800/month — harder but achievable by month 8–10 with content marketing layered on top of the initial launch channels.

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