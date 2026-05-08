export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] bg-grid px-4">
      <div className="flex flex-col items-center gap-6 animate-fade-in">

        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-[var(--border-light)]" />

          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent)] animate-spin" />

          {/* Glow */}
          <div className="absolute inset-4 rounded-full bg-[var(--accent)] opacity-20 blur-xl" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2
            className="text-2xl font-black text-[var(--text)] mb-2"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            SpendLens AI
          </h2>

          <p className="text-sm text-[var(--text-muted)] font-mono-custom animate-pulse-accent">
            Running your AI spend audit...
          </p>
        </div>
      </div>
    </div>
  );
}