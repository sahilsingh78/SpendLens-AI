import { UseCase } from "@/lib/types";

const USE_CASES: UseCase[] = [
  "coding",
  "writing",
  "data",
  "research",
  "mixed",
];

interface UseCaseSelectProps {
  value?: UseCase;

  onChange: (value: UseCase) => void;
}

export default function UseCaseSelect({
  value,
  onChange,
}: UseCaseSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Primary use case
      </label>

      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value as UseCase)
        }
        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] outline-none focus:border-[var(--accent)] transition-colors"
      >
        <option value="">
          Select use case
        </option>

        {USE_CASES.map((useCase) => (
          <option
            key={useCase}
            value={useCase}
          >
            {useCase.charAt(0).toUpperCase() +
              useCase.slice(1)}
          </option>
        ))}
      </select>

      <p className="text-xs text-[var(--text-dim)] mt-2">
        Helps generate more accurate
        recommendations
      </p>
    </div>
  );
}