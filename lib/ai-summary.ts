import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResult } from "@/lib/types";
import { formatCurrencyFull } from "@/lib/helpers";

function buildPrompt(audit: AuditResult): string {
  const toolLines = audit.recommendations
    .map((r) => {
      const savings =
        r.monthlySavings > 0
          ? ` (saves ${formatCurrencyFull(r.monthlySavings)}/mo)`
          : " (optimal)";
      return `- ${r.toolName} [${r.currentPlan}]: ${r.action}${savings} — ${r.reason}`;
    })
    .join("\n");

  return `
You are a concise financial advisor writing a 90–110 word audit summary for a startup founder.

AUDIT DATA:
- Team size: ${audit.input.teamSize} people
- Primary use case: ${audit.input.useCase}
- Total current AI spend: ${formatCurrencyFull(audit.totalMonthlySpend)}/month
- Total potential savings: ${formatCurrencyFull(audit.totalMonthlySavings)}/month (${audit.savingsPercentage}%)
- Annual savings opportunity: ${formatCurrencyFull(audit.totalAnnualSavings)}/year

TOOL BREAKDOWN:
${toolLines}

INSTRUCTIONS:
Write a single paragraph (90–110 words) that:
1. Acknowledges their current spend and team context
2. Highlights the biggest specific saving opportunity with dollar amounts
3. Gives one concrete next action
4. Ends on a practical, optimistic note

Tone: Direct, data-driven, not salesy.

Do NOT use bullet points. Do NOT mention Credex unless credits are recommended.
`;
}

function buildFallbackSummary(audit: AuditResult): string {
  const {
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    input,
    recommendations,
  } = audit;

  if (totalMonthlySavings === 0) {
    return `Your ${input.teamSize}-person team is spending ${formatCurrencyFull(
      totalMonthlySpend
    )}/month on AI tools efficiently. Across ${recommendations.length} tool${
      recommendations.length > 1 ? "s" : ""
    } audited, each plan aligns with your ${
      input.useCase
    } workflow and team size. No immediate switches or downgrades are warranted — you're already operating efficiently.`;
  }

  const topRec = recommendations.reduce((a, b) =>
    b.monthlySavings > a.monthlySavings ? b : a
  );

  return `Your ${input.teamSize}-person team is currently spending ${formatCurrencyFull(
    totalMonthlySpend
  )}/month on AI tooling, with ${formatCurrencyFull(
    totalMonthlySavings
  )}/month available to recapture. The largest opportunity comes from ${
    topRec.toolName
  }, where ${
    topRec.reason
  } Implementing the recommended changes could recover ${formatCurrencyFull(
    totalAnnualSavings
  )} annually without disrupting workflows.`;
}

export async function generateAISummary(audit: AuditResult): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback if key missing
  if (!apiKey) {
    console.warn("GEMINI_API_KEY not set — using fallback summary");
    return buildFallbackSummary(audit);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 220,
      },
    });

    const result = await model.generateContent(buildPrompt(audit));
    const text = result.response.text().trim();

    if (!text) return buildFallbackSummary(audit);
    return text;

  } catch (error) {
    console.error("Gemini summary generation failed:", error);
    return buildFallbackSummary(audit);
  }
}