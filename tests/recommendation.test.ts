import { describe, test, expect } from "vitest";

type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

interface Rule {
  condition: (seats: number, teamSize: number, useCase: UseCase, spend: number) => boolean;
  savings: (spend: number, seats: number) => number;
  reason: string;
  action: string;
}

const cursorBusinessRule: Rule = {
  condition: (seats) => seats <= 2,
  savings: (_spend, seats) => seats * 20,
  reason: "Cursor Business adds admin controls unnecessary for ≤2 seats.",
  action: "downgrade",
};

const apiCreditsRule: Rule = {
  condition: (_s, _t, _u, spend) => spend >= 200,
  savings: (spend) => Math.round(spend * 0.35),
  reason: "API spend above $200/mo qualifies for Credex credits at 35% off.",
  action: "credits",
};

describe("Recommendation Rules", () => {
  test("Cursor Business rule fires for 2 seats", () => {
    expect(cursorBusinessRule.condition(2, 5, "coding", 80)).toBe(true);
  });

  test("Cursor Business rule does not fire for 5 seats", () => {
    expect(cursorBusinessRule.condition(5, 10, "coding", 200)).toBe(false);
  });

  test("Savings formula returns non-negative number", () => {
    expect(cursorBusinessRule.savings(80, 2)).toBeGreaterThanOrEqual(0);
  });

  test("Reason string is non-empty", () => {
    expect(cursorBusinessRule.reason.length).toBeGreaterThan(0);
  });

  test("Credits rule fires at $200+ spend", () => {
    expect(apiCreditsRule.condition(1, 5, "coding", 200)).toBe(true);
  });

  test("Credits rule does not fire below $200", () => {
    expect(apiCreditsRule.condition(1, 5, "coding", 199)).toBe(false);
  });

  test("Credits savings is 35% of spend", () => {
    expect(apiCreditsRule.savings(300, 1)).toBe(105);
  });

  test("Action string is non-empty", () => {
    expect(cursorBusinessRule.action.length).toBeGreaterThan(0);
  });
});