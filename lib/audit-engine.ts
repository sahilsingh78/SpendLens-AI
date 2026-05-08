import {
  AuditInput,
  AuditResult,
  AuditTier,
  ToolRecommendation,
} from "@/lib/types";

import { TOOL_CONFIGS } from "@/data/pricing-data";

import {
  ACTION_RECOMMENDATIONS,
  getRecommendationForTool,
} from "@/data/recommendations";

function calculateTier(
  monthlySavings: number
): AuditTier {
  if (monthlySavings === 0) {
    return "optimal";
  }

  if (monthlySavings < 100) {
    return "low";
  }

  if (monthlySavings < 500) {
    return "mid";
  }

  return "high";
}

function calculateSavingsPercentage(
  spend: number,
  savings: number
): number {
  if (spend <= 0) return 0;

  return Math.round(
    (savings / spend) * 100
  );
}

export function runAuditEngine(
  input: AuditInput
): AuditResult {
  const recommendations: ToolRecommendation[] =
    input.tools.map((tool) => {
      /*
        SAFE PLAN VALUE
      */

      const currentPlan =
        tool.currentPlan ??
        tool.plan ??
        "pro";

      /*
        Find config
      */

      const config =
        TOOL_CONFIGS.find(
          (t) =>
            t.id === tool.toolId
        );

      /*
        Fallback recommendation
      */

      const fallbackRecommendation =
        {
          action: "keep" as const,

          reason:
            "Current configuration appears appropriate for your team size and use case.",

          recommendedPlan:
            currentPlan,

          recommendedTool:
            undefined,

          monthlySavings: 0,
        };

      /*
        Get recommendation
      */

      const recommendation =
        getRecommendationForTool({
          toolId: tool.toolId,

          currentPlan,

          monthlySpend:
            tool.monthlySpend,

          seats: tool.seats,

          useCase:
            input.useCase,

          teamSize:
            input.teamSize,
        }) ??
        ACTION_RECOMMENDATIONS[
          tool.toolId
        ] ??
        fallbackRecommendation;

      /*
        Savings
      */

      const monthlySavings =
        Math.max(
          0,
          recommendation.monthlySavings
        );

      const annualSavings =
        monthlySavings * 12;

      /*
        Final recommendation
      */

      return {
        toolId: tool.toolId,

        toolName:
          tool.name ??
          config?.name ??
          tool.toolId,

        currentPlan,

        currentSpend:
          tool.monthlySpend,

        action:
          recommendation.action,

        recommendedPlan:
          recommendation.recommendedPlan,

        recommendedTool:
          recommendation.recommendedTool,

        monthlySavings,

        annualSavings,

        reason:
          recommendation.reason,

        credexOpportunity:
          monthlySavings >= 500,
      };
    });

  /*
    Totals
  */

  const totalMonthlySpend =
    input.tools.reduce(
      (sum, tool) =>
        sum + tool.monthlySpend,
      0
    );

  const totalMonthlySavings =
    recommendations.reduce(
      (sum, rec) =>
        sum + rec.monthlySavings,
      0
    );

  const totalAnnualSavings =
    totalMonthlySavings * 12;

  const savingsPercentage =
    calculateSavingsPercentage(
      totalMonthlySpend,
      totalMonthlySavings
    );

  const tier = calculateTier(
    totalMonthlySavings
  );

  /*
    Final result
  */

  return {
    id:
      crypto.randomUUID(),

    input,

    recommendations,

    totalMonthlySpend,

    totalMonthlySavings,

    totalAnnualSavings,

    savingsPercentage,

    tier,

    createdAt:
      new Date().toISOString(),
  };
}