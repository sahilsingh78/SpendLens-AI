interface EmailConfirmationProps {
  email: string;
}

export default function EmailConfirmation({
  email,
}: EmailConfirmationProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">

        <div className="w-11 h-11 rounded-xl bg-[var(--accent)] text-black flex items-center justify-center font-black text-lg">
          ✓
        </div>

        <div>
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Report requested
          </h3>

          <p className="text-sm text-[var(--text-muted)]">
            Confirmation sent successfully
          </p>
        </div>
      </div>

      {/* Email Info */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 mb-5">

        <p className="text-xs text-[var(--text-muted)] mb-1">
          Report will be delivered to:
        </p>

        <p className="font-medium break-all">
          {email}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-muted)] leading-7">
        We’re generating your personalized AI spend
        optimization summary with additional cost-saving
        recommendations and benchmark insights.
      </p>
    </div>
  );
}