"use client";

import { useState } from "react";

import { APP_URL } from "@/lib/constants";

import { Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

interface ShareAuditProps {
  auditId: string;
  monthlySavings: number;
}

export default function ShareAudit({
  auditId,
  monthlySavings,
}: ShareAuditProps) {

  const url =
    `${APP_URL}/audit/${auditId}`;

  const [copied, setCopied] =
    useState(false);

  async function copyLink() {

    try {

      await navigator.clipboard.writeText(
        url
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch {

      const el =
        document.createElement("input");

      el.value = url;

      document.body.appendChild(el);

      el.select();

      document.execCommand("copy");

      document.body.removeChild(el);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  const shareText =
    `SpendLens identified $${monthlySavings}/month in potential AI tooling savings for my stack.`;

  function shareOnX() {

    const shareUrl =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(
        url
      )}`;

    window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function shareOnLinkedIn() {

    const shareUrl =
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;

    window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (

    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

      <h3
        className="mb-1 text-sm font-semibold"
        style={{
          fontFamily:
            "Syne, sans-serif",
        }}
      >
        Share this audit
      </h3>

      <p className="mb-4 text-xs text-[var(--text-muted)]">
        Anyone with this link can view your savings breakdown — no login required.
      </p>

      {/* URL + Copy */}

      <div className="flex gap-2">

        <div className="flex-1 truncate rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 font-mono text-xs text-[var(--text-muted)]">
          {url}
        </div>

        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="Copy audit link"
        >
          {copied
            ? "Copied ✓"
            : "Copy"}
        </button>

      </div>

      {/* Social Share Buttons */}

      <div className="mt-4 flex flex-wrap gap-3">

        <button
          type="button"
          onClick={shareOnX}
          aria-label="Share audit on X"
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <FaXTwitter size={14} />
          Share on X
        </button>

        <button
          type="button"
          onClick={shareOnLinkedIn}
          aria-label="Share audit on LinkedIn"
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <Linkedin size={14} />
          Share on LinkedIn
        </button>

      </div>

      <p className="mt-3 text-xs text-[var(--text-dim)]">
        🔒 Personal details (email, company) are never shown in shared links.
      </p>

    </div>
  );
}