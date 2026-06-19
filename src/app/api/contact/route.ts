import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where inquiries land. Comma-separate CONTACT_TO for multiple recipients.
const TO = (process.env.CONTACT_TO || site.email)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Must be an address on a domain verified in Resend (onboarding@resend.dev works for testing).
const FROM = process.env.CONTACT_FROM || "Cornerstone Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Accept silently, send nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please include your name, email, and a message." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email isn't configured yet." }, { status: 500 });
  }

  const company = (data.company || "").trim();
  const phone = (data.phone || "").trim();

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New project inquiry — ${name}${company ? ` (${company})` : ""}`,
    text:
      "New inquiry from the Cornerstone website:\n\n" +
      `Name:    ${name}\n` +
      `Company: ${company || "—"}\n` +
      `Email:   ${email}\n` +
      `Phone:   ${phone || "—"}\n\n` +
      `${message}\n`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Couldn't send right now — please call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
