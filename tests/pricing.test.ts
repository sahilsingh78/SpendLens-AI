import { describe, test, expect } from "vitest";

function getExpectedSpend(pricePerSeat: number, seats: number): number {
  return pricePerSeat * seats;
}

function isOverpaying(actual: number, expected: number): boolean {
  return expected > 0 && actual > expected * 1.05;
}

function getPlanName(plans: Record<string, string>, planId: string): string {
  return plans[planId] ?? planId;
}

describe("Pricing Logic", () => {
  test("Cursor Pro 2 seats = $40/mo", () => {
    expect(getExpectedSpend(20, 2)).toBe(40);
  });

  test("Copilot Business 5 seats = $95/mo", () => {
    expect(getExpectedSpend(19, 5)).toBe(95);
  });

  test("Overpay detected when actual > expected × 1.05", () => {
    expect(isOverpaying(50, 40)).toBe(true);
  });

  test("No overpay when actual equals expected", () => {
    expect(isOverpaying(40, 40)).toBe(false);
  });

  test("Plan name resolves correctly", () => {
    const plans = { pro: "Pro", business: "Business" };
    expect(getPlanName(plans, "pro")).toBe("Pro");
  });

  test("Unknown plan returns planId as fallback", () => {
    const plans = { pro: "Pro" };
    expect(getPlanName(plans, "enterprise")).toBe("enterprise");
  });

  test("Zero seats returns zero spend", () => {
    expect(getExpectedSpend(20, 0)).toBe(0);
  });
});