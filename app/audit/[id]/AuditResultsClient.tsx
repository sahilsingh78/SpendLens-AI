"use client";

import { AuditResult } from "@/lib/types";

function formatCurrencyFull(
  value: number
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function formatPercent(
  value: number
) {
  return `${value}%`;
}

interface SavingsHeroProps {
  audit: AuditResult;
}

export default function SavingsHero({
  audit,
}: SavingsHeroProps) {
  const totalMonthlySpend =
    audit.totalMonthlySpend;

  const totalMonthlySavings =
    audit.totalMonthlySavings;

  const totalAnnualSavings =
    audit.totalAnnualSavings;

  const savingsPercentage =
    audit.savingsPercentage;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,163,0.08),transparent_35%)]" />

      <div className="relative z-10 grid gap-8 md:grid-cols-2">

        {/* Left */}

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
            Potential Optimization
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight">
            Save{" "}
            <span className="text-[var(--accent)]">
              {formatCurrencyFull(
                totalAnnualSavings
              )}
            </span>{" "}
            per year
          </h2>

          <p className="mt-4 text-[var(--text-muted)] leading-7 max-w-xl">
            Your current AI stack
            contains overlapping tools,
            underutilized seats, and
            opportunities to consolidate
            subscriptions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[var(--text-dim)]">
                Monthly Savings
              </p>

              <p className="mt-1 text-2xl font-bold text-[var(--accent)]">
                {formatCurrencyFull(
                  totalMonthlySavings
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[var(--text-dim)]">
                Savings %
              </p>

              <p className="mt-1 text-2xl font-bold">
                {formatPercent(
                  savingsPercentage
                )}
              </p>
            </div>

          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">

          <div>
            <p className="text-sm text-[var(--text-muted)]">
              Current monthly spend
            </p>

            <h3 className="mt-2 text-4xl font-black">
              {formatCurrencyFull(
                totalMonthlySpend
              )}
              <span className="text-lg font-medium text-[var(--text-muted)]">
                /mo
              </span>
            </h3>

            <p className="mt-3 text-xs text-[var(--text-dim)]">
              Current:{" "}
              {formatCurrencyFull(
                totalMonthlySpend
              )}
              /mo across{" "}
              {audit.input?.tools?.length ?? 0}{" "}
              tool
              {(audit.input?.tools?.length ?? 0) !== 1
                ? "s"
                : ""}
            </p>
          </div>

          <div className="mt-8 space-y-3">

            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">
                Estimated optimized spend
              </span>

              <span className="font-semibold">
                {formatCurrencyFull(
                  totalMonthlySpend -
                    totalMonthlySavings
                )}
                /mo
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-[var(--surface)]">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{
                  width: `${Math.min(
                    savingsPercentage,
                    100
                  )}%`,
                }}
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}