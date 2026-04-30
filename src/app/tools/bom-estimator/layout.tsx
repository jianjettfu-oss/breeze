import type { Metadata } from "next";
import { ToolStructuredData } from "../../structured-data";

const TITLE = "BOM Cost Estimator — 1K-Volume Pricing for AI Hardware | Breeze";
const DESC =
  "Real Shenzhen 1K-volume BOM pricing for ESP32-S3, Rockchip RV1103/RK3562/RK3588S, MediaTek Genio, plus sensor/power/memory stacks. Open data behind every number.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://breezehw.com/tools/bom-estimator" },
  openGraph: {
    title: "BOM Cost Estimator — 1K-Volume AI Hardware Pricing",
    description:
      "Real Shenzhen 1K-volume BOM pricing for ESP32-S3, Rockchip, MediaTek Genio, plus sensor/power/memory. Audit numbers before you trust them.",
    url: "https://breezehw.com/tools/bom-estimator",
    siteName: "Breeze",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOM Cost Estimator — 1K-Volume AI Hardware Pricing | Breeze",
    description:
      "Real Shenzhen 1K-volume BOM pricing for ESP32-S3, Rockchip, MediaTek Genio.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData
        slug="bom-estimator"
        name="Breeze BOM Cost Estimator"
        description="Real 1K-volume BOM pricing for ESP32-S3, Rockchip, MediaTek Genio AI-hardware projects."
      />
      {children}
    </>
  );
}
