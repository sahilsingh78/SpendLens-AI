"use client";

import SavingsHero from "@/components/audit/SavingsHero";
import AuditBreakdown from "@/components/audit/AuditBreakdown";
import ShareAudit from "@/components/audit/ShareAudit";
import AIInsightCard from "@/components/audit/AIInsightCard";
import LeadCaptureForm from "@/components/lead/LeadCaptureForm";

import {
  ShareableAudit,
  AuditResult,
} from "@/lib/types";

interface AuditResultsClientProps {
  audit:
    | ShareableAudit
    | AuditResult;
}

export default function AuditResultsClient({
  audit,
}: AuditResultsClientProps) {
  const safeAudit =
    audit as AuditResult;

  return (
    <main className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}

        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)] font-mono-custom mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />

            AUDIT COMPLETE
          </div>

          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              fontFamily:
                "Syne, sans-serif",
            }}
          >
            Your AI spend audit
          </h1>

          <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-lg leading-8">
            We analyzed your AI
            tooling stack and
            identified optimization
            opportunities across
            pricing, seat allocation,
            and workflow overlap.
          </p>
        </div>

        {/* Savings Hero */}

        <SavingsHero
          audit={safeAudit}
        />

        {/* Main Grid */}

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">

          {/* Left Column */}

          <div className="space-y-6">

            <AuditBreakdown
              audit={safeAudit}
            />

            <AIInsightCard
              audit={safeAudit}
            />

          </div>

          {/* Right Column */}

          <div className="space-y-6 lg:sticky lg:top-24">

            <ShareAudit
              auditId={
                safeAudit.id
              }
            />

            <LeadCaptureForm
                auditId={safeAudit.id}
                monthlySavings={
                    safeAudit.totalMonthlySavings
                }
                onSuccess={() => {
                    console.log(
                    "Lead captured successfully"
                    );
                }}
            />

            {/* Snapshot Card */}

            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <h3
                className="text-sm font-semibold mb-4"
                style={{
                  fontFamily:
                    "Syne, sans-serif",
                }}
              >
                Audit snapshot
              </h3>

              <div className="space-y-4 text-sm">

                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">
                    Team size
                  </span>

                  <span className="font-medium">
                    {
                      safeAudit.input
                        .teamSize
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">
                    Use case
                  </span>

                  <span className="capitalize font-medium">
                    {
                      safeAudit.input
                        .useCase
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">
                    Tools audited
                  </span>

                  <span className="font-medium">
                    {
                      safeAudit.input
                        .tools.length
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">
                    Audit tier
                  </span>

                  <span className="font-medium capitalize text-[var(--accent)]">
                    {
                      safeAudit.tier
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">
                    Potential savings
                  </span>

                  <span className="font-semibold text-[var(--accent)]">
                    $
                    {
                      safeAudit.totalMonthlySavings
                    }
                    /mo
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}