// project/src/middleware.js

import { NextResponse } from "next/server";
import { ratelimiter } from "@/lib/rateLimiter";

export async function middleware(request) {
  const ip = request.ip ?? "127.0.0.1";

  try {
    const { success, limit, remaining } = await ratelimiter.limit(ip);
    if (!success) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
    return NextResponse.next();
  } catch (error) {
    // console.error("Rate limiter error:", error);
    return NextResponse.next();
  }
}

// This config specifies which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
