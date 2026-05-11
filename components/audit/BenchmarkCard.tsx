import { ShareableAudit } from "@/lib/types";
import { formatCurrencyFull } from "@/lib/helpers";

interface BenchmarkData {
  stage: string;
  avgSpendPerDevPerMonth: number;
  p25: number;
  p75: number;
}

function getBenchmark(teamSize: number): BenchmarkData {
  if (teamSize === 1) return { stage: "Solo / Indie", avgSpendPerDevPerMonth: 40, p25: 20, p75: 100 };
  if (teamSize <= 10) return { stage: "Early Startup", avgSpendPerDevPerMonth: 75, p25: 40, p75: 200 };
  if (teamSize <= 50) return { stage: "Growth Startup", avgSpendPerDevPerMonth: 110, p25: 60, p75: 300 };
  if (teamSize <= 200) return { stage: "Scale-up", avgSpendPerDevPerMonth: 130, p25: 80, p75: 400 };
  return { stage: "Enterprise", avgSpendPerDevPerMonth: 90, p25: 50, p75: 250 };
}

function getPercentileLabel(spendPerDev: number, benchmark: BenchmarkData): { label: string; color: string } {
  if (spendPerDev < benchmark.p25) return { label: "bottom 25% — well below average", color: "#00ff88" };
  if (spendPerDev < benchmark.avgSpendPerDevPerMonth) return { label: "below average", color: "#4499ff" };
  if (spendPerDev < benchmark.p75) return { label: "above average", color: "#ffaa00" };
  return { label: "top 25% — significantly above average", color: "#ff4444" };
}

interface BenchmarkCardProps {
  audit: ShareableAudit;
}

export default function BenchmarkCard({ audit }: BenchmarkCardProps) {
  const benchmark = getBenchmark(audit.teamSize);
  const spendPerDev = audit.teamSize > 0
    ? Math.round(audit.totalMonthlySpend / audit.teamSize)
    : audit.totalMonthlySpend;

  const { label, color } = getPercentileLabel(spendPerDev, benchmark);

  // Calculate position on bar (0-100%)
  const maxBar = benchmark.p75 * 1.5;
  const yourPosition = Math.min(100, (spendPerDev / maxBar) * 100);
  const avgPosition = Math.min(100, (benchmark.avgSpendPerDevPerMonth / maxBar) * 100);

  return (
    <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
          Benchmark comparison
        </h3>
        <span className="text-xs text-[var(--text-dim)] font-mono px-2 py-0.5 rounded-full border border-[var(--border)]">
          {benchmark.stage}
        </span>
      </div>
      <p className="text-xs text-[var(--text-muted)] mb-5">
        How your AI spend compares to similar companies
      </p>

      {/* Main comparison */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] mb-1">Your spend/dev</p>
          <p className="text-xl font-black" style={{ color }}>
            {formatCurrencyFull(spendPerDev)}<span className="text-xs font-normal text-[var(--text-dim)]">/mo</span>
          </p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] mb-1">Peer average</p>
          <p className="text-xl font-black text-[var(--text)]">
            {formatCurrencyFull(benchmark.avgSpendPerDevPerMonth)}<span className="text-xs font-normal text-[var(--text-dim)]">/mo</span>
          </p>
        </div>
      </div>

      {/* Visual bar */}
      <div className="mb-3">
        <div className="relative h-2 bg-[var(--surface-2)] rounded-full border border-[var(--border)] overflow-visible">
          {/* Average marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[var(--text-dim)] rounded-full"
            style={{ left: `${avgPosition}%` }}
            title={`Peer average: ${formatCurrencyFull(benchmark.avgSpendPerDevPerMonth)}/mo`}
          />
          {/* Your position */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[var(--bg)]"
            style={{ left: `${yourPosition}%`, background: color, transform: "translate(-50%, -50%)" }}
            title={`Your spend: ${formatCurrencyFull(spendPerDev)}/mo`}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-[var(--text-dim)]">
          <span>{formatCurrencyFull(0)}</span>
          <span>avg {formatCurrencyFull(benchmark.avgSpendPerDevPerMonth)}</span>
          <span>{formatCurrencyFull(Math.round(maxBar))}</span>
        </div>
      </div>

      <p className="text-xs" style={{ color }}>
        You are in the <strong>{label}</strong> for {benchmark.stage.toLowerCase()} companies.
      </p>
    </div>
  );
}