"use client";

interface SuccessModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export default function SuccessModal({
  open,
  title = "Report requested successfully",
  message = "Your AI spend audit report has been saved. We'll reach out shortly with deeper optimization insights.",
  onClose,
}: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 animate-fade-in">

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] text-black flex items-center justify-center mx-auto mb-6 text-3xl font-black">
          ✓
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-black text-center mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {title}
        </h2>

        {/* Message */}
        <p className="text-[var(--text-muted)] text-center leading-7 mb-8">
          {message}
        </p>

        {/* Action */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-bold hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
      </div>
    </div>
  );
}