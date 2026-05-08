import { notFound } from "next/navigation";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/landing/Footer";

import AuditResultsClient from "./AuditResultsClient";

import { getAudit } from "@/lib/supabase";

interface AuditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AuditPage({
  params,
}: AuditPageProps) {

  const { id } =
    await params;

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