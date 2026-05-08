"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes, fully free. No credit card, no trial period. The audit tool is a lead-generation asset for Credex — we make money if you buy discounted AI credits, not from charging you for the audit.",
  },
  {
    q: "How is the pricing data kept current?",
    a: "Every price in the audit engine is sourced directly from vendor pricing pages (Cursor, Anthropic, OpenAI, GitHub, Google) and manually verified. The PRICING_DATA file in the repo tracks each URL and verification date. We update on every significant pricing change.",
  },
  {
    q: "What is Credex and why does it appear in my results?",
    a: "Credex sources discounted AI infrastructure credits — Anthropic, OpenAI, Cursor — from companies that overforecast their usage. If your audit shows $500+/month in API spend, Credex can often supply the same official credits at 30–40% below list price. It only appears when genuinely relevant to your audit.",
  },
  {
    q: "Is my data safe? What do you store?",
    a: "The public share URL contains only tool names, plan tiers, and savings numbers — no email, company name, or personal details. Your email is stored server-side only if you choose to receive the report. We don't sell or share your data.",
  },
  {
    q: "Why hardcoded rules instead of AI for the audit math?",
    a: "The audit engine uses deterministic rules because financial recommendations need to be auditable and defensible. AI generates the summary paragraph — the part that benefits from natural language. Mixing AI into pricing math would introduce hallucination risk into decisions that affect real budgets.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 border-t border-[var(--border)]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-[var(--accent)] font-mono uppercase tracking-widest mb-3">FAQ</p>
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--surface-2)] transition-colors"
                aria-expanded={open === i}
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <span
                  className="text-[var(--accent)] text-lg transition-transform shrink-0"
                  style={{ transform: open === i ? "rotate(45deg)" : "none" }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)]">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}