import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/supabase";
import { sendAuditEmail } from "@/lib/resend";
import { getAudit } from "@/lib/supabase";
import { LeadSchema } from "@/lib/validations";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { RATE_LIMIT_LEAD, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";
import { AuditResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  // Rate limit
  const key = getRateLimitKey(req, "lead");
  const limit = checkRateLimit(key, RATE_LIMIT_LEAD, RATE_LIMIT_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { email, company, role, teamSize, auditId, monthlySavings } = parsed.data;

  // Save lead
  try {
    await saveLead({ email, company, role, teamSize, auditId, monthlySavings });
  } catch (err) {
    console.error("Lead save failed:", err);
    // Don't block the email — still try to send
  }

  // Fetch audit + send email (best-effort)
  try {
    const publicAudit = await getAudit(auditId);
    // Reconstruct enough of AuditResult for the email
    const auditForEmail = {
      ...publicAudit,
      id: publicAudit.id,
      input: {
        tools: [],
        teamSize: publicAudit.teamSize,
        useCase: publicAudit.useCase,
      },
    } as unknown as AuditResult;

    await sendAuditEmail(email, auditForEmail);
  } catch (err) {
    console.error("Email send failed:", err);
    // Non-fatal: lead is saved, email just didn't go out
  }

  return NextResponse.json({ success: true });
}