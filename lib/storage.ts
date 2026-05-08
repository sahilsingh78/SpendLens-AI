import { AuditResult } from "@/lib/types";

const STORAGE_KEY = "spendlens_audits";
const MAX_STORED = 10;

export function saveAuditLocally(audit: AuditResult): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalAudits();
    const updated = [audit, ...existing.filter((a) => a.id !== audit.id)].slice(
      0,
      MAX_STORED
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage quota exceeded or private browsing — fail silently
  }
}

export function getLocalAudits(): AuditResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AuditResult[];
  } catch {
    return [];
  }
}

export function clearLocalAudits(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getLatestLocalAudit(): AuditResult | null {
  const audits = getLocalAudits();
  return audits[0] ?? null;
}