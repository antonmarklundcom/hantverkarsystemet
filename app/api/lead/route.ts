import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { validateLeadPayload } from "@/lib/leadValidation";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "För många försök. Försök igen om en minut." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const validation = validateLeadPayload(body);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Server-side honeypot check, in case a bot bypasses the client form.
  if (validation.honeypotTriggered) {
    return NextResponse.json({ ok: true });
  }

  const { namn, telefon, source } = validation;

  if (!env.ghlLeadWebhookUrl) {
    console.error("GHL_LEAD_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { error: "Kunde inte skicka just nu. Ring oss istället." },
      { status: 503 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(env.ghlLeadWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        namn,
        telefon,
        källa: source,
        skickat: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`GHL webhook responded with ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to forward lead to GHL", err);
    return NextResponse.json(
      { error: "Kunde inte skicka just nu. Ring oss istället." },
      { status: 502 },
    );
  }
}
