"use client";

import { ShareableAudit } from "@/lib/types";

interface AIInsightCardProps {
  audit: ShareableAudit;
}

export default function AIInsightCard({ audit }: AIInsightCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
        <p className="text-sm font-semibold">AI Optimization Insight</p>
      </div>

      <div aria-live="polite" aria-label="AI generated insight">
        <p className="text-[var(--text-muted)] leading-7 text-sm">
          Based on your current AI tooling stack, there are opportunities to
          reduce overlapping subscriptions, optimize seat allocation, and
          consolidate workflows for better cost efficiency.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
          <p className="text-[var(--text-dim)] mb-1">Team Size</p>
          <p className="font-semibold">{audit.teamSize}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
          <p className="text-[var(--text-dim)] mb-1">Tools Audited</p>
          <p className="font-semibold">{audit.toolCount}</p>
        </div>
      </div>

    </div>
  );
}