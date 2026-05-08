import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return "$0";
  if (amount < 1000) return `$${Math.round(amount)}`;
  return `$${(amount / 1000).toFixed(1)}k`;
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function plural(count: number, word: string, suffix = "s"): string {
  return `${count} ${word}${count !== 1 ? suffix : ""}`;
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

export function getTierLabel(tier: "optimal" | "low" | "mid" | "high"): string {
  switch (tier) {
    case "optimal": return "Optimally spent";
    case "low": return "Minor savings available";
    case "mid": return "Moderate savings available";
    case "high": return "Significant overspend detected";
  }
}

export function getTierColor(tier: "optimal" | "low" | "mid" | "high"): string {
  switch (tier) {
    case "optimal": return "#00ff88";
    case "low": return "#4499ff";
    case "mid": return "#ffaa00";
    case "high": return "#ff4444";
  }
}

export function getActionLabel(action: string): string {
  switch (action) {
    case "downgrade": return "Downgrade plan";
    case "switch": return "Switch tool";
    case "keep": return "Keep — optimal";
    case "credits": return "Buy via credits";
    case "optimize": return "Optimize usage";
    default: return action;
  }
}

export function getActionColor(action: string): string {
  switch (action) {
    case "downgrade": return "#ffaa00";
    case "switch": return "#4499ff";
    case "keep": return "#00ff88";
    case "credits": return "#aa66ff";
    case "optimize": return "#ff8844";
    default: return "#888";
  }
}