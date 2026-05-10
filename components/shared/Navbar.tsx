"use client";

import Link from "next/link";
import { CREDEX_URL } from "@/lib/constants";

interface NavbarProps {
  onStartAudit?: () => void;
}

export default function Navbar({ onStartAudit }: NavbarProps) {

  const handleAuditClick = () => {
    if (onStartAudit) {
      onStartAudit();
      return;
    }
    const section = document.getElementById("audit-form");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = "/#audit-form";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <nav
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >

        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="SpendLens home"
        >
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-black font-black text-sm transition-transform group-hover:scale-110">
            S
          </div>
          <div className="leading-tight">
            <p className="font-black text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
              SpendLens
            </p>
            <p className="text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-wide">
              AI Spend Audit
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={CREDEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            By Credex
          </a>
          <button
            type="button"
            onClick={handleAuditClick}
            aria-label="Start your free AI spend audit"
            className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-black text-sm font-bold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all glow-accent"
          >
            Audit my stack
          </button>
        </div>

      </nav>
    </header>
  );
}