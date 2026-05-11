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
  id?: string;

  value?: ToolId;

  onChange: (
    id: ToolId
  ) => void;

  disabledIds?: ToolId[];
}

export default function ToolSelector({
  id,
  value,
  onChange,
  disabledIds = [],
}: ToolSelectorProps) {

  return (

    <div className="flex h-full flex-col">

      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
      >
        Tool
      </label>

      <select
        id={id}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value as ToolId
          )
        }
        className="h-14 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 outline-none transition-colors focus:border-[var(--accent)]"
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

      <p className="mt-2 text-xs leading-5 text-[var(--text-dim)]">

        Choose the AI tool currently
        used by your team

      </p>

    </div>
  );
}