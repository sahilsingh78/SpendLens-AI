"use client";
import { useState, useEffect, useCallback } from "react";
import { safeJsonParse } from "@/lib/helpers";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setValue(safeJsonParse(item, initialValue));
      }
    } catch {
      // Private browsing or storage blocked
    }
    setIsHydrated(true);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof newValue === "function" ? (newValue as (p: T) => T)(prev) : newValue;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Quota exceeded — still update state
        }
        return next;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return { value, set, remove, isHydrated } as const;
}