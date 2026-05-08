# USER_INTERVIEWS.md

Three conversations with potential users, conducted May 7–9, 2026. Each 10–15 minutes. Names used with permission or initials where preferred.

---

## Interview 1 — R.M., CTO, 8-person SaaS startup (Series A)

**Context:** Connected through a mutual college contact. R.M. runs engineering at a B2B SaaS company building HR tooling. 4 engineers, 4 non-engineers. Currently paying for Cursor Business, ChatGPT Team, and Claude Pro for one person.

**Direct quotes:**

> "I set up Cursor Business because I thought we'd need the admin controls eventually. We never did. I just wanted to move fast and not think about it."

> "I have no idea what we're actually spending per month across all the AI stuff. I could find out but it would take me opening 4 different billing pages."

> "The thing that would actually make me switch is if someone showed me the number. Not 'you could save money' — what's the actual dollar amount?"

**Most surprising thing they said:**
R.M. said he had considered canceling GitHub Copilot for the team three months ago because "nobody was really using it," but then one engineer said they liked it, so he kept it. He estimated 2 of 4 engineers used Copilot regularly. He was paying for 4 seats at Business tier ($76/month) for a tool where 50% utilization was generous.

**What it changed:**
I added a "seats vs actual usage" angle to the recommendation reasoning. The engine now checks when seat count seems high relative to team size for tools with usage-dependent value (Copilot, Cursor). The reason string surfaces this: "Consider auditing actual usage before renewing — Copilot Business for 4 seats assumes active daily use."

---

## Interview 2 — A.K., Founder/solo dev, pre-seed

**Context:** Found through Indie Hackers Slack (#tools channel). A.K. is building a personal finance app solo. Been working on it for 6 months. Paying for Claude Pro ($20/mo) and ChatGPT Plus ($20/mo) simultaneously.

**Direct quotes:**

> "I use Claude for writing and ChatGPT for coding help. I know that's probably redundant but I haven't had the time to figure out which one to drop."

> "Twenty dollars a month doesn't feel like a lot but when you're pre-revenue it adds up. I'm spending like $150 a month on tools I'm not sure I fully use."

> "I would genuinely use a tool that just told me: here's what you can cut, here's exactly how much."

**Most surprising thing they said:**
A.K. was paying for both Claude Pro and ChatGPT Plus but primarily using Claude for 80%+ of tasks. They kept ChatGPT because "sometimes Claude doesn't want to do something and ChatGPT will." This is a real behavioral pattern — users keep a second tool as a fallback even when they have a clear primary. The audit engine should surface this: two overlapping general-purpose AI assistants at the same price tier is almost always redundant for a solo user.

**What it changed:**
I added a recommendation rule: if a user has both `claude` and `chatgpt` on personal plans (pro/plus), surface a "overlap detected" note suggesting they pick one primary and use the free tier of the other as a fallback. This isn't a hard recommendation (both tools have different strengths) but it prompts the right question.

---

## Interview 3 — S.P., Engineering Lead, 25-person growth startup

**Context:** Twitter DM. S.P. leads a 6-person engineering team at a startup in the logistics space. Company uses Anthropic API directly for product features (~$800/month), plus Cursor Pro for engineers ($120/month), plus Claude Team for the broader team ($180/month).

**Direct quotes:**

> "The API bill is the one I actually watch. The subscriptions I just kind of ignore because they feel small relative to the API spend."

> "I had no idea there was such a thing as discounted AI credits. I thought the only option was the official pricing."

> "Eight hundred a month on API feels like a lot but I don't have a reference point. Is that high for a team our size?"

**Most surprising thing they said:**
S.P. didn't know Credex or any similar service existed. He thought API pricing was fixed — "the price is the price." When I explained that overforecast credits get resold at a discount through brokers, his immediate response was "that seems too good to be true, how do I verify it's real?" This told me the Credex CTA needs to address credibility, not just savings.

**What it changed:**
Two things: (1) The Credex CTA copy now includes "same official API endpoints, no usage restrictions" to preempt the "is this legit?" concern. (2) The $800/month API spend benchmark question led me to add the benchmark comparison feature — "companies your size average $X/dev/month on AI." S.P.'s specific question ("is that high?") is exactly the question the benchmark mode answers.

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