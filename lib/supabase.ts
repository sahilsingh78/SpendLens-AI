import { createClient } from "@supabase/supabase-js";
import { AuditResult, Lead, ShareableAudit } from "@/lib/types";

// Lazy initialization — never runs at build time, only when API routes are called
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export async function saveAudit(audit: AuditResult): Promise<void> {
  const publicData: ShareableAudit = {
    id: audit.id,
    recommendations: audit.recommendations,
    totalMonthlySpend: audit.totalMonthlySpend,
    totalMonthlySavings: audit.totalMonthlySavings,
    totalAnnualSavings: audit.totalAnnualSavings,
    savingsPercentage: audit.savingsPercentage,
    tier: audit.tier,
    toolCount: audit.input.tools.length,
    teamSize: audit.input.teamSize,
    useCase: audit.input.useCase,
    createdAt: audit.createdAt,
  };

  const { error } = await getClient()
    .from("audits")
    .insert({
      id: audit.id,
      data: audit,
      public_data: publicData,
      created_at: audit.createdAt,
    });

  if (error) {
    // 23505 = unique violation (duplicate insert) — safe to ignore
    if (error.code === "23505") return;

    // Log full error details so you can see exactly what's wrong in Vercel logs
    console.error("Supabase saveAudit error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(`Failed to save audit: ${error.message}`);
  }
}

export async function getAudit(id: string): Promise<ShareableAudit> {
  const { data, error } = await getClient()
    .from("audits")
    .select("public_data")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getAudit error:", {
      id,
      code: error.code,
      message: error.message,
    });
    throw new Error("Audit not found");
  }

  if (!data?.public_data) {
    throw new Error("Audit not found");
  }

  return data.public_data as ShareableAudit;
}

export async function saveLead(lead: Lead): Promise<void> {
  const { error } = await getClient()
    .from("leads")
    .insert({
      email: lead.email,
      company_name: lead.company ?? null,
      role: lead.role ?? null,
      team_size: lead.teamSize ?? null,
      audit_id: lead.auditId,
      monthly_savings: lead.monthlySavings,
      created_at: new Date().toISOString(),
    });

  if (error && error.code !== "23505") {
    console.error("Supabase saveLead error:", {
      code: error.code,
      message: error.message,
    });
    throw new Error(`Failed to save lead: ${error.message}`);
  }
}