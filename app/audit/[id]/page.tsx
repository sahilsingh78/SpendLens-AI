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
  const { id } = await params;

  if (!id) {
    notFound();
  }

  try {
    const audit = await getAudit(id);

    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-220px] right-[-180px] w-[520px] h-[520px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl" />

          <div className="absolute bottom-[-220px] left-[-180px] w-[520px] h-[520px] rounded-full bg-blue-500 opacity-[0.03] blur-3xl" />
        </div>

        <Navbar />

        <AuditResultsClient audit={audit} />

        <Footer />
      </div>
    );
  } catch {
    notFound();
  }
}