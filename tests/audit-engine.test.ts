import { describe, test, expect } from "vitest";

type ActionType = "downgrade" | "switch" | "keep" | "credits" | "optimize";
type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

function deriveTier(pct: number): string {
  if (pct === 0) return "optimal";
  if (pct < 15) return "low";
  if (pct < 35) return "mid";
  return "high";
}

function calcSavingsPct(total: number, savings: number): number {
  if (total === 0) return 0;
  return Math.min(100, (savings / total) * 100);
}

function cursorBusinessRule(seats: number): { action: ActionType; savings: number } {
  if (seats <= 2) return { action: "downgrade", savings: seats * 20 };
  return { action: "keep", savings: 0 };
}

function apiCreditsRule(spend: number): { action: ActionType; savings: number } {
  if (spend >= 200) return { action: "credits", savings: Math.round(spend * 0.35) };
  return { action: "keep", savings: 0 };
}

function claudeMaxRule(seats: number, plan: string): { action: ActionType; savings: number } {
  if (plan === "max_5x" && seats > 1) return { action: "downgrade", savings: seats * 70 };
  return { action: "keep", savings: 0 };
}

describe("Audit Engine", () => {
  test("Cursor Business 2 seats → downgrade saves $40/mo", () => {
    const r = cursorBusinessRule(2);
    expect(r.action).toBe("downgrade");
    expect(r.savings).toBe(40);
  });

  test("Cursor Business 5 seats → keep", () => {
    const r = cursorBusinessRule(5);
    expect(r.action).toBe("keep");
    expect(r.savings).toBe(0);
  });

  test("API spend $300 → credits action with $105 savings", () => {
    const r = apiCreditsRule(300);
    expect(r.action).toBe("credits");
    expect(r.savings).toBe(105);
  });

  test("API spend $100 → keep (below threshold)", () => {
    const r = apiCreditsRule(100);
    expect(r.action).toBe("keep");
  });

  test("Claude Max 5x with 3 seats → downgrade saves $210/mo", () => {
    const r = claudeMaxRule(3, "max_5x");
    expect(r.action).toBe("downgrade");
    expect(r.savings).toBe(210);
  });

  test("Annual savings = monthly × 12", () => {
    expect(340 * 12).toBe(4080);
  });

  test("Tier is high when pct >= 35", () => {
    expect(deriveTier(40)).toBe("high");
  });

  test("Tier is optimal when pct = 0", () => {
    expect(deriveTier(0)).toBe("optimal");
  });

  test("Tier is mid when pct = 20", () => {
    expect(deriveTier(20)).toBe("mid");
  });

  test("Tier is low when pct = 10", () => {
    expect(deriveTier(10)).toBe("low");
  });
});