import { ToolConfig } from "@/lib/types";

// All prices in USD per seat per month
// Sources documented in PRICING_DATA.md
// Verified: May 2025

export const TOOL_CONFIGS: ToolConfig[] = [
  {
    id: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    category: "editor",
    useCaseFit: ["coding"],
    plans: [
      {
        id: "hobby",
        name: "Hobby",
        pricePerSeatPerMonth: 0,
        features: ["2000 completions/mo", "50 slow premium requests"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeatPerMonth: 20,
        features: ["Unlimited completions", "500 fast premium requests", "Claude 3.5/4, GPT-4o"],
      },
      {
        id: "business",
        name: "Business",
        pricePerSeatPerMonth: 40,
        minSeats: 1,
        features: ["Everything in Pro", "Centralized billing", "Admin dashboard", "SSO"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeatPerMonth: 60,
        isEnterprise: true,
        features: ["Custom models", "On-prem option", "SLA", "Dedicated support"],
      },
    ],
  },
  {
    id: "github_copilot",
    name: "GitHub Copilot",
    vendor: "GitHub / Microsoft",
    category: "editor",
    useCaseFit: ["coding"],
    plans: [
      {
        id: "individual",
        name: "Individual",
        pricePerSeatPerMonth: 10,
        maxSeats: 1,
        features: ["Code completions", "Chat in IDE", "CLI"],
      },
      {
        id: "business",
        name: "Business",
        pricePerSeatPerMonth: 19,
        features: ["Everything in Individual", "Policy management", "Audit logs"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeatPerMonth: 39,
        isEnterprise: true,
        features: ["Custom models", "Knowledge bases", "PR summaries", "Fine-tuning"],
      },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    category: "assistant",
    useCaseFit: ["writing", "research", "coding", "data", "mixed"],
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeatPerMonth: 0,
        features: ["Limited usage", "Claude 3.5 Haiku"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeatPerMonth: 20,
        maxSeats: 1,
        features: ["5x more usage", "Claude 3.5/3.7 Sonnet", "Projects", "Priority access"],
      },
      {
        id: "max_5x",
        name: "Max (5x)",
        pricePerSeatPerMonth: 100,
        maxSeats: 1,
        features: ["5x Pro limits", "Claude Opus 4", "Extended thinking"],
      },
      {
        id: "max_20x",
        name: "Max (20x)",
        pricePerSeatPerMonth: 200,
        maxSeats: 1,
        features: ["20x Pro limits", "Claude Opus 4", "Highest priority"],
      },
      {
        id: "team",
        name: "Team",
        pricePerSeatPerMonth: 30,
        minSeats: 2,
        features: ["Everything in Pro", "Shared Projects", "Admin console", "Higher limits"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeatPerMonth: 60,
        isEnterprise: true,
        features: ["Custom context", "SSO/SAML", "SLA", "Audit logs"],
      },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    category: "assistant",
    useCaseFit: ["writing", "research", "coding", "data", "mixed"],
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeatPerMonth: 0,
        features: ["GPT-4o mini", "Limited GPT-4o"],
      },
      {
        id: "plus",
        name: "Plus",
        pricePerSeatPerMonth: 20,
        maxSeats: 1,
        features: ["GPT-4o", "DALL-E 3", "Advanced data analysis", "o1"],
      },
      {
        id: "team",
        name: "Team",
        pricePerSeatPerMonth: 30,
        minSeats: 2,
        features: ["Everything in Plus", "Workspace", "Admin console", "No training"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeatPerMonth: 60,
        isEnterprise: true,
        features: ["Unlimited GPT-4o", "SSO", "Advanced security", "Custom context"],
      },
      {
        id: "api",
        name: "API (direct)",
        pricePerSeatPerMonth: 0,
        features: ["Pay per token", "All models", "Full API access"],
      },
    ],
  },
  {
    id: "anthropic_api",
    name: "Anthropic API",
    vendor: "Anthropic",
    category: "api",
    useCaseFit: ["coding", "data", "research", "mixed"],
    plans: [
      {
        id: "payg",
        name: "Pay-as-you-go",
        pricePerSeatPerMonth: 0,
        features: ["All Claude models", "Per-token billing", "Full API access"],
      },
      {
        id: "committed",
        name: "Committed use",
        pricePerSeatPerMonth: 0,
        features: ["Volume discounts", "Reserved capacity", "Priority access"],
      },
    ],
  },
  {
    id: "openai_api",
    name: "OpenAI API",
    vendor: "OpenAI",
    category: "api",
    useCaseFit: ["coding", "data", "research", "mixed"],
    plans: [
      {
        id: "payg",
        name: "Pay-as-you-go",
        pricePerSeatPerMonth: 0,
        features: ["All GPT models", "Per-token billing", "Full API access"],
      },
      {
        id: "committed",
        name: "Committed use",
        pricePerSeatPerMonth: 0,
        features: ["Volume discounts", "Batch processing discounts"],
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    vendor: "Google",
    category: "assistant",
    useCaseFit: ["writing", "research", "data", "mixed"],
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeatPerMonth: 0,
        features: ["Gemini 1.5 Flash", "Limited usage"],
      },
      {
        id: "advanced",
        name: "Advanced (Google One AI)",
        pricePerSeatPerMonth: 20,
        maxSeats: 1,
        features: ["Gemini Ultra", "2TB storage", "Priority access"],
      },
      {
        id: "business",
        name: "Gemini for Google Workspace Business",
        pricePerSeatPerMonth: 20,
        features: ["Gemini in Gmail/Docs/Sheets", "NotebookLM Plus", "Meet AI"],
      },
      {
        id: "enterprise",
        name: "Gemini for Google Workspace Enterprise",
        pricePerSeatPerMonth: 30,
        isEnterprise: true,
        features: ["Advanced security", "Audit", "Gemini Ultra in Workspace"],
      },
      {
        id: "api",
        name: "API (direct)",
        pricePerSeatPerMonth: 0,
        features: ["Pay per token", "All Gemini models", "Vertex AI integration"],
      },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    vendor: "Codeium",
    category: "editor",
    useCaseFit: ["coding"],
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeatPerMonth: 0,
        features: ["Basic completions", "5 flows/day", "Claude 3.5 Haiku"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeatPerMonth: 15,
        features: ["Unlimited completions", "Unlimited flows", "All models"],
      },
      {
        id: "teams",
        name: "Teams",
        pricePerSeatPerMonth: 35,
        minSeats: 2,
        features: ["Everything in Pro", "Team dashboard", "Admin controls"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeatPerMonth: 60,
        isEnterprise: true,
        features: ["On-prem", "Custom models", "SSO", "SLA"],
      },
    ],
  },
];

export function getToolConfig(toolId: string) {
  return TOOL_CONFIGS.find((t) => t.id === toolId);
}

export function getPlanConfig(toolId: string, planId: string) {
  const tool = getToolConfig(toolId);
  return tool?.plans.find((p) => p.id === planId);
}

export function getExpectedMonthlySpend(
  toolId: string,
  planId: string,
  seats: number
): number {
  const plan = getPlanConfig(toolId, planId);
  if (!plan) return 0;
  return plan.pricePerSeatPerMonth * seats;
}