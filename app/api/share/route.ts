import { NextRequest, NextResponse } from "next/server";
import { getAudit } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || id.length > 50) {
    return NextResponse.json({ error: "Invalid audit ID" }, { status: 400 });
  }

  try {
    const audit = await getAudit(id);
    return NextResponse.json(audit, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }
}