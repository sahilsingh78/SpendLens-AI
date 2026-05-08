import Link from "next/link";
import { CREDEX_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10 px-4 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center text-black font-black text-xs">
            S
          </div>
          <span className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
            SpendLens
          </span>
          <span className="text-[var(--text-dim)] text-xs ml-2">by</span>
          <a
            href={CREDEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Credex
          </a>
        </div>

        <div className="flex items-center gap-6 text-xs text-[var(--text-dim)]">
          <span>Pricing verified May 2025</span>
          <Link href="/" className="hover:text-[var(--text-muted)] transition-colors">
            Run audit
          </Link>
          <a
            href={`${CREDEX_URL}/consult`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-muted)] transition-colors"
          >
            Get discounted credits
          </a>
        </div>
      </div>
    </footer>
  );
}