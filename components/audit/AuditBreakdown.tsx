"use client";

import { ShareableAudit } from "@/lib/types";
import RecommendationCard from "./RecommendationCard";
import SavingsChart from "@/components/charts/SavingsChart";
import SpendPieChart from "@/components/charts/SpendPieChart";

interface AuditBreakdownProps {
  audit: ShareableAudit;
}

export default function AuditBreakdown({ audit }: AuditBreakdownProps) {
  const sorted = [...audit.recommendations].sort(
    (a, b) => b.monthlySavings - a.monthlySavings
  );

  const hasSavings = audit.recommendations.some((r) => r.monthlySavings > 0);

  const toolEntries = audit.recommendations.map((r) => ({
    toolId: r.toolId,
    name: r.toolName,
    plan: r.currentPlan,
    currentPlan: r.currentPlan,
    seats: 1,
    monthlySpend: r.currentSpend,
  }));

  return (
    <div className="space-y-6">

      {/* Per-tool breakdown */}
      <div>
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Per-tool breakdown
        </h2>

        <div className="space-y-3">
          {sorted.map((rec, i) => (
            <RecommendationCard
              key={rec.toolId}
              rec={rec}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Charts — only shown when savings exist */}
      {hasSavings && (
        <div className="grid md:grid-cols-2 gap-4">
          <SavingsChart recommendations={audit.recommendations} />
          <SpendPieChart tools={toolEntries} />
        </div>
      )}

    </div>
  );
}