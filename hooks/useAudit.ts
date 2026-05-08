"use client";
import { useState, useCallback } from "react";
import { AuditInput, AuditResult } from "@/lib/types";
import { saveAuditLocally } from "@/lib/storage";

type AuditState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: AuditResult }
  | { status: "error"; error: string };

export function useAudit() {
  const [state, setState] = useState<AuditState>({ status: "idle" });

  const runAudit = useCallback(async (input: AuditInput) => {
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Audit failed (${res.status})`);
      }

      const result: AuditResult = await res.json();
      saveAuditLocally(result);
      setState({ status: "success", result });
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setState({ status: "error", error: message });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  return {
    state,
    runAudit,
    reset,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    result: state.status === "success" ? state.result : null,
    error: state.status === "error" ? state.error : null,
  };
}