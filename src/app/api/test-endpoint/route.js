// src/app/api/test-endpoint/route.js

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Success! Rate limiter is working." },
    { status: 200 },
  );
}
