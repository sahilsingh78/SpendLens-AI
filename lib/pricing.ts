import {
  getToolConfig,
  getPlanConfig,
} from "@/data/pricing-data";

import {
  ToolEntry,
  ToolId,
} from "@/lib/types";

/* =========================================
   Expected Spend
========================================= */

export function getExpectedSpend(
  tool: ToolEntry
): number {
  const currentPlan =
    tool.currentPlan ??
    tool.plan ??
    "pro";

  const plan = getPlanConfig(
    tool.toolId,
    currentPlan
  );

  if (!plan) {
    return 0;
  }

  return (
    plan.pricePerSeatPerMonth *
    tool.seats
  );
}

/* =========================================
   Overpay Detection
========================================= */

export function isOverpaying(
  tool: ToolEntry
): boolean {
  const expected =
    getExpectedSpend(tool);

  return (
    expected > 0 &&
    tool.monthlySpend >
      expected * 1.05
  );
}

/* =========================================
   Overpay Amount
========================================= */

export function getOverpayAmount(
  tool: ToolEntry
): number {
  const expected =
    getExpectedSpend(tool);

  return Math.max(
    0,
    tool.monthlySpend -
      expected
  );
}

/* =========================================
   Plan Name
========================================= */

export function getPlanName(
  toolId: ToolId,
  planId: string
): string {
  const plan =
    getPlanConfig(
      toolId,
      planId
    );

  return (
    plan?.name ?? planId
  );
}

/* =========================================
   Tool Name
========================================= */

export function getToolName(
  toolId: ToolId
): string {
  return (
    getToolConfig(toolId)
      ?.name ?? toolId
  );
}

/* =========================================
   Plans For Tool
========================================= */

export function getPlansForTool(
  toolId: ToolId
) {
  return (
    getToolConfig(toolId)
      ?.plans ?? []
  );
}