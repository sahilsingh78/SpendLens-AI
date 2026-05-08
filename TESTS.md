# TESTS.md

## How to Run Tests

```bash
npm test
# or
npx vitest run
```

All tests use Vitest. No server required — tests run against the pure logic layer only.

---

## Test Files

### 1. `tests/audit-engine.test.ts`
**What it covers:** Core audit engine logic — the most critical file in the codebase.

| Test | Description |
|---|---|
| Cursor Business downgrade for ≤2 seats | Verifies rule fires and saves $40/mo (2 seats × $20 difference) |
| Claude Max 5x → Team savings for multi-seat | Verifies $70/seat/mo savings when seats > 1 |
| API credits trigger at $200+ spend | Verifies credits action fires for Anthropic/OpenAI API spend ≥ $200 |
| Keep recommendation for optimal plan | Verifies no false positives for correctly-sized plans |
| Tier derivation — optimal | savingsPercentage = 0 → tier = "optimal" |
| Tier derivation — high | savingsPercentage ≥ 35 → tier = "high" |
| Annual savings = monthly × 12 | Data integrity check |
| Total spend calculation | Sum of all tool monthlySpend values |

**How to run:** `npx vitest run tests/audit-engine.test.ts`

---

### 2. `tests/pricing.test.ts`
**What it covers:** Pricing data lookups and overpay detection.

| Test | Description |
|---|---|
| Correct price lookup for Cursor Pro | getExpectedSpend returns $20 × seats |
| Overpay detection | isOverpaying returns true when actual > expected × 1.05 |
| Expected spend calculation for multi-seat | Seat count multiplied correctly |
| Plan name resolution | getPlanName returns human-readable name |
| Unknown tool returns undefined | Graceful handling of invalid toolId |

**How to run:** `npx vitest run tests/pricing.test.ts`

---

### 3. `tests/recommendation.test.ts`
**What it covers:** Recommendation rule table logic.

| Test | Description |
|---|---|
| Rule fires for matching condition | Condition function returns true for correct inputs |
| Rule does not fire when condition false | No false positive on non-matching inputs |
| Savings formula returns non-negative | No negative savings ever returned |
| Reason string is non-empty | Every rule has a reason |
| Credits action fires for high API spend | $200+ API spend triggers credits recommendation |

**How to run:** `npx vitest run tests/recommendation.test.ts`

---

### 4. `tests/validation.test.ts`
**What it covers:** Zod schema validation — guards against bad API input.

| Test | Description |
|---|---|
| Valid input passes AuditInputSchema | Full valid payload accepted |
| Empty tools array rejected | min(1) constraint enforced |
| Invalid toolId rejected | Enum constraint on toolId enforced |
| Negative monthlySpend rejected | min(0) constraint enforced |
| Honeypot field with content rejected | Bot protection works |

**How to run:** `npx vitest run tests/validation.test.ts`

---

### 5. `tests/api.test.ts`
**What it covers:** API-layer logic (rate limiter + audit engine integration).

| Test | Description |
|---|---|
| Rate limiter allows first N requests | checkRateLimit returns allowed: true within limit |
| Rate limiter blocks after limit | checkRateLimit returns allowed: false when exceeded |
| Full audit returns correct shape | Result has id, recommendations, totalMonthlySavings, tier |
| Schema rejects missing fields | Missing teamSize → validation failure |
| Savings are non-negative | No audit returns negative totalMonthlySavings |

**How to run:** `npx vitest run tests/api.test.ts`

---

## Total: 28 tests across 5 files

All tests pass with `npm test`. CI runs them on every push to main via `.github/workflows/ci.yml`.

---

## What the Tests Don't Cover

- UI components (would require jsdom setup + React Testing Library — out of scope for this week)
- Supabase integration (requires live DB — mocked at the service layer)
- Resend email sending (mocked — can't send real emails in CI)
- Anthropic API (mocked — tests the fallback path, not the live API call)

The audit engine, pricing logic, recommendation rules, and validation are fully tested. These are the parts where bugs would cause incorrect financial recommendations — the highest-risk code in the system.

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