"use client";

import Link from "next/link";

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

export default function AuditResultsClient({
  audit,
}: AuditResultsClientProps) {

  return (

    <main className="relative px-4 py-16">

      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}

        <div className="animate-fade-in text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono-custom text-xs text-[var(--text-muted)]">

            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />

            AUDIT COMPLETE

          </div>

          <h1
            className="mb-4 text-4xl font-black md:text-5xl"
            style={{
              fontFamily:
                "Syne, sans-serif",
            }}
          >
            Your AI spend audit
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            We analyzed your AI tooling stack and identified optimization
            opportunities across pricing, seat allocation, and workflow overlap.
          </p>

        </div>

        {/* Savings Hero */}

        <SavingsHero
          audit={audit}
        />

        {/* Benchmark */}

        <BenchmarkCard
          audit={audit}
        />

        {/* Main Grid */}

        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left Column */}

          <div className="space-y-6">

            <AuditBreakdown
              audit={audit}
            />

            <AIInsightCard
              audit={audit}
            />

          </div>

          {/* Right Column */}

          <div className="space-y-6 lg:sticky lg:top-24">

            {/* Share Audit */}

            <ShareAudit
              auditId={audit.id}
              monthlySavings={audit.totalMonthlySavings}
            />

            {/* Lead Capture */}

            <LeadCaptureForm
              auditId={audit.id}
              monthlySavings={audit.totalMonthlySavings}
              onSuccess={() => {
                console.log(
                  "Lead captured successfully"
                );
              }}
            />

            {/* Snapshot Card */}

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

              <h3
                className="mb-4 text-sm font-semibold"
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
                    {audit.teamSize}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[var(--text-muted)]">
                    Use case
                  </span>

                  <span className="font-medium capitalize">
                    {audit.useCase}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[var(--text-muted)]">
                    Tools audited
                  </span>

                  <span className="font-medium">
                    {audit.toolCount}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[var(--text-muted)]">
                    Audit tier
                  </span>

                  <span className="font-medium capitalize text-[var(--accent)]">
                    {audit.tier}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[var(--text-muted)]">
                    Potential savings
                  </span>

                  <span className="font-semibold text-[var(--accent)]">
                    ${audit.totalMonthlySavings}/mo
                  </span>

                </div>

              </div>

            </div>

            {/* Run Another Audit */}

            <div className="pt-2 text-center">

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                ← Run another audit
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}