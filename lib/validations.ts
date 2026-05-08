import { z } from "zod";

/* =========================================
   Internal Schemas
========================================= */

const ToolIdSchema = z.enum([
  "cursor",
  "github_copilot",
  "claude",
  "chatgpt",
  "anthropic_api",
  "openai_api",
  "gemini",
  "windsurf",
]);

const UseCaseSchema = z.enum([
  "coding",
  "writing",
  "data",
  "research",
  "mixed",
]);

const RecommendationActionSchema =
  z.enum([
    "downgrade",
    "switch",
    "keep",
    "credits",
    "optimize",
  ]);

/* =========================================
   Tool Entry
========================================= */

const ToolEntrySchema =
  z.object({
    toolId:
      ToolIdSchema,

    name: z
      .string()
      .min(1)
      .max(100),

    currentPlan: z
      .string()
      .min(1)
      .max(100),

    /* backward compatibility */
    plan: z
      .string()
      .optional(),

    seats: z
      .number()
      .int()
      .min(1)
      .max(10000),

    monthlySpend: z
      .number()
      .min(0)
      .max(1000000),

    useCase:
      UseCaseSchema.optional(),
  });

/* =========================================
   Audit Input
========================================= */

export const AuditInputSchema =
  z.object({
    tools: z
      .array(
        ToolEntrySchema
      )
      .min(1)
      .max(20),

    teamSize: z
      .number()
      .int()
      .min(1)
      .max(100000),

    useCase:
      UseCaseSchema,

    companyName: z
      .string()
      .max(120)
      .optional(),
  });

/* =========================================
   Recommendation
========================================= */

const RecommendationSchema =
  z.object({
    toolId:
      ToolIdSchema,

    toolName:
      z.string(),

    currentPlan:
      z.string(),

    currentSpend:
      z.number(),

    action:
      RecommendationActionSchema,

    recommendedPlan:
      z.string().optional(),

    recommendedTool:
      z.string().optional(),

    monthlySavings:
      z.number(),

    annualSavings:
      z.number(),

    reason:
      z.string(),

    credexOpportunity:
      z.boolean().optional(),
  });

/* =========================================
   Audit Result
========================================= */

export const AuditResultSchema =
  z.object({
    id: z.string(),

    input:
      AuditInputSchema,

    recommendations:
      z.array(
        RecommendationSchema
      ),

    totalMonthlySpend:
      z.number(),

    totalMonthlySavings:
      z.number(),

    totalAnnualSavings:
      z.number(),

    savingsPercentage:
      z.number(),

    aiSummary:
      z.string().optional(),

    tier: z.enum([
      "optimal",
      "low",
      "mid",
      "high",
    ]),

    createdAt:
      z.string(),
  });

/* =========================================
   Lead Schema
========================================= */

export const LeadSchema =
  z.object({
    email: z
      .string()
      .email(),

    company: z
      .string()
      .max(120)
      .optional(),

    role: z
      .string()
      .max(120)
      .optional(),

    teamSize: z
      .number()
      .int()
      .positive()
      .optional(),

    auditId:
      z.string(),

    monthlySavings:
      z.number().min(0),
  });

/* =========================================
   Share Audit Schema
========================================= */

export const ShareAuditSchema =
  z.object({
    auditId:
      z.string(),
  });

/* =========================================
   AI Summary Request
========================================= */

export const SummaryRequestSchema =
  AuditResultSchema;

/* =========================================
   Exported Types
========================================= */

export type AuditInputValidated =
  z.infer<
    typeof AuditInputSchema
  >;

export type AuditResultValidated =
  z.infer<
    typeof AuditResultSchema
  >;

export type LeadValidated =
  z.infer<
    typeof LeadSchema
  >;