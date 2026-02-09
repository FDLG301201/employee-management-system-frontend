import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In production, log to monitoring service (App Insights, Sentry, etc.)
    console.error("[Frontend Error]", body);
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
