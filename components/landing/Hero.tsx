"use client";

interface HeroProps {
  onStartAudit: () => void;
}

const TICKER_ITEMS = [
  "Cursor Pro · $20/seat",
  "Claude Team · $30/seat",
  "GitHub Copilot Business · $19/seat",
  "ChatGPT Plus · $20/seat",
  "Windsurf Pro · $15/seat",
  "Gemini Advanced · $20/seat",
  "OpenAI API · pay-per-token",
  "Anthropic API · pay-per-token",
];

export default function Hero({ onStartAudit }: HeroProps) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-4">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)] mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse-accent" />
          Free · No login · 2 minutes
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 animate-fade-in"
          style={{ fontFamily: "Syne, sans-serif", animationDelay: "0.1s" }}
        >
          Your AI stack is{" "}
          <span className="text-[var(--accent)] text-glow">probably</span>
          <br />
          overcharging you.
        </h1>

        <p
          className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Paste in what you pay for Cursor, Claude, Copilot, ChatGPT. Get an instant
          audit — what to downgrade, what to switch, and exactly how much you save.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={onStartAudit}
            className="px-8 py-4 bg-[var(--accent)] text-black rounded-xl font-bold text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all glow-accent"
            aria-label="Start your free AI spend audit"
          >
            Audit my AI spend — free →
          </button>
          <a
            href="#how-it-works"
            className="px-8 py-4 border border-[var(--border)] rounded-xl text-sm text-[var(--text-muted)] hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
          >
            How it works
          </a>
        </div>

        {/* Ticker */}
        <div className="ticker-wrap border-y border-[var(--border)] py-3 -mx-4">
          <div className="ticker-inner gap-8">
            {items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-6 text-xs text-[var(--text-dim)] font-mono"
              >
                <span className="text-[var(--accent)] opacity-60">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}