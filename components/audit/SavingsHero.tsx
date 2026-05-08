"use client";
import { AuditResult } from "@/lib/types";
import { formatCurrencyFull, getTierLabel, getTierColor } from "@/lib/helpers";
import { CREDEX_CONSULT_URL } from "@/lib/constants";

interface SavingsHeroProps {
  audit: AuditResult;
}

export default function SavingsHero({ audit }: SavingsHeroProps) {
  const { totalMonthlySavings, totalAnnualSavings, totalMonthlySpend, savingsPercentage, tier } = audit;
  const isOptimal = totalMonthlySavings === 0;
  const isHigh = totalMonthlySavings >= 500;
  const tierColor = getTierColor(tier);

  return (
    <div className="relative overflow-hidden rounded-2xl border p-8 text-center"
      style={{ borderColor: tierColor + "40", background: `linear-gradient(135deg, ${tierColor}08 0%, transparent 60%)` }}
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-[60px] pointer-events-none"
        style={{ background: tierColor + "20" }}
      />

      <div className="relative">
        {/* Tier badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono mb-6"
          style={{ borderColor: tierColor + "40", color: tierColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: tierColor }} />
          {getTierLabel(tier)}
        </div>

        {isOptimal ? (
          <>
            <div className="text-5xl mb-3">✅</div>
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
              You&apos;re spending efficiently
            </h2>
            <p className="text-[var(--text-muted)] text-sm">
              {formatCurrencyFull(totalMonthlySpend)}/month · No major savings identified
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)] mb-1">Monthly savings identified</p>
            <div
              className="text-6xl md:text-7xl font-black mb-2 animate-count-up"
              style={{ fontFamily: "Syne, sans-serif", color: tierColor }}
            >
              {formatCurrencyFull(totalMonthlySavings)}
              <span className="text-2xl text-[var(--text-dim)] font-normal">/mo</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm mb-1">
              {formatCurrencyFull(totalAnnualSavings)}/year · {savingsPercentage}% of current spend
            </p>
            <p className="text-xs text-[var(--text-dim)]">
              Current: {formatCurrencyFull(totalMonthlySpend)}/mo across {audit.input.tools.length} tool{audit.input.tools.length > 1 ? "s" : ""}
            </p>
          </>
        )}

        {/* Credex CTA for high savings */}
        {isHigh && (
          <div className="mt-8 p-5 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 text-left">
            <p className="text-sm font-semibold text-[var(--accent)] mb-1">
              💡 Credex can capture even more
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Discounted Anthropic & OpenAI credits at 30–40% below list. Same API, same endpoints — just cheaper.
            </p>
            <a
              href={`${CREDEX_CONSULT_URL}?ref=spendlens&savings=${totalMonthlySavings}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-black rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Book a free Credex consultation →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}