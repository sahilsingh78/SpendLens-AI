import { ToolId } from "@/lib/types";

const TOOLS = [
  {
    id: "chatgpt",
    label: "ChatGPT Plus",
  },
  {
    id: "claude",
    label: "Claude Team",
  },
  {
    id: "cursor",
    label: "Cursor Pro",
  },
  {
    id: "github_copilot",
    label: "GitHub Copilot",
  },
  {
    id: "gemini",
    label: "Gemini Advanced",
  },
  {
    id: "openai_api",
    label: "OpenAI API",
  },
  {
    id: "anthropic_api",
    label: "Anthropic API",
  },
  {
    id: "windsurf",
    label: "Windsurf",
  },
] as const;

interface ToolSelectorProps {
  value?: ToolId;

  onChange: (
    id: ToolId
  ) => void;

  disabledIds?: ToolId[];
}

export default function ToolSelector({
  value,
  onChange,
  disabledIds = [],
}: ToolSelectorProps) {

  return (
    <div className="flex flex-col h-full">

      <label className="block text-sm font-medium mb-2">
        Tool
      </label>

      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value as ToolId
          )
        }
        className="h-14 w-full px-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] outline-none focus:border-[var(--accent)] transition-colors"
      >

        <option value="">
          Select a tool
        </option>

        {TOOLS.map((tool) => (
          <option
            key={tool.id}
            value={tool.id}
            disabled={disabledIds.includes(
              tool.id
            )}
          >
            {tool.label}
          </option>
        ))}

      </select>

      <p className="text-xs text-[var(--text-dim)] mt-2 leading-5">

        Choose the AI tool currently
        used by your team

      </p>

    </div>
  );
}