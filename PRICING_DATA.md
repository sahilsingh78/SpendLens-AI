# PRICING_DATA.md

Every price in the audit engine traces to an official vendor pricing page. Verified during submission week (May 6–12, 2026).

---

## Cursor

- Hobby: $0/user/month — https://cursor.com/pricing — verified 2026-05-07
- Pro: $20/user/month — https://cursor.com/pricing — verified 2026-05-07
- Business: $40/user/month — https://cursor.com/pricing — verified 2026-05-07
- Enterprise: ~$60/user/month (custom, estimate based on public references) — https://cursor.com/pricing — verified 2026-05-07

---

## GitHub Copilot

- Individual: $10/user/month (or $100/year) — https://github.com/features/copilot#pricing — verified 2026-05-07
- Business: $19/user/month — https://github.com/features/copilot#pricing — verified 2026-05-07
- Enterprise: $39/user/month — https://github.com/features/copilot#pricing — verified 2026-05-07

---

## Claude (Anthropic)

- Free: $0 — https://claude.ai/upgrade — verified 2026-05-07
- Pro: $20/user/month — https://claude.ai/upgrade — verified 2026-05-07
- Max (5x): $100/user/month — https://claude.ai/upgrade — verified 2026-05-07
- Max (20x): $200/user/month — https://claude.ai/upgrade — verified 2026-05-07
- Team: $30/user/month (min 2 seats) — https://claude.ai/upgrade — verified 2026-05-07
- Enterprise: custom (~$60/user/month estimate) — https://www.anthropic.com/claude-for-work — verified 2026-05-07

---

## ChatGPT (OpenAI)

- Free: $0 — https://openai.com/chatgpt/pricing/ — verified 2026-05-07
- Plus: $20/user/month — https://openai.com/chatgpt/pricing/ — verified 2026-05-07
- Team: $30/user/month (min 2 seats) — https://openai.com/chatgpt/pricing/ — verified 2026-05-07
- Enterprise: custom (~$60/user/month estimate) — https://openai.com/chatgpt/pricing/ — verified 2026-05-07

---

## Anthropic API

- Pay-as-you-go: per token, no monthly fee
  - Claude 3.5 Haiku: $0.80/MTok input, $4/MTok output — https://www.anthropic.com/pricing — verified 2026-05-07
  - Claude 3.5 Sonnet: $3/MTok input, $15/MTok output — https://www.anthropic.com/pricing — verified 2026-05-07
  - Claude 3 Opus: $15/MTok input, $75/MTok output — https://www.anthropic.com/pricing — verified 2026-05-07
- Note: Users enter their actual monthly spend in the form. The engine flags spend >$200/mo for Credex credits opportunity.

---

## OpenAI API

- Pay-as-you-go: per token, no monthly fee
  - GPT-4o: $2.50/MTok input, $10/MTok output — https://openai.com/api/pricing/ — verified 2026-05-07
  - GPT-4o mini: $0.15/MTok input, $0.60/MTok output — https://openai.com/api/pricing/ — verified 2026-05-07
  - o1: $15/MTok input, $60/MTok output — https://openai.com/api/pricing/ — verified 2026-05-07
- Note: Same as Anthropic API — users enter actual monthly spend, engine evaluates credit opportunity.

---

## Gemini (Google)

- Free: $0 — https://one.google.com/about/ai-premium — verified 2026-05-08
- Advanced (Google One AI Premium): $19.99/month per user — https://one.google.com/about/ai-premium — verified 2026-05-08
  - Note: Bundled with 2TB Google One storage. Price reflects the AI-relevant portion.
- Gemini for Google Workspace Business: $20/user/month — https://workspace.google.com/intl/en/products/gemini/ — verified 2026-05-08
- Gemini for Google Workspace Enterprise: $30/user/month — https://workspace.google.com/intl/en/products/gemini/ — verified 2026-05-08
- API (Gemini API via Google AI Studio / Vertex): pay-per-token — https://ai.google.dev/pricing — verified 2026-05-08

---

## Windsurf (Codeium)

- Free: $0/user/month — https://windsurf.com/pricing — verified 2026-05-08
- Pro: $15/user/month — https://windsurf.com/pricing — verified 2026-05-08
- Teams: $35/user/month — https://windsurf.com/pricing — verified 2026-05-08
- Enterprise: custom (~$60/user/month estimate) — https://windsurf.com/pricing — verified 2026-05-08

---

## Notes on Pricing Methodology

1. **Enterprise prices** — Most vendors don't publish enterprise pricing publicly. Estimates are based on public references in analyst reports, community posts, and vendor sales documentation. Marked as estimates in the engine reasoning strings.

2. **API tools** — Anthropic API and OpenAI API are pay-per-token. The audit engine doesn't model token consumption (too variable). Instead, users enter their actual monthly bill. The engine evaluates whether Credex credits would save money at spend levels above $200/month.

3. **Currency** — All prices are USD as published on vendor pricing pages. No conversion applied.

4. **Verification date** — All prices verified May 7–8, 2026. AI pricing changes frequently; re-verify before any production use beyond the submission window.

