export const APP_NAME = "SpendLens";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://spend-lens-ai-uah9.vercel.app";
export const APP_DESCRIPTION =
  "Free AI spend audit for startups. Find out where you're overpaying on Cursor, Claude, ChatGPT, Copilot and more.";

export const CREDEX_URL = "https://credex.rocks";
export const CREDEX_CONSULT_URL = "https://credex.rocks/consult";

// Savings thresholds (USD/month)
export const THRESHOLD_HIGH_SAVINGS = 500;
export const THRESHOLD_LOW_SAVINGS = 100;
export const THRESHOLD_CREDITS_MENTION = 200;

// Rate limiting
export const RATE_LIMIT_AUDIT = 10;
export const RATE_LIMIT_LEAD = 5;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Audit storage TTL
export const AUDIT_TTL_DAYS = 30;

// Credex discount estimate (conservative)
export const CREDEX_DISCOUNT_RATE = 0.35;

// Plain email only — no name prefix for Resend sandbox
export const FROM_EMAIL = "onboarding@resend.dev";
export const SUPPORT_EMAIL = "hello@credex.rocks";