interface PricingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PricingInput({
  value,
  onChange,
}: PricingInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Monthly spend
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          $
        </span>

        <input
          type="number"
          min={0}
          step={1}
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          placeholder="20"
          className="w-full pl-8 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <p className="text-xs text-[var(--text-dim)] mt-2">
        Estimated monthly subscription cost
      </p>
    </div>
  );
}