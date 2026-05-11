import { ToolRecommendation } from "@/lib/types";
import { formatCurrencyFull, getActionLabel, getActionColor } from "@/lib/helpers";

interface RecommendationCardProps {
  rec: ToolRecommendation;
  index: number;
}

export default function RecommendationCard({ rec, index }: RecommendationCardProps) {
  const actionColor = getActionColor(rec.action);
  const hasSavings = rec.monthlySavings > 0;

  // Fix 1: For credits action, show after-credit price instead of $0
  const afterPrice =
    rec.action === "credits"
      ? `~${formatCurrencyFull(Math.round(rec.currentSpend * 0.65))}/mo via credits`
      : `${formatCurrencyFull(rec.currentSpend - rec.monthlySavings)}/mo`;

  // Fix 2: Never show "hobby" as recommended plan — min recommendation is "pro"
  const recommendedPlanDisplay =
    rec.recommendedPlan === "hobby" ? "pro" : rec.recommendedPlan;

  return (
    <div
      className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] animate-fade-in card-hover"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3
              className="font-semibold text-sm"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {rec.toolName}
            </h3>
            <span className="text-xs text-[var(--text-dim)] font-mono capitalize">
              {rec.currentPlan}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                color: actionColor,
                background: actionColor + "15",
                border: `1px solid ${actionColor}30`,
              }}
            >
              {getActionLabel(rec.action)}
            </span>
            {recommendedPlanDisplay && (
              <span className="text-xs text-[var(--text-muted)]">
                → {rec.recommendedTool ?? rec.toolName}{" "}
                <span className="capitalize">{recommendedPlanDisplay}</span>
              </span>
            )}
            {rec.recommendedTool && !rec.recommendedPlan && (
              <span className="text-xs text-[var(--text-muted)]">
                → {rec.recommendedTool}
              </span>
            )}
          </div>
        </div>

        {/* Savings badge */}
        <div className="text-right shrink-0">
          {hasSavings ? (
            <>
              <div
                className="text-lg font-black text-[var(--accent)]"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                -{formatCurrencyFull(rec.monthlySavings)}/mo
              </div>
              <div className="text-xs text-[var(--text-dim)]">
                -{formatCurrencyFull(rec.annualSavings)}/yr
              </div>
            </>
          ) : (
            <div className="text-sm font-semibold text-[var(--text-muted)]">
              Optimal ✓
            </div>
          )}
        </div>
      </div>

      {/* Reason */}
      <p className="text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-3">
        {rec.reason}
      </p>

      {/* Current → recommended spend */}
      <div className="mt-2 flex items-center gap-1 text-xs text-[var(--text-dim)]">
        <span>Current:</span>
        <span className="font-mono">{formatCurrencyFull(rec.currentSpend)}/mo</span>
        {hasSavings && (
          <>
            <span>→</span>
            <span className="font-mono text-[var(--accent)]">{afterPrice}</span>
          </>
        )}
      </div>
    </div>
  );
}