import { AuditResult } from "@/lib/types";
import {
  formatCurrencyFull,
  getTierColor,
  getTierLabel,
} from "@/lib/helpers";

interface AuditCardProps {
  audit: AuditResult;
}

export default function AuditCard({
  audit,
}: AuditCardProps) {
  const tierColor = getTierColor(audit.tier);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20 pointer-events-none"
        style={{
          background: tierColor,
        }}
      />

      <div className="relative">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">

          <div>
            <p className="text-xs text-[var(--text-dim)] font-mono uppercase tracking-wider mb-2">
              Audit Summary
            </p>

            <h2
              className="text-2xl font-black"
              style={{
                fontFamily: "Syne, sans-serif",
              }}
            >
              {audit.input.companyName ??
                "AI Spend Audit"}
            </h2>
          </div>

          {/* Tier */}
          <div
            className="px-3 py-1 rounded-full border text-xs font-medium"
            style={{
              borderColor: `${tierColor}40`,
              color: tierColor,
              background: `${tierColor}10`,
            }}
          >
            {getTierLabel(audit.tier)}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <p className="text-xs text-[var(--text-dim)] mb-2">
              Current Spend
            </p>

            <div
              className="text-2xl font-black"
              style={{
                fontFamily: "Syne, sans-serif",
              }}
            >
              {formatCurrencyFull(
                audit.totalMonthlySpend
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)] mt-1">
              per month
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <p className="text-xs text-[var(--text-dim)] mb-2">
              Monthly Savings
            </p>

            <div
              className="text-2xl font-black text-[var(--accent)]"
              style={{
                fontFamily: "Syne, sans-serif",
              }}
            >
              {formatCurrencyFull(
                audit.totalMonthlySavings
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)] mt-1">
              identified
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <p className="text-xs text-[var(--text-dim)] mb-2">
              Annual Savings
            </p>

            <div
              className="text-2xl font-black"
              style={{
                fontFamily: "Syne, sans-serif",
              }}
            >
              {formatCurrencyFull(
                audit.totalAnnualSavings
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)] mt-1">
              yearly
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <p className="text-xs text-[var(--text-dim)] mb-2">
              Savings Rate
            </p>

            <div
              className="text-2xl font-black"
              style={{
                fontFamily: "Syne, sans-serif",
              }}
            >
              {audit.savingsPercentage}%
            </div>

            <p className="text-xs text-[var(--text-muted)] mt-1">
              optimization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}