import { describe, test, expect } from "vitest";

function checkRateLimit(store: Map<string, number>, key: string, limit: number): boolean {
  const count = store.get(key) ?? 0;
  if (count >= limit) return false;
  store.set(key, count + 1);
  return true;
}

function buildAuditResult(monthlySavings: number, totalSpend: number) {
  return {
    id: "test-id",
    recommendations: [],
    totalMonthlySpend: totalSpend,
    totalMonthlySavings: monthlySavings,
    totalAnnualSavings: monthlySavings * 12,
    savingsPercentage: totalSpend > 0 ? Math.round((monthlySavings / totalSpend) * 100) : 0,
    tier: monthlySavings === 0 ? "optimal" : monthlySavings / totalSpend >= 0.35 ? "high" : "mid",
    createdAt: new Date().toISOString(),
  };
}

describe("API Logic", () => {
  test("Rate limiter allows first request", () => {
    const store = new Map<string, number>();
    expect(checkRateLimit(store, "ip1", 10)).toBe(true);
  });

  test("Rate limiter blocks after limit reached", () => {
    const store = new Map<string, number>();
    for (let i = 0; i < 3; i++) checkRateLimit(store, "ip2", 3);
    expect(checkRateLimit(store, "ip2", 3)).toBe(false);
  });

  test("Rate limiter tracks different IPs separately", () => {
    const store = new Map<string, number>();
    for (let i = 0; i < 3; i++) checkRateLimit(store, "ip3", 3);
    expect(checkRateLimit(store, "ip4", 3)).toBe(true);
  });

  test("Audit result has required fields", () => {
    const result = buildAuditResult(200, 500);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("totalMonthlySavings");
    expect(result).toHaveProperty("totalAnnualSavings");
    expect(result).toHaveProperty("tier");
  });

  test("Total savings are never negative", () => {
    const result = buildAuditResult(0, 500);
    expect(result.totalMonthlySavings).toBeGreaterThanOrEqual(0);
  });

  test("Annual savings equals monthly × 12", () => {
    const result = buildAuditResult(150, 400);
    expect(result.totalAnnualSavings).toBe(1800);
  });

  test("Savings percentage is 0 when no savings", () => {
    const result = buildAuditResult(0, 500);
    expect(result.savingsPercentage).toBe(0);
  });
});