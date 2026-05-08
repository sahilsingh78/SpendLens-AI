interface LoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export default function Loader({ size = "md", label = "Loading…" }: LoaderProps) {
  const dims = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-label={label}>
      <div className={`relative ${dims[size]}`}>
        <div className="absolute inset-0 rounded-full border-2 border-[var(--border)]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent)] animate-spin" />
      </div>
      {label && (
        <span className="text-xs text-[var(--text-muted)] font-mono">{label}</span>
      )}
    </div>
  );
}