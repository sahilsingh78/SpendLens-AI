interface SeatCounterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SeatCounter({
  value,
  onChange,
}: SeatCounterProps) {
  function increment() {
    onChange(value + 1);
  }

  function decrement() {
    if (value > 1) {
      onChange(value - 1);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Seats / licenses
      </label>

      <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">

        <button
          type="button"
          onClick={decrement}
          className="w-12 h-12 text-lg text-[var(--text-muted)] hover:bg-[var(--surface)] transition-colors"
        >
          −
        </button>

        <div className="flex-1 text-center font-semibold">
          {value}
        </div>

        <button
          type="button"
          onClick={increment}
          className="w-12 h-12 text-lg text-[var(--text-muted)] hover:bg-[var(--surface)] transition-colors"
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