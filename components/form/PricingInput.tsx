interface PricingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PricingInput({
  value,
  onChange,
}: PricingInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
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
          className="w-full h-[52px] pl-8 pr-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <p className="text-xs text-[var(--text-dim)] min-h-[40px]">
        Estimated monthly subscription cost
      </p>
    </div>
  );
}