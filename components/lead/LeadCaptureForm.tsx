"use client";
import { useState } from "react";
import Loader from "@/components/shared/Loader";

interface LeadCaptureFormProps {
  auditId: string;
  monthlySavings: number;
  onSuccess: (email: string) => void;
}

export default function LeadCaptureForm({ auditId, monthlySavings, onSuccess }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // honeypot

  const isHighSavings = monthlySavings >= 500;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    if (website) return; // honeypot triggered

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: company || undefined,
          role: role || undefined,
          auditId,
          monthlySavings,
          website,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Submission failed");
      }

      onSuccess(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
        {isHighSavings ? "Get your full report + Credex will reach out" : "Email me this report"}
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        {isHighSavings
          ? "We'll send the breakdown and discuss how Credex credits can capture more savings."
          : "Get the full audit in your inbox. We'll notify you when new optimizations apply to your stack."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden
          tabIndex={-1}
        />

        <div>
          <label htmlFor="lead-email" className="block text-xs text-[var(--text-muted)] mb-1.5">
            Email address *
          </label>
          <input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@startup.com"
            required
            className="w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="lead-company" className="block text-xs text-[var(--text-muted)] mb-1.5">
              Company <span className="text-[var(--text-dim)]">(optional)</span>
            </label>
            <input
              id="lead-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
              className="w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="lead-role" className="block text-xs text-[var(--text-muted)] mb-1.5">
              Role <span className="text-[var(--text-dim)]">(optional)</span>
            </label>
            <input
              id="lead-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="CTO / Founder"
              className="w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950/20 border border-red-900/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size="sm" label="" />
              Sending…
            </>
          ) : isHighSavings ? (
            "Send report + book consultation →"
          ) : (
            "Email me this report →"
          )}
        </button>

        <p className="text-xs text-[var(--text-dim)] text-center">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}