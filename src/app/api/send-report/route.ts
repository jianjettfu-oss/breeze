import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ReportRequest {
  tool: string;
  email: string;
  data: Record<string, unknown>;
}

function buildEmailHtml(tool: string, data: Record<string, unknown>): string {
  const toolNames: Record<string, string> = {
    "bom-estimator": "BOM Cost Estimate",
    "dfm-checklist": "DFM Readiness Report",
    "nre-simulator": "NRE Quote Estimate",
    "cert-navigator": "Certification Roadmap",
  };

  const toolName = toolNames[tool] || tool;
  const rows = buildRows(tool, data);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f4f4f5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#0F2440; padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:24px; font-weight:700; color:#2DD4A8; letter-spacing:-0.5px;">Breeze</span>
                    <span style="font-size:14px; color:rgba(255,255,255,0.5); margin-left:8px;">Hardware Engineering</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <h1 style="margin:0; font-size:22px; font-weight:700; color:#0F2440;">Your ${toolName}</h1>
              <p style="margin:8px 0 0; font-size:14px; color:#64748B;">Here's a summary of your selections and estimates.</p>
            </td>
          </tr>

          <!-- Data Table -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
                <tr>
                  <td style="background:#f8fafc; padding:12px 16px; font-size:12px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #e2e8f0;">Item</td>
                  <td style="background:#f8fafc; padding:12px 16px; font-size:12px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #e2e8f0; text-align:right;">Value</td>
                </tr>
${rows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf9; border-radius:8px; border:1px solid #d1fae5;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 8px; font-size:16px; font-weight:600; color:#0F2440;">Want a precise quote?</p>
                    <p style="margin:0; font-size:14px; color:#64748B;">Simply reply to this email with your project details and we'll prepare a detailed proposal within 24 hours.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc; padding:24px 40px; border-top:1px solid #e2e8f0;">
              <p style="margin:0; font-size:12px; color:#94a3b8;">
                Breeze Hardware Engineering &middot; Your Shenzhen Engineering Partner for AI Hardware
              </p>
              <p style="margin:8px 0 0; font-size:12px;">
                <a href="https://breezehw.com" style="color:#2DD4A8; text-decoration:none;">breezehw.com</a>
              </p>
              <p style="margin:12px 0 0; font-size:11px; color:#cbd5e1;">
                These estimates are based on current Shenzhen market pricing and may vary based on specific requirements.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildRows(tool: string, data: Record<string, unknown>): string {
  const rows: { label: string; value: string; highlight?: boolean; section?: boolean }[] = [];

  if (tool === "bom-estimator") {
    const d = data as {
      volume?: string;
      components?: { label: string; cost: string }[];
      fixedCosts?: { label: string; cost: string }[];
      volumeAdjustment?: string;
      totalPerUnit?: string;
      totalRange?: string;
      retailRange?: string;
      nreTotal?: string;
    };
    if (d.volume) rows.push({ label: "Production Volume", value: d.volume });
    rows.push({ label: "COMPONENTS", value: "", section: true });
    for (const c of d.components || []) rows.push({ label: c.label, value: c.cost });
    rows.push({ label: "FIXED COSTS", value: "", section: true });
    for (const f of d.fixedCosts || []) rows.push({ label: f.label, value: f.cost });
    if (d.volumeAdjustment) rows.push({ label: "Volume Adjustment", value: d.volumeAdjustment });
    if (d.totalPerUnit) rows.push({ label: "Per Unit Total", value: d.totalPerUnit, highlight: true });
    if (d.totalRange) rows.push({ label: "Range", value: d.totalRange });
    if (d.retailRange) rows.push({ label: "Suggested Retail (4-6x)", value: d.retailRange });
    if (d.nreTotal) rows.push({ label: "One-Time NRE", value: d.nreTotal });
  } else if (tool === "dfm-checklist") {
    const d = data as {
      score?: number;
      grade?: string;
      passed?: number;
      failed?: number;
      skipped?: number;
      total?: number;
      failedItems?: string[];
      criticalFails?: string[];
    };
    if (d.grade) rows.push({ label: "DFM Grade", value: `${d.grade} (${d.score}%)`, highlight: true });
    rows.push({ label: "Passed", value: `${d.passed ?? 0}` });
    rows.push({ label: "Failed", value: `${d.failed ?? 0}` });
    rows.push({ label: "N/A", value: `${d.skipped ?? 0}` });
    rows.push({ label: "Total Checks", value: `${d.total ?? 0}` });
    if (d.criticalFails && d.criticalFails.length > 0) {
      rows.push({ label: "CRITICAL FAILURES", value: "", section: true });
      for (const item of d.criticalFails) rows.push({ label: item, value: "FAIL" });
    }
    if (d.failedItems && d.failedItems.length > 0) {
      rows.push({ label: "ALL FAILED ITEMS", value: "", section: true });
      for (const item of d.failedItems) rows.push({ label: item, value: "FAIL" });
    }
  } else if (tool === "nre-simulator") {
    const d = data as {
      services?: { label: string; cost: string }[];
      totalNre?: string;
      totalRange?: string;
      timeline?: string;
      amortization?: { volume: string; perUnit: string }[];
    };
    rows.push({ label: "SELECTED SERVICES", value: "", section: true });
    for (const s of d.services || []) rows.push({ label: s.label, value: s.cost });
    if (d.totalNre) rows.push({ label: "Total NRE", value: d.totalNre, highlight: true });
    if (d.totalRange) rows.push({ label: "Range", value: d.totalRange });
    if (d.timeline) rows.push({ label: "Estimated Timeline", value: d.timeline });
    if (d.amortization && d.amortization.length > 0) {
      rows.push({ label: "NRE PER UNIT", value: "", section: true });
      for (const a of d.amortization) rows.push({ label: `@ ${a.volume} units`, value: a.perUnit });
    }
  } else if (tool === "cert-navigator") {
    const d = data as {
      features?: string[];
      markets?: string[];
      certs?: { name: string; cost: string; timeline: string }[];
      totalCost?: string;
      totalRange?: string;
      totalTimeline?: string;
    };
    if (d.features && d.features.length) rows.push({ label: "Device Features", value: d.features.join(", ") });
    if (d.markets && d.markets.length) rows.push({ label: "Target Markets", value: d.markets.join(", ") });
    rows.push({ label: "REQUIRED CERTIFICATIONS", value: "", section: true });
    for (const c of d.certs || []) rows.push({ label: `${c.name} (${c.timeline})`, value: c.cost });
    if (d.totalCost) rows.push({ label: "Total Certification Cost", value: d.totalCost, highlight: true });
    if (d.totalRange) rows.push({ label: "Range", value: d.totalRange });
    if (d.totalTimeline) rows.push({ label: "Timeline (parallel)", value: `~${d.totalTimeline}` });
  }

  return rows
    .map((r) => {
      if (r.section) {
        return `                <tr>
                  <td colspan="2" style="background:#f0f9ff; padding:10px 16px; font-size:11px; font-weight:700; color:#0F2440; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #e2e8f0;">${r.label}</td>
                </tr>`;
      }
      if (r.highlight) {
        return `                <tr>
                  <td style="padding:14px 16px; font-size:14px; font-weight:700; color:#0F2440; border-bottom:1px solid #e2e8f0; background:#f0fdf9;">${r.label}</td>
                  <td style="padding:14px 16px; font-size:14px; font-weight:700; color:#2DD4A8; text-align:right; border-bottom:1px solid #e2e8f0; background:#f0fdf9;">${r.value}</td>
                </tr>`;
      }
      return `                <tr>
                  <td style="padding:10px 16px; font-size:13px; color:#334155; border-bottom:1px solid #e2e8f0;">${r.label}</td>
                  <td style="padding:10px 16px; font-size:13px; color:#334155; text-align:right; border-bottom:1px solid #e2e8f0;">${r.value}</td>
                </tr>`;
    })
    .join("\n");
}

function storeLead(email: string, tool: string, data: Record<string, unknown>): void {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "leads.json");
    let leads: unknown[] = [];
    if (fs.existsSync(filePath)) {
      try {
        leads = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        leads = [];
      }
    }
    leads.push({
      email,
      tool,
      data,
      timestamp: new Date().toISOString(),
    });
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error("Failed to store lead:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body: ReportRequest = await request.json();
    const { tool, email, data } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!tool || !data) {
      return NextResponse.json(
        { error: "Tool name and data are required" },
        { status: 400 }
      );
    }

    const toolSubjects: Record<string, string> = {
      "bom-estimator": "Your BOM Cost Estimate from Breeze",
      "dfm-checklist": "Your DFM Readiness Report from Breeze",
      "nre-simulator": "Your NRE Quote Estimate from Breeze",
      "cert-navigator": "Your Certification Roadmap from Breeze",
    };

    const html = buildEmailHtml(tool, data);

    // Store lead first (even if email fails)
    storeLead(email, tool, data);

    const { error } = await resend.emails.send({
      from: "Breeze <hello@breezehw.com>",
      to: [email],
      subject: toolSubjects[tool] || `Your ${tool} Report from Breeze`,
      html,
      replyTo: "hello@breezehw.com",
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
