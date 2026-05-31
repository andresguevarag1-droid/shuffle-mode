import { NextResponse, type NextRequest } from "next/server";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Drop-list signup. Validates the email and, when NEWSLETTER_WEBHOOK_URL is set,
// forwards it to your provider (Klaviyo/Mailchimp/Shopify endpoint, etc.).
// Without the env var it just validates and accepts, so the UI works in dev.
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const email = body.email?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Enter a valid email." },
      { status: 400 }
    );
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "shuffle-mode" }),
      });
      if (!res.ok) throw new Error(`provider responded ${res.status}`);
    } catch {
      return NextResponse.json(
        { ok: false, message: "Could not subscribe right now." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
