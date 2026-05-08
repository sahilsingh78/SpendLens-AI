"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ToolInput } from "@/lib/types";

interface SpendPieChartProps {
  tools: ToolInput[];
}

const COLORS = [
  "#00ff88",
  "#00c2ff",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
];

export default function SpendPieChart({
  tools,
}: SpendPieChartProps) {
  const data = tools.map((tool) => ({
    name: tool.name,
    value: tool.monthlySpend,
  }));

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

      <div className="mb-5">
        <h3
          className="text-sm font-semibold"
          style={{
            fontFamily: "Syne, sans-serif",
          }}
        >
          Current spend allocation
        </h3>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          Distribution across tools
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}