import { NextRequest, NextResponse } from "next/server";
import { runAuditEngine } from "@/lib/audit-engine";
import { saveAudit } from "@/lib/supabase";
import { AuditInputSchema } from "@/lib/validations";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { RATE_LIMIT_AUDIT, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  // Rate limit
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

  // Parse + validate
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

  // Run audit engine
  const audit = runAuditEngine(parsed.data);

  // Persist to Supabase (non-blocking — don't fail the response if DB is down)
  saveAudit(audit).catch((err) =>
    console.error("Failed to persist audit:", err)
  );

  return NextResponse.json(audit, {
    status: 200,
    headers: {
      "X-RateLimit-Remaining": String(limit.remaining),
    },
  });
}