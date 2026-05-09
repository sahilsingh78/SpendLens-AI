import { describe, test, expect } from "vitest";

type UseCase = "coding" | "writing" | "data" | "research" | "mixed";
const VALID_TOOL_IDS = ["cursor", "github_copilot", "claude", "chatgpt", "anthropic_api", "openai_api", "gemini", "windsurf"];
const VALID_USE_CASES: UseCase[] = ["coding", "writing", "data", "research", "mixed"];

function validateToolId(id: string): boolean {
  return VALID_TOOL_IDS.includes(id);
}

function validateUseCase(uc: string): boolean {
  return VALID_USE_CASES.includes(uc as UseCase);
}

function validateToolEntry(entry: { toolId: string; seats: number; monthlySpend: number; plan: string }): boolean {
  return (
    validateToolId(entry.toolId) &&
    entry.seats >= 1 &&
    entry.monthlySpend >= 0 &&
    entry.plan.length > 0
  );
}

function validateAuditInput(input: { tools: unknown[]; teamSize: number; useCase: string }): boolean {
  return input.tools.length >= 1 && input.teamSize >= 1 && validateUseCase(input.useCase);
}

describe("Validation", () => {
  test("Valid toolId passes", () => {
    expect(validateToolId("cursor")).toBe(true);
  });

  test("Invalid toolId fails", () => {
    expect(validateToolId("adobe_firefly")).toBe(false);
  });

  test("Valid use case passes", () => {
    expect(validateUseCase("coding")).toBe(true);
  });

  test("Invalid use case fails", () => {
    expect(validateUseCase("gaming")).toBe(false);
  });

  test("Valid tool entry passes", () => {
    expect(validateToolEntry({ toolId: "cursor", seats: 2, monthlySpend: 40, plan: "pro" })).toBe(true);
  });

  test("Zero seats fails validation", () => {
    expect(validateToolEntry({ toolId: "cursor", seats: 0, monthlySpend: 40, plan: "pro" })).toBe(false);
  });

  test("Negative spend fails validation", () => {
    expect(validateToolEntry({ toolId: "cursor", seats: 1, monthlySpend: -10, plan: "pro" })).toBe(false);
  });

  test("Empty tools array fails audit input validation", () => {
    expect(validateAuditInput({ tools: [], teamSize: 5, useCase: "coding" })).toBe(false);
  });

  test("Valid audit input passes", () => {
    expect(validateAuditInput({ tools: [{}], teamSize: 5, useCase: "coding" })).toBe(true);
  });
});