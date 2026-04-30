import type { Metadata } from "next";
import { ToolStructuredData } from "../../structured-data";

const TITLE = "NRE Simulator — First-Production-Run Cost Estimator | Breeze";
const DESC =
  "Non-recurring engineering cost estimate for your first production run — molds, certifications, engineering samples, factory setup. Phased timeline with realistic Shenzhen numbers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://breezehw.com/tools/nre-simulator" },
  openGraph: {
    title: "NRE Simulator — First-Production-Run Cost Estimator",
    description:
      "Estimate molds, certifications, prototypes, factory setup. Phased timeline + realistic Shenzhen numbers.",
    url: "https://breezehw.com/tools/nre-simulator",
    siteName: "Breeze",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NRE Simulator — First-Production-Run Cost Estimator | Breeze",
    description:
      "Phased NRE timeline. Molds, certs, prototypes, factory setup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData
        slug="nre-simulator"
        name="Breeze NRE Simulator"
        description="Non-recurring engineering cost estimate for first production runs of AI-hardware devices."
      />
      {children}
    </>
  );
}
