"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/shared/Navbar";

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

import SpendForm from "@/components/form/SpendForm";

import { AuditInput } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();

  const auditSectionRef =
    useRef<HTMLElement | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  function scrollToAudit() {
    auditSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function handleAuditSubmit(
    data: AuditInput
  ) {
    try {
      setIsLoading(true);

      const response = await fetch(
        "/api/audit",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error =
          await response.json();

        throw new Error(
          error.message ??
            "Failed to run audit"
        );
      }

      const result =
        await response.json();

      /*
        Redirect to results page
      */

      router.push(
        `/audit/${result.id}`
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while running the audit."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      {/* =====================================
          Background Effects
      ===================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-220px] right-[-180px] w-[520px] h-[520px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl" />

        <div className="absolute bottom-[-220px] left-[-180px] w-[520px] h-[520px] rounded-full bg-blue-500 opacity-[0.03] blur-3xl" />
      </div>

      {/* =====================================
          Navbar
      ===================================== */}

      <Navbar
        onStartAudit={scrollToAudit}
      />

      {/* =====================================
          Hero
      ===================================== */}

      <Hero
        onStartAudit={scrollToAudit}
      />

      {/* =====================================
          Stats
      ===================================== */}

      <Stats />

      {/* =====================================
          Features
      ===================================== */}

      <Features />

      {/* =====================================
          Audit Section
      ===================================== */}

      <section
        id="audit-form"
        ref={auditSectionRef}
        className="relative py-24 px-4 border-y border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}

          <div className="text-center mb-14 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--text-muted)] font-mono-custom mb-5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />

              AI COST OPTIMIZATION
            </div>

            <h2
              className="text-4xl md:text-5xl font-black mb-5 leading-tight"
              style={{
                fontFamily:
                  "Syne, sans-serif",
              }}
            >
              Audit your AI stack
              <br />

              <span className="gradient-text">
                in under 2 minutes
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-lg leading-8">
              Discover hidden
              overspending across
              ChatGPT, Claude, Cursor,
              GitHub Copilot, Gemini,
              and more.
            </p>
          </div>

          {/* Form */}

          <div className="max-w-4xl mx-auto">
            <SpendForm
              onSubmit={
                handleAuditSubmit
              }
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* =====================================
          FAQ
      ===================================== */}

      <FAQ />

      {/* =====================================
          CTA
      ===================================== */}

      <CTA
        onStartAudit={scrollToAudit}
      />

      {/* =====================================
          Footer
      ===================================== */}

      <Footer />
    </div>
  );
}