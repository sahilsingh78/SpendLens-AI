interface TeamSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TeamSizeInput({
  value,
  onChange,
}: TeamSizeInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Total team size
      </label>

      <input
        type="number"
        min={1}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        placeholder="10"
        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none focus:border-[var(--accent)] transition-colors"
      />

      <p className="text-xs text-[var(--text-dim)] mt-2">
        Used for benchmarking against similar
        startups
      </p>
    </div>
  );
}