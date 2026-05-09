import { NextRequest, NextResponse } from "next/server";
import { runAuditEngine } from "@/lib/audit-engine";
import { saveAudit } from "@/lib/supabase";
import { AuditInputSchema } from "@/lib/validations";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { RATE_LIMIT_AUDIT, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";
import { AuditInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  // ── Rate limit ────────────────────────────────────────────────────────────
  const key = getRateLimitKey(req, "audit");
  const limit = checkRateLimit(key, RATE_LIMIT_AUDIT, RATE_LIMIT_WINDOW_MS);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before running another audit." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // ── Parse + validate ──────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = AuditInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // ── Run audit engine ──────────────────────────────────────────────────────
  const audit = runAuditEngine(parsed.data as AuditInput);

  // ── Persist to Supabase (blocking — wait for save before redirecting) ─────
  // We wait here so the audit exists in DB before the client navigates to
  // /audit/[id]. Without this, the results page says "Audit not found."
  try {
    await saveAudit(audit);
  } catch (err) {
    console.error("Supabase save failed:", err);
    // Still return the audit — client will cache in localStorage as fallback
    // so the user sees results even if DB is down.
    return NextResponse.json(
      { ...audit, _dbError: true },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": String(limit.remaining) },
      }
    );
  }

  // ── Return audit result ───────────────────────────────────────────────────
  return NextResponse.json(audit, {
    status: 200,
    headers: {
      "X-RateLimit-Remaining": String(limit.remaining),
    },
  });
}