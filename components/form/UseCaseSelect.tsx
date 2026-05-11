"use client";

import { UseCase } from "@/lib/types";

const USE_CASES: {
  value: UseCase;
  label: string;
}[] = [
  {
    value: "coding",
    label: "Software Development",
  },
  {
    value: "writing",
    label: "Writing & Content",
  },
  {
    value: "data",
    label: "Data Analysis",
  },
  {
    value: "research",
    label: "Research",
  },
  {
    value: "mixed",
    label: "Mixed / General",
  },
];

interface UseCaseSelectProps {
  id?: string;

  value?: UseCase;

  onChange: (
    value: UseCase
  ) => void;
}

export default function UseCaseSelect({
  id,
  value,
  onChange,
}: UseCaseSelectProps) {

  return (

    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
      >
        Primary use case
      </label>

      <select
        id={id}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value as UseCase
          )
        }
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition-colors focus:border-[var(--accent)]"
      >

        <option value="">
          Select use case
        </option>

        {USE_CASES.map((uc) => (

          <option
            key={uc.value}
            value={uc.value}
          >
            {uc.label}
          </option>

        ))}

      </select>

      <p className="mt-2 text-xs text-[var(--text-dim)]">

        Helps generate more accurate
        recommendations

      </p>

    </div>
  );
}