import Loader from "@/components/shared/Loader";

export default function AuditLoadingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>

            <div>
              <div
                className="text-xl font-black"
                style={{
                  fontFamily:
                    "Syne, sans-serif",
                }}
              >
                Generating audit
              </div>

              <p className="text-sm text-[var(--text-muted)]">
                Analyzing your AI stack…
              </p>
            </div>
          </div>

          {/* Loader */}
          <div className="flex items-center justify-center py-8">
            <Loader
              size="lg"
              label="Running pricing analysis"
            />
          </div>

          {/* Skeleton blocks */}
          <div className="space-y-4">
            <div className="h-24 rounded-2xl shimmer" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 rounded-2xl shimmer" />
              <div className="h-32 rounded-2xl shimmer" />
            </div>

            <div className="h-40 rounded-2xl shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}