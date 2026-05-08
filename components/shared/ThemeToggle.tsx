"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const {
    theme,
    toggleTheme,
    mounted,
  } = useTheme();

  if (!mounted) {
    return (
      <button
        className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        aria-label="Loading theme"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center hover:border-[var(--accent)] transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[var(--text-muted)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--text-muted)]" />
      )}
    </button>
  );
}