"use client";
import { useEffect, useState } from "react";
import { AuditResult } from "@/lib/types";
import Loader from "@/components/shared/Loader";

interface AIInsightCardProps {
  audit: AuditResult;
}

export default function AIInsightCard({ audit }: AIInsightCardProps) {
  const [summary, setSummary] = useState<string | null>(audit.aiSummary ?? null);
  const [loading, setLoading] = useState(!audit.aiSummary);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audit.aiSummary) return;
    let cancelled = false;

    async function fetchSummary() {
      try {
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(audit),
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (!cancelled) setSummary(data.summary);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSummary();
    return () => { cancelled = true; };
  }, [audit]);

  return (
    <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />

      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-xs">
          🤖
        </div>
        <h3 className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
          AI insight
        </h3>
        <span className="text-xs text-[var(--text-dim)] font-mono ml-auto">claude-3-5-haiku</span>
      </div>

      {loading && (
        <div className="flex items-center gap-3 py-4">
          <Loader size="sm" label="" />
          <span className="text-sm text-[var(--text-muted)] animate-pulse">
            Generating your personalized summary…
          </span>
        </div>
      )}

      {error && !loading && (
        <p className="text-sm text-[var(--text-muted)] italic">
          AI summary unavailable — all audit data above is still accurate and complete.
        </p>
      )}

      {summary && !loading && (
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{summary}</p>
      )}
    </div>
  );
}