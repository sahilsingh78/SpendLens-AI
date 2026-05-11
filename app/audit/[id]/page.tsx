import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/landing/Footer";

import AuditResultsClient from "./AuditResultsClient";

import { getAudit } from "@/lib/supabase";

interface AuditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AuditPageProps): Promise<Metadata> {

  const { id } = await params;

  try {

    const audit =
      await getAudit(id);

    const monthlySavings =
      audit.totalMonthlySavings || 0;

    const annualSavings =
      audit.totalAnnualSavings ||
      monthlySavings * 12;

    const title =
      monthlySavings > 0
        ? `Save $${monthlySavings}/mo on your AI stack`
        : "Your AI stack is already well optimized";

    const description =
      monthlySavings > 0
        ? `SpendLens identified potential savings of $${annualSavings}/year across your AI tooling stack.`
        : "SpendLens analyzed your AI tooling stack and found minimal unnecessary spend.";

    return {

      metadataBase:
        new URL(
          "https://spend-lens-ai-uah9.vercel.app"
        ),

      title,

      description,

      openGraph: {
        title,
        description,

        url:
          `https://spend-lens-ai-uah9.vercel.app/audit/${id}`,

        siteName:
          "SpendLens",

        locale:
          "en_US",

        type:
          "website",

        images: [
          {
            url:
              `/audit/${id}/opengraph-image`,
            width: 1200,
            height: 630,
            alt:
              "SpendLens AI Audit Result",
          },
        ],
      },

      twitter: {
        card:
          "summary_large_image",

        title,

        description,

        images: [
          `/audit/${id}/opengraph-image`,
        ],
      },
    };

  } catch {

    return {

      metadataBase:
        new URL(
          "https://spend-lens-ai-uah9.vercel.app"
        ),

      title:
        "SpendLens Audit",

      description:
        "AI spend optimization audit powered by SpendLens.",
    };

  }
}

export default async function AuditPage({
  params,
}: AuditPageProps) {

  const { id } = await params;

  try {

    const audit =
      await getAudit(id);

    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

        <Navbar />

        <AuditResultsClient
          audit={audit}
        />

        <Footer />

      </div>
    );

  } catch (error) {

    console.error(
      "Failed to load audit:",
      error
    );

    notFound();

  }
}