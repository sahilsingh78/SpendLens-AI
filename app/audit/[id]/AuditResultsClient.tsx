"use client";

import SavingsHero from "@/components/audit/SavingsHero";
import AuditBreakdown from "@/components/audit/AuditBreakdown";
import ShareAudit from "@/components/audit/ShareAudit";
import AIInsightCard from "@/components/audit/AIInsightCard";
import BenchmarkCard from "@/components/audit/BenchmarkCard";
import LeadCaptureForm from "@/components/lead/LeadCaptureForm";
import { ShareableAudit } from "@/lib/types";

interface AuditResultsClientProps {
  audit: ShareableAudit;
}

export default function AuditResultsClient({ audit }: AuditResultsClientProps) {
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
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Your AI spend audit
          </h1>
          <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-lg leading-8">
            We analyzed your AI tooling stack and identified optimization
            opportunities across pricing, seat allocation, and workflow overlap.
          </p>
        </div>

        {/* Savings Hero */}
        <SavingsHero audit={audit} />

        {/* Benchmark */}
        <BenchmarkCard audit={audit} />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">

          {/* Left Column */}
          <div className="space-y-6">
            <AuditBreakdown audit={audit} />
            <AIInsightCard audit={audit} />
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <ShareAudit auditId={audit.id} />
            <LeadCaptureForm
              auditId={audit.id}
              monthlySavings={audit.totalMonthlySavings}
              onSuccess={() => {
                console.log("Lead captured successfully");
              }}
            />

            {/* Snapshot Card */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Audit snapshot
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Team size</span>
                  <span className="font-medium">{audit.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Use case</span>
                  <span className="capitalize font-medium">{audit.useCase}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Tools audited</span>
                  <span className="font-medium">{audit.toolCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Audit tier</span>
                  <span className="font-medium capitalize text-[var(--accent)]">{audit.tier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Potential savings</span>
                  <span className="font-semibold text-[var(--accent)]">
                    ${audit.totalMonthlySavings}/mo
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