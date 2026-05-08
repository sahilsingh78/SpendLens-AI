export type ToolId =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export type UseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "mixed";

export type ActionType =
  | "downgrade"
  | "switch"
  | "keep"
  | "credits"
  | "optimize";

export type AuditTier =
  | "optimal"
  | "low"
  | "mid"
  | "high";

/* =========================================
   Tool Entry
========================================= */

export interface ToolEntry {
  toolId: ToolId;

  name: string;

  currentPlan: string;

  /* Compatibility for older components */
  plan?: string;

  seats: number;

  monthlySpend: number;

  useCase?: UseCase;
}

/* =========================================
   Compatibility Alias
========================================= */

export type ToolInput = ToolEntry;

/* =========================================
   Audit Input
========================================= */

export interface AuditInput {
  tools: ToolEntry[];

  teamSize: number;

  useCase: UseCase;

  companyName?: string;
}

/* =========================================
   Recommendation
========================================= */

export interface ToolRecommendation {
  toolId: ToolId;

  toolName: string;

  currentPlan: string;

  currentSpend: number;

  action: ActionType;

  recommendedPlan?: string;

  recommendedTool?: string;

  monthlySavings: number;

  annualSavings: number;

  reason: string;

  credexOpportunity?: boolean;
}

/* =========================================
   Audit Result
========================================= */

export interface AuditResult {
  id: string;

  input: AuditInput;

  recommendations: ToolRecommendation[];

  totalMonthlySpend: number;

  totalMonthlySavings: number;

  totalAnnualSavings: number;

  savingsPercentage: number;

  aiSummary?: string;

  tier: AuditTier;

  createdAt: string;
}

/* =========================================
   Lead Capture
========================================= */

export interface Lead {
  id?: string;

  email: string;

  company?: string;

  role?: string;

  teamSize?: number;

  auditId: string;

  monthlySavings: number;

  createdAt?: string;
}

/* =========================================
   Tool Config
========================================= */

export interface ToolConfig {
  id: ToolId;

  name: string;

  vendor: string;

  plans: PlanConfig[];

  category:
    | "editor"
    | "chat"
    | "api"
    | "assistant";

  useCaseFit: UseCase[];
}

/* =========================================
   Plan Config
========================================= */

export interface PlanConfig {
  id: string;

  name: string;

  pricePerSeatPerMonth: number;

  minSeats?: number;

  maxSeats?: number;

  features: string[];

  isEnterprise?: boolean;
}

/* =========================================
   Rate Limiting
========================================= */

export interface RateLimitResult {
  allowed: boolean;

  remaining: number;

  resetAt: number;
}

/* =========================================
   Shareable Audit
========================================= */

export interface ShareableAudit {
  id: string;

  recommendations:
    Omit<ToolRecommendation, never>[];

  totalMonthlySpend: number;

  totalMonthlySavings: number;

  totalAnnualSavings: number;

  savingsPercentage: number;

  tier: AuditTier;

  toolCount: number;

  teamSize: number;

  useCase: UseCase;

  createdAt: string;
}