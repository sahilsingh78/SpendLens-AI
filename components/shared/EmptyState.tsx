interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon = "📭",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 animate-fade-in">

      <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-5">
        <span className="text-3xl">{icon}</span>
      </div>

      <h2
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {title}
      </h2>

      {description && (
        <p className="text-[var(--text-muted)] max-w-md leading-7 mb-8">
          {description}
        </p>
      )}

      {action}
    </div>
  );
}