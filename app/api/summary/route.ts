import {
  NextRequest,
  NextResponse,
} from "next/server";

import { generateAISummary } from "@/lib/ai-summary";

import {
  checkRateLimit,
  getRateLimitKey,
} from "@/lib/rate-limit";

import {
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/constants";

import {
  SummaryRequestSchema,
} from "@/lib/validations";

export async function POST(
  req: NextRequest
) {
  const key =
    getRateLimitKey(
      req,
      "summary"
    );

  const limit =
    checkRateLimit(
      key,
      20,
      RATE_LIMIT_WINDOW_MS
    );

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Rate limited",
      },
      {
        status: 429,
      }
    );
  }

  let body: unknown;

  try {
    body =
      await req.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "Invalid JSON",
      },
      {
        status: 400,
      }
    );
  }

  const parsed =
    SummaryRequestSchema.safeParse(
      body
    );

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Invalid audit data",
      },
      {
        status: 422,
      }
    );
  }

  const summary =
    await generateAISummary(
      parsed.data
    );

  return NextResponse.json({
    summary,
  });
}