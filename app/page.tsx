"use client";

import {
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Navbar from "@/components/shared/Navbar";

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

import SpendForm from "@/components/form/SpendForm";

import {
  AuditInput,
} from "@/lib/types";

export default function HomePage() {

  const router =
    useRouter();

  const auditSectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

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

      const response =
        await fetch(
          "/api/audit",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(data),
          }
        );

      if (!response.ok) {

        let errorMessage =
          "Failed to run audit";

        try {

          const error =
            await response.json();

          errorMessage =
            error.message ??
            errorMessage;

        } catch {

          errorMessage =
            `Request failed with status ${response.status}`;

        }

        throw new Error(
          errorMessage
        );
      }

      const result =
        await response.json();

      if (!result?.id) {

        throw new Error(
          "Audit ID missing from response"
        );

      }

      router.push(
        `/audit/${result.id}`
      );

    } catch (error) {

      console.error(
        "Audit submit error:",
        error
      );

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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* Navbar */}

      <Navbar
        onStartAudit={
          scrollToAudit
        }
      />

      {/* Hero */}

      <Hero
        onStartAudit={
          scrollToAudit
        }
      />

      {/* Stats */}

      <Stats />

      {/* Features */}

      <Features />

      {/* Audit Section */}

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

              Discover hidden overspending across
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
              isLoading={
                isLoading
              }
            />

          </div>

        </div>

      </section>

      {/* FAQ */}

      <FAQ />

      {/* CTA */}

      <CTA
        onStartAudit={
          scrollToAudit
        }
      />

      {/* Footer */}

      <Footer />

    </main>
  );
}