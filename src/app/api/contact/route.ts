import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clean, clientIp, isEmail, rateLimit } from "@/lib/request-guard";

const resend = new Resend(process.env.RESEND_API_KEY);

const VOLUMES = new Set(["", "100", "1000", "10000", "100000"]);
const STAGES = new Set(["", "idea", "design", "prototype", "production"]);
const AI_STAGES = new Set([
  "",
  "none",
  "concept-renders",
  "schematic",
  "pcb-layout",
  "enclosure-cad",
  "firmware",
]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true });
  }

  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please email hello@breezehw.com." },
      { status: 429 }
    );
  }

  const email = clean(body.email, 254);
  if (!isEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const product = clean(body.product, 300);
  const notes = clean(body.notes, 3000);
  const volume = clean(body.volume, 10);
  const stage = clean(body.stage, 20);
  const aiStage = clean(body.aiStage, 30);

  if (!product && !notes) {
    return NextResponse.json(
      { error: "Tell us a little about what you are building." },
      { status: 400 }
    );
  }
  if (!VOLUMES.has(volume) || !STAGES.has(stage) || !AI_STAGES.has(aiStage)) {
    return NextResponse.json({ error: "Invalid selection." }, { status: 400 });
  }

  const text = [
    "New contact-form submission (breezehw.com)",
    "",
    `Name: ${name || "-"}`,
    `Email: ${email}`,
    `Product: ${product || "-"}`,
    `Volume: ${volume || "-"}`,
    `Stage: ${stage || "-"}`,
    `How far AI tools got them: ${aiStage || "-"}`,
    "",
    "Notes:",
    notes || "-",
    "",
    `Timestamp: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    // Subject format is parsed by DM's breeze-leads-monitor: `[BREEZE LEAD] <tool> — <email>`.
    const { error } = await resend.emails.send({
      from: "Breeze Leads <hello@breezehw.com>",
      to: ["hello@breezehw.com"],
      replyTo: email,
      subject: `[BREEZE LEAD] contact-form — ${email}`,
      text,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send. Please email hello@breezehw.com." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Could not send. Please email hello@breezehw.com." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
