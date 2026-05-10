"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ToolRecommendation } from "@/lib/types";

interface SavingsChartProps {
  recommendations: ToolRecommendation[];
}

export default function SavingsChart({ recommendations }: SavingsChartProps) {
  const data = recommendations
    .filter((r) => r.monthlySavings > 0)
    .map((r) => ({ name: r.toolName, savings: r.monthlySavings }));

  if (data.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
          Monthly savings breakdown
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Per-tool optimization opportunities
        </p>
      </div>
      <div role="img" aria-label="Bar chart showing monthly savings by tool" className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888" fontSize={11} />
            <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                color: "#f5f5f5",
                fontSize: 12,
              }}
              formatter={(value: number) => [`$${value}/mo`, "Savings"]}
            />
            <Bar dataKey="savings" radius={[6, 6, 0, 0]} fill="#00ff88" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}