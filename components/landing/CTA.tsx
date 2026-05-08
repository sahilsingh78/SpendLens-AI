"use client";

interface CTAProps {
  onStartAudit: () => void;
}

export default function CTA({
  onStartAudit,
}: CTAProps) {
  return (
    <section className="relative py-24 px-4 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[var(--accent)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)] mb-8">

          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-accent" />

          Trusted by startup operators
        </div>

        {/* Heading */}
        <h2
          className="text-4xl md:text-6xl font-black leading-tight mb-6"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Stop wasting money
          <br />

          on AI subscriptions.
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-[var(--text-muted)] leading-8 mb-10">
          Most startups overspend on AI tooling
          without realizing it. SpendLens finds
          unnecessary upgrades, duplicated tools,
          and cheaper alternatives instantly.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <button
            onClick={onStartAudit}
            className="px-8 py-4 rounded-xl bg-[var(--accent)] text-black font-bold text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all glow-accent"
          >
            Run free audit →
          </button>

          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}