import type { Metadata } from "next";
import { ToolStructuredData } from "../../structured-data";

const TITLE = "Cert Navigator — FCC / CE / UKCA / RCM / CCC | Breeze";
const DESC =
  "Which certifications apply, typical cost, typical timeline. Select target markets and device features to surface the FCC, CE, UKCA, RCM, CCC stack you need.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://breezehw.com/tools/cert-navigator" },
  openGraph: {
    title: "Cert Navigator — FCC / CE / UKCA / RCM / CCC for AI Hardware",
    description:
      "Select markets + features → see required certs, typical cost, lead time. Real Shenzhen lab data.",
    url: "https://breezehw.com/tools/cert-navigator",
    siteName: "Breeze",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cert Navigator — FCC / CE / UKCA / RCM / CCC | Breeze",
    description:
      "Required certs by market + device. Typical cost + lead time.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData
        slug="cert-navigator"
        name="Breeze Cert Navigator"
        description="Certification matrix navigator covering FCC, CE, UKCA, RCM, CCC, plus radio (SRRC, CMIIT) requirements for AI-hardware devices."
      />
      {children}
    </>
  );
}
