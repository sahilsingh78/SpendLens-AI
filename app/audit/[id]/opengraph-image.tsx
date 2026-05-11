import { ImageResponse } from "next/og";

import { getAudit } from "@/lib/supabase";

export const runtime = "edge";

export const alt =
  "SpendLens AI Spend Audit";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

interface OpenGraphImageProps {
  params: {
    id: string;
  };
}

export default async function OpenGraphImage({
  params,
}: OpenGraphImageProps) {

  try {

    const audit =
      await getAudit(params.id);

    const monthlySavings =
      audit.totalMonthlySavings || 0;

    const annualSavings =
      audit.totalAnnualSavings ||
      monthlySavings * 12;

    const headline =
      monthlySavings > 0
        ? `$${monthlySavings}/mo savings identified`
        : "Your AI stack is already optimized";

    const subheadline =
      monthlySavings > 0
        ? `$${annualSavings}/year in potential savings`
        : "Minimal redundant AI tooling spend detected";

    return new ImageResponse(

      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
            color: "#f5f5f5",
            position: "relative",
            overflow: "hidden",
            fontFamily:
              "Inter, sans-serif",
          }}
        >

          {/* Glow Effect */}

          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "420px",
              height: "420px",
              borderRadius: "999px",
              background:
                "rgba(0,255,136,0.12)",
              filter:
                "blur(100px)",
            }}
          />

          {/* Header */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              zIndex: 2,
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >

              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "20px",
                  background: "#00ff88",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "34px",
                }}
              >
                S
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                <span
                  style={{
                    fontSize: "42px",
                    fontWeight: 900,
                  }}
                >
                  SpendLens
                </span>

                <span
                  style={{
                    fontSize: "22px",
                    color: "#9ca3af",
                  }}
                >
                  AI Spend Audit
                </span>

              </div>

            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "32px",
                gap: "14px",
              }}
            >

              <span
                style={{
                  fontSize: "24px",
                  color: "#9ca3af",
                }}
              >
                Audit Summary
              </span>

              <span
                style={{
                  fontSize: "82px",
                  fontWeight: 900,
                  color: "#00ff88",
                  lineHeight: 1,
                }}
              >
                {headline}
              </span>

              <span
                style={{
                  fontSize: "30px",
                  color: "#d1d5db",
                }}
              >
                {subheadline}
              </span>

            </div>

          </div>

          {/* Footer */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop:
                "1px solid rgba(255,255,255,0.08)",
              paddingTop: "28px",
              zIndex: 2,
            }}
          >

            <div
              style={{
                display: "flex",
                gap: "24px",
                color: "#9ca3af",
                fontSize: "22px",
              }}
            >

              <span>
                {audit.toolCount} tools audited
              </span>

              <span>
                {audit.teamSize} seats
              </span>

              <span
                style={{
                  textTransform:
                    "capitalize",
                }}
              >
                {audit.useCase}
              </span>

            </div>

            <div
              style={{
                color: "#00ff88",
                fontWeight: 800,
                fontSize: "24px",
              }}
            >
              spendlens.vercel.app
            </div>

          </div>

        </div>
      ),

      size
    );

  } catch {

    return new ImageResponse(

      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#ffffff",
            fontSize: "52px",
            fontWeight: 900,
            fontFamily:
              "Inter, sans-serif",
          }}
        >
          SpendLens Audit
        </div>
      ),

      size
    );

  }
}