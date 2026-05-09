"use client";
import { useState } from "react";
import { APP_URL } from "@/lib/constants";

interface ShareAuditProps {
  auditId: string;
}

export default function ShareAudit({ auditId }: ShareAuditProps) {
  const url = `${APP_URL}/audit/${auditId}`;
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <h3
        className="text-sm font-semibold mb-1"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Share this audit
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Anyone with this link can view your savings breakdown — no login required.
      </p>

      <div className="flex gap-2">
        <div className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text-muted)] font-mono truncate">
          {url}
        </div>
        <button
          onClick={copyLink}
          className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shrink-0"
          aria-label="Copy audit link"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <p className="text-xs text-[var(--text-dim)] mt-3">
        🔒 Personal details (email, company) are never shown in shared links.
      </p>
    </div>
  );
}