"use client";

import { UseCase } from "@/lib/types";

const USE_CASES: { value: UseCase; label: string }[] = [
  { value: "coding", label: "Software Development" },
  { value: "writing", label: "Writing & Content" },
  { value: "data", label: "Data Analysis" },
  { value: "research", label: "Research" },
  { value: "mixed", label: "Mixed / General" },
];

interface UseCaseSelectProps {
  value?: UseCase;
  onChange: (value: UseCase) => void;
}

export default function UseCaseSelect({ value, onChange }: UseCaseSelectProps) {
  return (
    <div>
      <label htmlFor="use-case" className="block text-sm font-medium mb-2">
        Primary use case
      </label>
      <select
        id="use-case"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value as UseCase)}
        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] outline-none focus:border-[var(--accent)] transition-colors"
      >
        <option value="">Select use case</option>
        {USE_CASES.map((uc) => (
          <option key={uc.value} value={uc.value}>
            {uc.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-[var(--text-dim)] mt-2">
        Helps generate more accurate recommendations
      </p>
    </div>
  );
}