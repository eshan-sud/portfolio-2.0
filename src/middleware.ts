// src/middleware.ts

export const runtime = "nodejs";
import { NextResponse, type NextRequest } from "next/server";
import { ratelimiter } from "@/lib/rateLimiter";

export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";
  try {
    const { success, limit, remaining, reset } = await ratelimiter.limit(ip);
    const response = success
      ? NextResponse.next()
      : new NextResponse("Too Many Requests — please slow down.", {
          status: 429,
          headers: { "Content-Type": "text/plain" },
        });
    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());
    if (!success) {
      console.warn(
        `[middleware] Rate limit exceeded for IP: ${ip} — ${request.nextUrl.pathname}`,
      );
    }
    return response;
  } catch (err) {
    //   } catch (err) {
    // console.error("[middleware] Rate limiter error:", err);
    return NextResponse.next();
  }
}

// Only rate-limit API routes. Applying it to every page navigation would
// block users browsing the portfolio normally (SSR + client transitions).
export const config = {
  matcher: ["/api/:path*"],
};
