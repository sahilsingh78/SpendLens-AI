// Benchmark data for AI spend comparisons
// Approximate industry benchmark estimates

export interface BenchmarkEntry {
  stage: string;
  employeeRange: string;
  avgSpendPerDevPerMonth: number;
  avgTotalAISpendPerMonth: number;
  p25: number;
  p75: number;
  topTools: string[];
}

export const BENCHMARKS: BenchmarkEntry[] = [
  {
    stage: "Solo / Indie",
    employeeRange: "1",
    avgSpendPerDevPerMonth: 40,
    avgTotalAISpendPerMonth: 40,
    p25: 20,
    p75: 100,
    topTools: [
      "ChatGPT Plus",
      "Claude Pro",
      "GitHub Copilot Individual",
    ],
  },

  {
    stage: "Early Startup",
    employeeRange: "2–10",
    avgSpendPerDevPerMonth: 75,
    avgTotalAISpendPerMonth: 300,
    p25: 40,
    p75: 200,
    topTools: [
      "Cursor Pro",
      "ChatGPT Team",
      "Claude Pro",
    ],
  },

  {
    stage: "Growth Startup",
    employeeRange: "11–50",
    avgSpendPerDevPerMonth: 110,
    avgTotalAISpendPerMonth: 1800,
    p25: 60,
    p75: 300,
    topTools: [
      "Cursor Business",
      "GitHub Copilot Business",
      "Claude Team",
    ],
  },

  {
    stage: "Scale-up",
    employeeRange: "51–200",
    avgSpendPerDevPerMonth: 130,
    avgTotalAISpendPerMonth: 8000,
    p25: 80,
    p75: 400,
    topTools: [
      "GitHub Copilot Enterprise",
      "ChatGPT Enterprise",
      "Anthropic API",
    ],
  },

  {
    stage: "Enterprise",
    employeeRange: "200+",
    avgSpendPerDevPerMonth: 90,
    avgTotalAISpendPerMonth: 25000,
    p25: 50,
    p75: 250,
    topTools: [
      "OpenAI API",
      "Anthropic API",
      "GitHub Copilot Enterprise",
    ],
  },
];

export function getBenchmarkForTeamSize(
  teamSize: number
): BenchmarkEntry {
  if (teamSize <= 1) {
    return BENCHMARKS[0];
  }

  if (teamSize <= 10) {
    return BENCHMARKS[1];
  }

  if (teamSize <= 50) {
    return BENCHMARKS[2];
  }

  if (teamSize <= 200) {
    return BENCHMARKS[3];
  }

  return BENCHMARKS[4];
}

export function getSpendPercentile(
  spendPerDev: number,
  benchmark: BenchmarkEntry
): string {
  if (spendPerDev < benchmark.p25) {
    return "bottom 25%";
  }

  if (spendPerDev < benchmark.avgSpendPerDevPerMonth) {
    return "below average";
  }

  if (spendPerDev < benchmark.p75) {
    return "above average";
  }

  return "top 25%";
}

export function getBenchmarkSummary(
  totalSpend: number,
  teamSize: number
) {
  const benchmark = getBenchmarkForTeamSize(teamSize);

  const spendPerDev =
    totalSpend / Math.max(teamSize, 1);

  const percentile = getSpendPercentile(
    spendPerDev,
    benchmark
  );

  return {
    benchmark,
    spendPerDev,
    percentile,
    isAboveAverage:
      spendPerDev >
      benchmark.avgSpendPerDevPerMonth,

    isBelowAverage:
      spendPerDev <
      benchmark.avgSpendPerDevPerMonth,
  };
}