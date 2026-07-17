import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const NAME_MAX_LENGTH = 100;
const PHONE_MAX_LENGTH = 20;
const SOURCE_MAX_LENGTH = 50;
// Swedish mobile/landline numbers, with or without +46 / leading 0, spaces allowed.
const PHONE_PATTERN = /^(\+46|0)[\s\-]?[1-9][\d\s\-]{6,17}$/;

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

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const { namn, telefon, sourceSection, foretagswebbplats } = body as Record<
    string,
    unknown
  >;

  // Server-side honeypot check, in case a bot bypasses the client form.
  if (typeof foretagswebbplats === "string" && foretagswebbplats.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof namn !== "string" ||
    namn.trim().length < 2 ||
    namn.length > NAME_MAX_LENGTH
  ) {
    return NextResponse.json({ error: "Ange ditt namn." }, { status: 400 });
  }

  if (
    typeof telefon !== "string" ||
    telefon.length > PHONE_MAX_LENGTH ||
    !PHONE_PATTERN.test(telefon.trim())
  ) {
    return NextResponse.json(
      { error: "Ange ett giltigt mobilnummer." },
      { status: 400 },
    );
  }

  const source =
    typeof sourceSection === "string"
      ? sourceSection.slice(0, SOURCE_MAX_LENGTH)
      : "unknown";

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
        namn: namn.trim(),
        telefon: telefon.trim(),
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
