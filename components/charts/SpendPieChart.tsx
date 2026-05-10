"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ToolEntry } from "@/lib/types";

interface SpendPieChartProps {
  tools: ToolEntry[];
}

const COLORS = ["#00ff88", "#00c2ff", "#8b5cf6", "#f59e0b", "#ef4444", "#14b8a6"];

export default function SpendPieChart({ tools }: SpendPieChartProps) {
  const data = tools
    .filter((tool) => tool.monthlySpend > 0)
    .map((tool) => ({ name: tool.name, value: tool.monthlySpend }));

  if (data.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
          Current spend allocation
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Distribution across tools
        </p>
      </div>
      <div role="img" aria-label="Pie chart showing AI spend distribution" className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                fontSize: 12,
              }}
              labelStyle={{ color: "#f5f5f5" }}
              itemStyle={{ color: "#f5f5f5" }}
              formatter={(value: number) => [`$${value}/mo`, ""]}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#a0a0a0", fontSize: 11 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}