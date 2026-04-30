import type { Metadata } from "next";
import { ToolStructuredData } from "../../structured-data";

const TITLE = "DFM Checklist — Design-for-Manufacturing Review | Breeze";
const DESC =
  "Design-for-manufacturing review surfacing the common first-product failures: thermal, antenna integration, PCB layout, certification blockers, supply-chain risk.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://breezehw.com/tools/dfm-checklist" },
  openGraph: {
    title: "DFM Checklist — Design-for-Manufacturing Review",
    description:
      "Surfaces thermal, antenna, PCB-layout, certification, and supply-chain risks before you commit to tooling.",
    url: "https://breezehw.com/tools/dfm-checklist",
    siteName: "Breeze",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DFM Checklist — Design-for-Manufacturing Review | Breeze",
    description:
      "Thermal, antenna, PCB, cert, supply-chain — common first-product failures.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData
        slug="dfm-checklist"
        name="Breeze DFM Checklist"
        description="Design-for-manufacturing review across thermal, RF, PCB, mechanical, certification, and supply-chain risk categories."
      />
      {children}
    </>
  );
}
