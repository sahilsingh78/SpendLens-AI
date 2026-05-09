"use client";

interface SeatCounterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SeatCounter({
  value,
  onChange,
}: SeatCounterProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Seats / licenses
      </label>

      <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
        <button
          type="button"
          onClick={() => {
            if (value > 1) onChange(value - 1);
          }}
          className="w-12 h-12 text-lg text-[var(--text-muted)] hover:bg-[var(--surface)] transition-colors"
          aria-label="Decrease seats"
        >
          −
        </button>

        <input
          type="number"
          min={1}
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange(1);
              return;
            }
            const parsed = parseInt(raw, 10);
            if (!isNaN(parsed) && parsed >= 1) {
              onChange(parsed);
            }
          }}
          onBlur={(e) => {
            if (!e.target.value || parseInt(e.target.value) < 1) {
              onChange(1);
            }
          }}
          className="flex-1 text-center font-semibold bg-transparent border-none outline-none py-3"
        />

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-12 h-12 text-lg text-[var(--text-muted)] hover:bg-[var(--surface)] transition-colors"
          aria-label="Increase seats"
        >
          +
        </button>
      </div>

      <p className="text-xs text-[var(--text-dim)] mt-2">
        Number of active team members
      </p>
    </div>
  );
}