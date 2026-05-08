interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 animate-fade-in">

      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
        <span className="text-3xl">⚠️</span>
      </div>

      <h2
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {title}
      </h2>

      <p className="text-[var(--text-muted)] max-w-md leading-7 mb-8">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}