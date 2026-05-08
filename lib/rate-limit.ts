import { RateLimitResult } from "@/lib/types";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store — resets on cold start. Good enough for a single-instance deployment.
// For multi-instance scale, swap this Map for a Redis/Upstash store.
const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  const remaining = limit - entry.count;
  return { allowed: true, remaining, resetAt: entry.resetAt };
}

// Cleanup stale entries every 10 minutes to prevent unbounded growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 10 * 60 * 1000);
}

export function getRateLimitKey(request: Request, suffix: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `${ip}:${suffix}`;
}