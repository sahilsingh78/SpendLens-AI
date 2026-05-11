"use client";

import { useState } from "react";

import { APP_URL } from "@/lib/constants";

interface ShareAuditProps {
  auditId: string;
}

export default function ShareAudit({
  auditId,
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

  const tweetText =
    encodeURIComponent(
      `Just audited my AI tool stack with SpendLens — found real savings. Free 2-min audit: ${url}`
    );

  const twitterUrl =
    `https://twitter.com/intent/tweet?text=${tweetText}`;

  const linkedinUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;

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
        Anyone with this link can
        view your savings breakdown
        — no login required.
      </p>

      {/* Copy Link */}

      <div className="mb-3 flex gap-2">

        <div className="flex-1 truncate rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 font-mono text-xs text-[var(--text-muted)]">
          {url}
        </div>

        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy audit link"
          className="shrink-0 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-xs font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {copied
            ? "Copied ✓"
            : "Copy"}
        </button>

      </div>

      {/* Share Buttons */}

      <div className="flex gap-2">

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share audit on X"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-center text-xs font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >

          <span>𝕏</span>

          <span>
            Share on X
          </span>

        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share audit on LinkedIn"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-center text-xs font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >

          <span>in</span>

          <span>
            Share on LinkedIn
          </span>

        </a>

      </div>

      <p className="mt-3 text-xs text-[var(--text-dim)]">

        🔒 Personal details (email, company) are never shown in shared links.

      </p>

    </div>
  );
}