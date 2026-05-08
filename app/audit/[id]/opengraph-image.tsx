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

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent:
              "space-between",
            padding: "60px",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
            color: "#f5f5f5",
            fontFamily:
              "Inter, sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}

          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-120px",
              width: "420px",
              height: "420px",
              borderRadius: "999px",
              background:
                "rgba(0,255,136,0.12)",
              filter: "blur(80px)",
            }}
          />

          {/* Header */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius:
                    "20px",
                  background:
                    "#00ff88",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  color: "#000",
                  fontWeight: 900,
                  fontSize: "34px",
                }}
              >
                S
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                }}
              >
                <span
                  style={{
                    fontSize:
                      "38px",
                    fontWeight: 900,
                  }}
                >
                  SpendLens
                </span>

                <span
                  style={{
                    fontSize:
                      "20px",
                    color:
                      "#888888",
                  }}
                >
                  AI Spend Audit
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection:
                  "column",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize:
                    "26px",
                  color:
                    "#aaaaaa",
                }}
              >
                Potential savings
              </span>

              <span
                style={{
                  fontSize:
                    "88px",
                  fontWeight: 900,
                  color:
                    "#00ff88",
                  lineHeight: 1,
                }}
              >
                $
                {
                  audit.totalMonthlySavings
                }
                /mo
              </span>

              <span
                style={{
                  fontSize:
                    "30px",
                  color:
                    "#888888",
                }}
              >
                $
                {
                  audit.totalAnnualSavings
                }
                /year recaptured
              </span>
            </div>
          </div>

          {/* Footer */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              borderTop:
                "1px solid #222",
              paddingTop: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "24px",
                fontSize: "22px",
                color:
                  "#999999",
              }}
            >
              <span>
                {
                  audit.toolCount
                }{" "}
                tools
              </span>

              <span>
                {
                  audit.teamSize
                }{" "}
                seats
              </span>

              <span
                style={{
                  textTransform:
                    "capitalize",
                }}
              >
                {
                  audit.useCase
                }
              </span>
            </div>

            <div
              style={{
                fontSize: "22px",
                color:
                  "#00ff88",
                fontWeight: 700,
              }}
            >
              spendlens.ai
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
            alignItems:
              "center",
            justifyContent:
              "center",
            background:
              "#0a0a0a",
            color: "#ffffff",
            fontSize: "48px",
            fontWeight: 800,
          }}
        >
          SpendLens Audit
        </div>
      ),
      size
    );
  }
}