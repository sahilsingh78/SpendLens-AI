"use client";

import { useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "spendlens-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedTheme = localStorage.getItem(
        THEME_STORAGE_KEY
      ) as Theme | null;

      if (
        savedTheme === "dark" ||
        savedTheme === "light"
      ) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
        return;
      }

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialTheme: Theme = prefersDark
        ? "dark"
        : "light";

      setThemeState(initialTheme);
      applyTheme(initialTheme);

    } catch {
      // Fallback to dark mode
      applyTheme("dark");
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(
          THEME_STORAGE_KEY,
          newTheme
        );
      } catch {
        // Ignore localStorage failures
      }

      setThemeState(newTheme);
      applyTheme(newTheme);
    },
    []
  );

  const toggleTheme = useCallback(() => {
    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}