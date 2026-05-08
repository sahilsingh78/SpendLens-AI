import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] bg-grid px-4">

      <div className="max-w-xl w-full text-center animate-fade-in">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl border border-[var(--border)] bg-[var(--surface)] mb-8">
          <span className="text-5xl">⚠️</span>
        </div>

        {/* Error code */}
        <p className="text-[var(--accent)] text-sm font-mono-custom mb-3">
          ERROR 404
        </p>

        {/* Title */}
        <h1
          className="text-5xl md:text-6xl font-black mb-6 text-[var(--text)]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Audit not found
        </h1>

        {/* Description */}
        <p className="text-[var(--text-muted)] text-lg leading-8 mb-10">
          This audit link may have expired,
          been removed, or never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/"
            className="px-8 py-3 rounded-xl bg-[var(--accent)] text-black font-bold hover:opacity-90 transition-all hover:scale-[1.02]"
          >
            Run new audit →
          </Link>

          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] transition-colors"
          >
            Visit Credex
          </a>
        </div>
      </div>
    </div>
  );
}