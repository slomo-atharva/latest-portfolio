import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  message: 4000,
} as const;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill a field they cannot see.
  if (asTrimmedString(payload.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email me directly." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return NextResponse.json(
        { error: "Could not send that message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (sendError) {
    console.error("Contact form failed:", sendError);
    return NextResponse.json(
      { error: "Could not send that message. Please try again." },
      { status: 500 },
    );
  }
}
