# PROMPTS.md

## Prompt Used in Production (lib/ai-summary.ts)

```
You are a concise financial advisor writing a 90–110 word audit summary for a startup founder.

AUDIT DATA:
- Team size: {teamSize} people
- Primary use case: {useCase}
- Total current AI spend: ${totalMonthlySpend}/month
- Total potential savings: ${totalMonthlySavings}/month ({savingsPercentage}%)
- Annual savings opportunity: ${totalAnnualSavings}/year

TOOL BREAKDOWN:
{toolLines}

INSTRUCTIONS:
Write a single paragraph (90–110 words) that:
1. Acknowledges their current spend and team context
2. Highlights the biggest specific saving opportunity with dollar amounts
3. Gives one concrete next action
4. Ends on a practical, optimistic note

Tone: direct, data-driven, not salesy. Do NOT use bullet points. Do NOT mention Credex unless credits are recommended.
```

Where `{toolLines}` is formatted as:
```
- Cursor [pro]: downgrade (saves $20/mo) — Cursor Business adds admin controls...
- Claude [team]: keep — Claude Team is the right-fit plan...
```

---

## Model

**Production:** Google Gemini 1.5 Flash (`gemini-1.5-flash`)

**Why Gemini 1.5 Flash:**
Switched from Anthropic claude-3-5-haiku to Gemini 1.5 Flash on Day 5.
Reason: Gemini free tier is available without billing setup, making it
accessible for open-source contributors and evaluators running the project
locally. Output quality for 90-110 word financial summaries is equivalent.
Same prompt structure, same fallback logic — only the API client changed.

---

## Why I Wrote the Prompt This Way

**Word count constraint (90–110 words):** The summary appears in an email
and on the results page alongside detailed recommendation cards. It needs
to be a quick read that adds synthesis, not repetition. Too short feels
dismissive; too long competes with the data.

**"Financial advisor" framing:** I tried "startup CFO" first — the output
was too formal and used terms like "EBITDA impact" that don't resonate with
a 5-person seed-stage team. "Financial advisor" produced more conversational,
actionable language.

**Explicit no-bullet-points instruction:** Without this, the model defaults
to bullet points roughly 40% of the time. A paragraph reads better in email
HTML and feels more like a human wrote it.

**"Do NOT mention Credex unless credits are recommended":** Early versions
without this instruction sometimes added a Credex mention even for
low-savings audits. That felt like a sales pitch when the user had just been
told they're spending efficiently. Trust is more valuable than a mention.

**No AI for the math:** The prompt receives pre-computed numbers. The LLM
only writes the narrative. I explicitly did not ask the model to calculate
savings — it would hallucinate numbers. The rule engine calculates; the
model narrates.

---

## What I Tried That Didn't Work

**Version 1 — Too open-ended:**
```
Write a personalized summary of this AI spend audit for a startup founder.
Audit data: {json}
```
Result: 300+ word essays, bullet lists, inconsistent tone. Unusable.

**Version 2 — Wrong persona:**
```
You are a SaaS CFO analyzing AI tool spend...
```
Result: Overly formal, used accounting terminology, felt cold. Founders
don't respond to "your OpEx allocation is suboptimal."

**Version 3 — No word count:**
```
Write a 2-3 sentence summary...
```
Result: 2 sentences was too short to include the top saving + action +
closing. 3 sentences felt rushed. Switching to a word count range (90-110)
gave the model room to breathe while keeping it tight.

**Version 4 — Asking the model to identify the top opportunity:**
```
Based on the audit data, identify the single biggest saving and write a paragraph...
```
Result: The model sometimes picked a smaller saving opportunity if the
reason string was more compelling. Pre-computing and injecting
`topRecommendation` explicitly fixed this.

---

## Fallback Summary (No AI)

When the Gemini API is unavailable (network error, rate limit, missing key),
the system falls back to a deterministic template:

```typescript
function buildFallbackSummary(audit: AuditResult): string {
  if (totalMonthlySavings === 0) {
    return `Your {teamSize}-person team is spending {totalMonthlySpend}/month on AI
    tools efficiently. Across {count} tools audited, each plan aligns with your
    {useCase} workflow...`
  }

  // Find top recommendation by savings
  const topRec = recommendations.reduce((a, b) =>
    b.monthlySavings > a.monthlySavings ? b : a
  );

  return `Your {teamSize}-person team is spending {totalMonthlySpend}/month on AI
  tools, with {totalMonthlySavings}/month available to recapture. The biggest
  opportunity is {topRec.toolName}: {topRec.reason}...`
}
```

This ensures the AI Insight card always shows something useful, even if the
API call fails. The fallback is clearly templated but accurate — it uses the
same computed numbers as the real AI summary.