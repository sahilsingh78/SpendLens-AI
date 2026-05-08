import {
  ActionType,
  ToolId,
  UseCase,
} from "@/lib/types";

interface RecommendationInput {
  toolId: ToolId;

  currentPlan: string;

  monthlySpend: number;

  seats: number;

  useCase: UseCase;

  teamSize: number;
}

interface RecommendationResult {
  action: ActionType;

  reason: string;

  recommendedPlan?: string;

  recommendedTool?: string;

  monthlySavings: number;
}

/* =========================================
   Static fallback recommendations
========================================= */

export const ACTION_RECOMMENDATIONS: Record<
  ToolId,
  RecommendationResult
> = {
  cursor: {
    action: "keep",

    reason:
      "Cursor remains one of the strongest AI-native editors for engineering teams.",

    monthlySavings: 0,
  },

  github_copilot: {
    action: "optimize",

    reason:
      "GitHub Copilot may overlap with existing AI coding tools in your stack.",

    recommendedTool:
      "Cursor",

    monthlySavings: 15,
  },

  claude: {
    action: "keep",

    reason:
      "Claude performs exceptionally well for long-form reasoning and writing workflows.",

    monthlySavings: 0,
  },

  chatgpt: {
    action: "optimize",

    reason:
      "ChatGPT usage overlaps with Claude for many startup workflows.",

    recommendedTool:
      "Claude",

    monthlySavings: 10,
  },

  anthropic_api: {
    action: "credits",

    reason:
      "Anthropic API spend may qualify for discounted infrastructure credits.",

    monthlySavings: 300,
  },

  openai_api: {
    action: "credits",

    reason:
      "OpenAI API usage is a strong candidate for negotiated credit pricing.",

    monthlySavings: 400,
  },

  gemini: {
    action: "downgrade",

    reason:
      "Gemini Advanced may be unnecessary unless your workflow depends heavily on Google ecosystem integrations.",

    recommendedPlan: "free",

    monthlySavings: 20,
  },

  windsurf: {
    action: "switch",

    reason:
      "Windsurf overlaps heavily with Cursor functionality for most engineering teams.",

    recommendedTool:
      "Cursor",

    monthlySavings: 15,
  },
};

/* =========================================
   Dynamic recommendation engine
========================================= */

export function getRecommendationForTool(
  input: RecommendationInput
): RecommendationResult {
  const {
    toolId,
    monthlySpend,
    seats,
    useCase,
    currentPlan,
  } = input;

  /*
    Cursor
  */

  if (toolId === "cursor") {
    if (
      seats <= 2 &&
      monthlySpend > 40
    ) {
      return {
        action: "downgrade",

        reason:
          "Small teams rarely need multiple Cursor Pro seats full-time.",

        recommendedPlan:
          "hobby",

        monthlySavings: 20,
      };
    }

    return ACTION_RECOMMENDATIONS.cursor;
  }

  /*
    GitHub Copilot
  */

  if (
    toolId ===
    "github_copilot"
  ) {
    if (
      useCase === "coding" &&
      monthlySpend > 50
    ) {
      return {
        action: "switch",

        reason:
          "Cursor often replaces Copilot more effectively for AI-first engineering workflows.",

        recommendedTool:
          "Cursor",

        monthlySavings: 25,
      };
    }

    return ACTION_RECOMMENDATIONS.github_copilot;
  }

  /*
    ChatGPT
  */

  if (toolId === "chatgpt") {
    if (
      currentPlan === "team" &&
      seats <= 3
    ) {
      return {
        action: "downgrade",

        reason:
          "Small teams often do not fully utilize ChatGPT Team features.",

        recommendedPlan:
          "plus",

        monthlySavings: 30,
      };
    }

    return ACTION_RECOMMENDATIONS.chatgpt;
  }

  /*
    Claude
  */

  if (toolId === "claude") {
    if (
      useCase === "writing" ||
      useCase === "research"
    ) {
      return {
        action: "keep",

        reason:
          "Claude is highly efficient for reasoning-heavy workflows.",

        monthlySavings: 0,
      };
    }

    return ACTION_RECOMMENDATIONS.claude;
  }

  /*
    OpenAI API
  */

  if (
    toolId === "openai_api"
  ) {
    if (monthlySpend >= 1000) {
      return {
        action: "credits",

        reason:
          "High OpenAI API spend qualifies for significant enterprise credit discounts.",

        monthlySavings:
          Math.round(
            monthlySpend * 0.3
          ),
      };
    }

    return ACTION_RECOMMENDATIONS.openai_api;
  }

  /*
    Anthropic API
  */

  if (
    toolId ===
    "anthropic_api"
  ) {
    if (monthlySpend >= 1000) {
      return {
        action: "credits",

        reason:
          "Anthropic infrastructure credits can substantially reduce API operating costs.",

        monthlySavings:
          Math.round(
            monthlySpend * 0.35
          ),
      };
    }

    return ACTION_RECOMMENDATIONS.anthropic_api;
  }

  /*
    Gemini
  */

  if (toolId === "gemini") {
    return ACTION_RECOMMENDATIONS.gemini;
  }

  /*
    Windsurf
  */

  if (
    toolId === "windsurf"
  ) {
    return ACTION_RECOMMENDATIONS.windsurf;
  }

  /*
    Fallback
  */

  return {
    action: "keep",

    reason:
      "No optimization opportunities detected.",

    monthlySavings: 0,
  };
}