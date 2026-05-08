# METRICS.md

## North Star Metric

**Qualified leads generated per week** — defined as email captures from audits showing ≥$200/month in savings.

### Why this and not something else:

- **Not "audits completed"** — audits are free and easy to game. Someone can run 10 audits with fake data. Completion alone doesn't indicate product value delivered or business outcome.
- **Not "emails captured"** — emails from users who found $5 in savings have near-zero conversion value to Credex. Unqualified leads are noise.
- **Not "Credex consultations booked"** — this is the right ultimate metric for Credex revenue, but it's too far downstream to be actionable on a week-to-week basis. It also depends on the Credex sales team, which is outside the product's control.
- **Qualified leads (≥$200/mo savings, email captured)** — this is the metric that directly predicts Credex revenue and is entirely within the product's control. Every improvement to the form, the audit logic, or the results page should move this number.

---

## 3 Input Metrics That Drive the North Star

**1. Audit completion rate** (form starts → audit submitted)
Current target: >65%. If this drops below 50%, the form is too long or confusing. This is the biggest drop-off point. Instrument with a `form_started` event and an `audit_submitted` event, track the ratio weekly.

**2. High-savings audit rate** (audits completed → audits showing ≥$200 savings)
Current estimate: 30–35% of audits. If this is lower, the recommendation engine isn't finding real savings — either the rules are too conservative or users are already on optimal plans. If higher, the engine may be over-recommending. This metric validates the audit quality.

**3. Qualified lead capture rate** (high-savings audits → email captured)
Target: >35%. If a user sees $500/month in savings and doesn't give us their email, something is wrong with the lead capture UX or trust signal. Test: move the email form above the full breakdown? Test: make the Credex CTA more specific?

---

## What to Instrument First

In priority order:

1. `audit_started` — user clicks "Get my free audit" (measures intent)
2. `audit_completed` — successful audit API response returned (measures conversion)
3. `savings_tier` — which tier (optimal/low/mid/high) with the savings amount (measures engine quality)
4. `lead_captured` — email submitted successfully (measures monetization funnel)
5. `share_link_copied` — user copies the shareable URL (measures viral loop)
6. `credex_cta_clicked` — user clicks the Credex consultation link (measures revenue intent)

All events should include: audit ID, savings tier, total monthly savings bucket ($0, $1-99, $100-499, $500+), tool count, team size bucket.

Use PostHog (free tier, self-hostable) or Plausible. Avoid Google Analytics for a B2B tool — founders care about privacy.

---

## What Number Triggers a Pivot Decision

**If qualified lead capture rate drops below 15% for 2 consecutive weeks** — this means users are completing audits, seeing savings, and still not giving us their email. The product has a trust or UX problem. Pivot decision: redesign lead capture flow, consider removing email gate entirely and relying on Credex CTA click as the conversion event.

**If high-savings audit rate drops below 20%** — the recommendation engine is finding savings in too few audits. Either the user base has shifted (already-optimized teams), or the rules need expanding. Pivot: add more tools, add API usage-based recommendations, add benchmark comparison as a value-add for "optimal" cases.

**If audit completion rate drops below 40%** — the form is the problem. Pivot: simplify to 3 fields (tool, plan, monthly spend), remove seats and use case, add them as optional after the first result.

---

## Metrics This Tool Should NOT Track

- **DAU/MAU** — this is a quarterly-use tool. Daily active users is meaningless. A founder audits once, maybe again in 6 months when they hire 3 people.
- **Session duration** — longer sessions might mean confusion, not engagement.
- **Page views** — vanity metric. One user refreshing the results page 10 times looks identical to 10 users.

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