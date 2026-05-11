"use client";

import { useState } from "react";

import { ToolEntry, ToolId, UseCase } from "@/lib/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import ToolSelector from "./ToolSelector";
import PricingInput from "./PricingInput";
import SeatCounter from "./SeatCounter";
import UseCaseSelect from "./UseCaseSelect";
import TeamSizeInput from "./TeamSizeInput";

import { TOOL_CONFIGS } from "@/data/pricing-data";

import Loader from "@/components/shared/Loader";

const DEFAULT_TOOL: ToolEntry = {
  toolId: "cursor",
  name: "Cursor",
  currentPlan: "pro",
  plan: "pro",
  seats: 1,
  monthlySpend: 20,
};

interface SpendFormProps {
  onSubmit: (data: {
    tools: ToolEntry[];
    teamSize: number;
    useCase: UseCase;
  }) => Promise<void>;
    isLoading: boolean;
}

export default function SpendForm({
  onSubmit,
  isLoading,
}: SpendFormProps) {

  const {
    value: savedTools,
    set: setSavedTools,
  } = useLocalStorage<ToolEntry[]>(
    "spendlens_form_tools",
    [{ ...DEFAULT_TOOL }]
  );

  const {
    value: savedTeamSize,
    set: setSavedTeamSize,
  } = useLocalStorage<number>(
    "spendlens_form_teamsize",
    5
  );

  const {
    value: savedUseCase,
    set: setSavedUseCase,
  } = useLocalStorage<UseCase>(
    "spendlens_form_usecase",
    "coding"
  );

  const [tools, setTools] =
    useState<ToolEntry[]>(savedTools);

  const [teamSize, setTeamSize] =
    useState<number>(savedTeamSize);

  const [useCase, setUseCase] =
    useState<UseCase>(savedUseCase);

  const [error, setError] =
    useState<string | null>(null);

  const usedToolIds =
    tools.map((tool) => tool.toolId);

  function updateTool(
    index: number,
    updates: Partial<ToolEntry>
  ) {

    const next = tools.map((tool, i) =>
      i === index
        ? {
            ...tool,
            ...updates,
          }
        : tool
    );

    setTools(next);
    setSavedTools(next);
  }

  function addTool() {

    const unusedTool =
      TOOL_CONFIGS.find(
        (config) =>
          !usedToolIds.includes(
            config.id as ToolId
          )
      );

    if (!unusedTool) return;

    const defaultPlan =
      unusedTool.plans[1] ??
      unusedTool.plans[0];

    const newTool: ToolEntry = {
      toolId:
        unusedTool.id as ToolId,
      name: unusedTool.name,
      currentPlan:
        defaultPlan.id,
      plan: defaultPlan.id,
      seats: 1,
      monthlySpend:
        defaultPlan.pricePerSeatPerMonth,
    };

    const next = [
      ...tools,
      newTool,
    ];

    setTools(next);
    setSavedTools(next);
  }

  function removeTool(index: number) {

    const next = tools.filter(
      (_, i) => i !== index
    );

    setTools(next);
    setSavedTools(next);
  }

  function getPlansForTool(
    toolId: ToolId
  ) {

    return (
      TOOL_CONFIGS.find(
        (config) =>
          config.id === toolId
      )?.plans ?? []
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError(null);

    if (tools.length === 0) {

      setError(
        "Add at least one AI tool to audit."
      );

      return;
    }

    try {

      await onSubmit({
        tools,
        teamSize,
        useCase,
      });

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >

      {/* Team Section */}

      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

        <div>

          <p className="mb-2 font-mono uppercase tracking-widest text-[var(--accent)] text-xs">
            Team context
          </p>

          <h2
            className="text-lg font-bold"
            style={{
              fontFamily:
                "Syne, sans-serif",
            }}
          >
            Tell us about your team
          </h2>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div>

            <TeamSizeInput
              value={teamSize}
              onChange={(value) => {

                setTeamSize(value);

                setSavedTeamSize(
                  value
                );
              }}
            />

          </div>

          <div>

            <label
              htmlFor="primary-use-case"
              className="mb-1.5 block text-xs text-[var(--text-muted)]"
            >
              Primary use case
            </label>

            <UseCaseSelect
              id="primary-use-case"
              value={useCase}
              onChange={(value) => {

                setUseCase(value);

                setSavedUseCase(
                  value
                );
              }}
            />

          </div>

        </div>

      </div>

      {/* Tools */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="mb-1 font-mono uppercase tracking-widest text-[var(--accent)] text-xs">
              Tool stack
            </p>

            <h2
              className="text-lg font-bold"
              style={{
                fontFamily:
                  "Syne, sans-serif",
              }}
            >
              AI tools you pay for
            </h2>

          </div>

          <span className="text-xs text-[var(--text-dim)]">
            {tools.length}/8 tools
          </span>

        </div>

        {tools.map((tool, index) => {

          const plans =
            getPlansForTool(
              tool.toolId
            );

          return (

            <div
              key={`${tool.toolId}-${index}`}
              className="card-hover animate-fade-in rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >

              {/* Row 1 */}

              <div className="mb-3 grid grid-cols-2 gap-3">

                {/* Tool */}

                <div className="flex flex-col gap-1.5">

                  <label
                    htmlFor={`tool-select-${index}`}
                    className="text-xs text-[var(--text-muted)]"
                  >
                    Tool
                  </label>

                  <ToolSelector
                    id={`tool-select-${index}`}
                    value={tool.toolId}
                    disabledIds={usedToolIds.filter(
                      (_, i) => i !== index
                    )}
                    onChange={(id) => {

                      const config =
                        TOOL_CONFIGS.find(
                          (c) =>
                            c.id === id
                        );

                      if (!config)
                        return;

                      const defaultPlan =
                        config.plans[1] ??
                        config.plans[0];

                      updateTool(
                        index,
                        {
                          toolId:
                            id,
                          name:
                            config.name,
                          currentPlan:
                            defaultPlan.id,
                          plan:
                            defaultPlan.id,
                          monthlySpend:
                            defaultPlan.pricePerSeatPerMonth,
                        }
                      );
                    }}
                  />

                </div>

                {/* Plan */}

                <div className="flex flex-col gap-1.5">

                  <label
                    htmlFor={`plan-select-${index}`}
                    className="text-xs text-[var(--text-muted)]"
                  >
                    Plan
                  </label>

                  <select
                    id={`plan-select-${index}`}
                    value={tool.plan}
                    onChange={(e) => {

                      const selectedPlan =
                        plans.find(
                          (p) =>
                            p.id ===
                            e.target
                              .value
                        );

                      if (!selectedPlan)
                        return;

                      updateTool(
                        index,
                        {
                          currentPlan:
                            selectedPlan.id,
                          plan:
                            selectedPlan.id,
                          monthlySpend:
                            selectedPlan.pricePerSeatPerMonth *
                            tool.seats,
                        }
                      );
                    }}
                    className="h-[42px] w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)]"
                  >

                    {plans.map(
                      (plan) => (

                        <option
                          key={plan.id}
                          value={plan.id}
                        >
                          {plan.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

              </div>

              {/* Row 2 */}

              <div className="grid grid-cols-2 gap-3">

                <SeatCounter
                  value={tool.seats}
                  onChange={(value) => {

                    const currentPlan =
                      plans.find(
                        (p) =>
                          p.id ===
                          tool.plan
                      );

                    updateTool(
                      index,
                      {
                        seats:
                          value,
                        monthlySpend:
                          (
                            currentPlan?.pricePerSeatPerMonth ??
                            0
                          ) *
                          value,
                      }
                    );
                  }}
                />

                <PricingInput
                  value={
                    tool.monthlySpend
                  }
                  onChange={(value) =>
                    updateTool(
                      index,
                      {
                        monthlySpend:
                          value,
                      }
                    )
                  }
                />

              </div>

              {/* Footer */}

              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">

                <div className="text-xs text-[var(--text-dim)]">

                  Current plan:

                  <span className="ml-1 capitalize text-[var(--text-muted)]">
                    {tool.plan}
                  </span>

                </div>

                {tools.length > 1 && (

                  <button
                    type="button"
                    onClick={() =>
                      removeTool(
                        index
                      )
                    }
                    className="text-xs text-red-400 transition-colors hover:text-red-300"
                  >
                    Remove
                  </button>

                )}

              </div>

            </div>
          );
        })}

        {tools.length < 8 && (

          <button
            type="button"
            onClick={addTool}
            className="w-full rounded-2xl border border-dashed border-[var(--border-light)] py-3 text-sm text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            + Add another AI tool
          </button>

        )}

      </div>

      {error && (

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
          {error}
        </div>

      )}

      <button
        type="submit"
        disabled={isLoading}
        className="glow-accent w-full rounded-2xl bg-[var(--accent)] py-4 text-sm font-bold text-black transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >

        {isLoading ? (

          <div className="flex items-center justify-center gap-3">

            <Loader
              size="sm"
              label=""
            />

            <span>
              Auditing your stack...
            </span>

          </div>

        ) : (
          "Run AI Spend Audit →"
        )}

      </button>

    </form>
  );
}