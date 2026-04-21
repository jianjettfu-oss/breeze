import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Breeze — Your Shenzhen Engineering Partner for AI Hardware";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0F2440";
const TEAL = "#2DD4A8";
const SLATE = "#94A3B8";
const OFF = "#F8FAFC";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: NAVY,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: TEAL,
              letterSpacing: "-0.02em",
            }}
          >
            Breeze
          </span>
          <span style={{ fontSize: 22, color: SLATE, marginLeft: 12 }}>
            Hardware Engineering
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: OFF,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1040,
            }}
          >
            Your Shenzhen engineering partner for AI hardware.
          </div>
          <div style={{ fontSize: 28, color: SLATE, maxWidth: 1000 }}>
            Four free tools to pressure-test BOM, NRE, DFM, and certification
            before you commit a dollar.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            "BOM Cost Estimator",
            "NRE Simulator",
            "DFM Checklist",
            "Cert Navigator",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 24px",
                border: `1.5px solid ${TEAL}`,
                borderRadius: 999,
                color: TEAL,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid rgba(148, 163, 184, 0.2)`,
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 22, color: OFF, fontWeight: 500 }}>
            breezehw.com
          </div>
          <div style={{ fontSize: 18, color: SLATE }}>
            Open-source data · MIT · Shenzhen
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
