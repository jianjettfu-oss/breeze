import type { Metadata } from "next";
import { ToolStructuredData } from "../../structured-data";
import { checkCategories } from "./data";

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

const HOWTO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Design-for-Manufacturing Review for AI Hardware",
  description:
    "Structured 29-check DFM review for AI-hardware first products — thermal, antenna/RF, power, mechanical, PCB layout, firmware, and certification readiness. Catches design issues before tooling cost is committed.",
  totalTime: "PT2H",
  supply: [
    { "@type": "HowToSupply", name: "Schematic and PCB layout files" },
    { "@type": "HowToSupply", name: "Mechanical CAD (enclosure + assembly)" },
    { "@type": "HowToSupply", name: "Target market list (for certification scope)" },
  ],
  step: checkCategories.map((cat, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: cat.label,
    text: `${cat.items.length} checks. Key questions: ${cat.items
      .slice(0, 3)
      .map((it) => it.question)
      .join(" ")}`,
    url: `https://breezehw.com/tools/dfm-checklist#${cat.id}`,
  })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData
        slug="dfm-checklist"
        name="Breeze DFM Checklist"
        description="Design-for-manufacturing review across thermal, RF, PCB, mechanical, certification, and supply-chain risk categories."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_JSONLD) }}
      />
      {children}
    </>
  );
}
