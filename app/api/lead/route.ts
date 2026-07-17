import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SWEDISH_PHONE_RE = /^(\+46|0)[\s-]?7[\s-]?\d([\s-]?\d){7}$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const UPSTREAM_TIMEOUT_MS = 5_000;

// In-memory, per-instance rate limit. Good enough for a single Node
// process on Hostinger; resets on deploy/restart by design.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

type LeadPayload = {
  namn?: unknown;
  telefon?: unknown;
  foretag?: unknown;
  sourceSection?: unknown;
  website?: unknown;
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "for-many-forsok" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "ogiltig-forfragan" }, { status: 400 });
  }

  // Honeypot: bots fill every field, real users never see this one.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const namn = typeof body.namn === "string" ? body.namn.trim().slice(0, 100) : "";
  const telefon = typeof body.telefon === "string" ? body.telefon.trim().slice(0, 20) : "";
  const foretag = typeof body.foretag === "string" ? body.foretag.trim().slice(0, 100) : undefined;
  const sourceSection = typeof body.sourceSection === "string" ? body.sourceSection.slice(0, 50) : "unknown";

  if (namn.length < 2 || !SWEDISH_PHONE_RE.test(telefon)) {
    return NextResponse.json({ error: "ogiltiga-uppgifter" }, { status: 400 });
  }

  const webhookUrl = process.env.GHL_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GHL_LEAD_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "tjansten-otillganglig" }, { status: 503 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namn, telefon, foretag, sourceSection }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      console.error("GHL webhook returned", upstream.status);
      return NextResponse.json({ error: "kunde-inte-skicka" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach GHL webhook", err);
    return NextResponse.json({ error: "kunde-inte-skicka" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
