// lib/supabase.ts

declare module "@supabase/supabase-js" {
  export function createClient(
    supabaseUrl: string,
    supabaseAnonKey: string
  ): any;
}

import { createClient } from "@supabase/supabase-js";

import {
  AuditResult,
  Lead,
  ShareableAudit,
} from "@/lib/types";

/* =========================================
   Supabase Client
========================================= */

const supabaseUrl =
  process.env
    .NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey =
  process.env
    .NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey
  );

/* =========================================
   Save Audit
========================================= */

export async function saveAudit(
  audit: AuditResult
): Promise<void> {
  const publicData: ShareableAudit =
    {
      id: audit.id,

      recommendations:
        audit.recommendations,

      totalMonthlySpend:
        audit.totalMonthlySpend,

      totalMonthlySavings:
        audit.totalMonthlySavings,

      totalAnnualSavings:
        audit.totalAnnualSavings,

      savingsPercentage:
        audit.savingsPercentage,

      tier: audit.tier,

      toolCount:
        audit.input.tools.length,

      teamSize:
        audit.input.teamSize,

      useCase:
        audit.input.useCase,

      createdAt:
        audit.createdAt,
    };

  const { error } =
    await supabase
      .from("audits")
      .insert({
        id: audit.id,

        data: audit,

        public_data:
          publicData,

        created_at:
          audit.createdAt,
      });

  if (error) {
    throw new Error(
      `Failed to save audit: ${error.message}`
    );
  }
}

/* =========================================
   Get Audit
========================================= */

export async function getAudit(
  id: string
): Promise<ShareableAudit> {
  const { data, error } =
    await supabase
      .from("audits")
      .select("public_data")
      .eq("id", id)
      .single();

  if (error || !data) {
    throw new Error(
      "Audit not found"
    );
  }

  return data.public_data as ShareableAudit;
}

/* =========================================
   Save Lead
========================================= */

export async function saveLead(
  lead: Lead
): Promise<void> {
  const { error } =
    await supabase
      .from("leads")
      .insert({
        email: lead.email,

        company_name:
          lead.company ?? null,

        role:
          lead.role ?? null,

        team_size:
          lead.teamSize ?? null,

        audit_id:
          lead.auditId,

        monthly_savings:
          lead.monthlySavings,

        created_at:
          new Date().toISOString(),
      });

  if (error) {
    if (
      error.code === "23505"
    ) {
      return;
    }

    throw new Error(
      `Failed to save lead: ${error.message}`
    );
  }
}