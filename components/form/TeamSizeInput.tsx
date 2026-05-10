"use client";

interface TeamSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TeamSizeInput({ value, onChange }: TeamSizeInputProps) {
  return (
    <div>
      <label htmlFor="team-size" className="block text-sm font-medium mb-2">
        Total team size
      </label>
      <input
        id="team-size"
        type="number"
        min={1}
        value={value === 0 ? "" : value}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") { onChange(0); return; }
          const parsed = parseInt(raw, 10);
          if (!isNaN(parsed) && parsed >= 1) onChange(parsed);
        }}
        onBlur={(e) => {
          if (!e.target.value || parseInt(e.target.value) < 1) onChange(1);
        }}
        placeholder="e.g. 5"
        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none focus:border-[var(--accent)] transition-colors"
      />
      <p className="text-xs text-[var(--text-dim)] mt-2">
        Used for benchmarking against similar startups
      </p>
    </div>
  );
}