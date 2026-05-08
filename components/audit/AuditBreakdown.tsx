"use client";

import { ShareableAudit } from "@/lib/types";

import RecommendationCard from "./RecommendationCard";

import SavingsChart from "@/components/charts/SavingsChart";

interface AuditBreakdownProps {
  audit: ShareableAudit;
}

export default function AuditBreakdown({
  audit,
}: AuditBreakdownProps) {

  const sorted =
    [...audit.recommendations].sort(
      (a, b) =>
        b.monthlySavings -
        a.monthlySavings
    );

  const hasSavings =
    audit.recommendations.some(
      (r) =>
        r.monthlySavings > 0
    );

  return (
    <div className="space-y-6">

      {/* Recommendations */}

      <div>

        <h2
          className="text-lg font-bold mb-4"
          style={{
            fontFamily:
              "Syne, sans-serif",
          }}
        >
          Per-tool breakdown
        </h2>

        <div className="space-y-3">

          {sorted.map(
            (rec, i) => (
              <RecommendationCard
                key={rec.toolId}
                rec={rec}
                index={i}
              />
            )
          )}

        </div>

      </div>

      {/* Charts */}

      {hasSavings && (
        <div>

          <SavingsChart
            recommendations={
              audit.recommendations
            }
          />

        </div>
      )}

    </div>
  );
}