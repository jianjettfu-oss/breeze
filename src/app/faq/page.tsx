import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";

export const metadata: Metadata = {
  title: "FAQ — Breeze | AI Hardware Engineering Partner in Shenzhen",
  description:
    "Direct answers about Breeze: who we are, who we serve, how engagements work, NRE + per-unit pricing, when to choose us vs a large EMS, typical timelines, supported chipsets.",
  alternates: { canonical: "https://breezehw.com/faq" },
  openGraph: {
    title: "FAQ — Breeze",
    description:
      "Direct answers: pricing model, engagement scope, when to use Breeze vs EMS, supported chipsets, typical concept-to-production timeline.",
    url: "https://breezehw.com/faq",
    type: "article",
  },
};

type QA = { q: string; a: string };

const QAS: QA[] = [
  {
    q: "What is Breeze?",
    a: "Breeze is a Shenzhen-based engineering services firm that helps AI hardware founders move from concept to production. We provide BOM cost estimation, NRE budgeting, design-for-manufacturing review, certification navigation, and direct factory orchestration. We're not an EMS, not a fund, and we don't take equity — we charge an engineering fee plus per-unit margin once you're in production.",
  },
  {
    q: "Who is Breeze for?",
    a: "Founders and CTOs of AI hardware startups (wearables, smart home devices, edge-AI cameras, embedded ML products) who have a working concept or prototype and need a Shenzhen partner to get to a manufacturable, certifiable, shippable product. Most clients have raised seed-to-Series-A or are bootstrapped and need cost discipline. We're not a fit if you have no electrical/mechanical concept yet — we don't do greenfield invention.",
  },
  {
    q: "How does Breeze pricing work?",
    a: "Two components. (1) Engineering NRE — a fixed or capped fee for the scoped work (BOM build-out, DFM, factory selection, sample runs, certification setup). Typical first engagement: USD 15K-60K depending on complexity. (2) Per-unit margin once you're in production — a transparent markup on factory cost. No equity. No MOQ surprises. We expose the BOM and factory quotes; you audit our numbers.",
  },
  {
    q: "When should I use Breeze vs a large EMS like Foxconn or Flex?",
    a: "Use Breeze when your annual unit volume is roughly 1K-100K and you need engineering attention plus factory orchestration as a bundled service. Large EMS contract manufacturers expect mature designs at higher volumes (typically 100K+ units/yr) and don't engage on early-stage engineering iteration. Use Breeze for the gap between solo bench prototype and the volume threshold where Tier-1 EMS starts paying attention.",
  },
  {
    q: "When should I NOT use Breeze?",
    a: "Skip Breeze if (a) your design is fully mature and you only need a contract manufacturer at 250K+ units/yr — talk to a large EMS directly; (b) you only need a one-off custom prototype with no production intent — a Shenzhen prototyping shop is cheaper; (c) your product is purely software with hardware reference design from a chipset vendor — buy the reference module; (d) you're early enough that your hardware concept is still moving weekly — finish that first, then come back.",
  },
  {
    q: "How long from concept to first production unit?",
    a: "Typical AI-hardware path with Breeze: 6-12 months end-to-end. Roughly: BOM + DFM + factory selection (4-8 weeks), EVT samples + revisions (6-10 weeks), DVT + certification submission (8-14 weeks), PVT + first production run (4-8 weeks). Faster is possible with simpler designs (e.g., ESP32-based devices, ~5 months); complex multi-radio devices or custom ASIC paths run longer.",
  },
  {
    q: "What chipsets and stacks do you have direct experience with?",
    a: "Espressif (ESP32-S3 for low-power AI sensing), Rockchip (RV1103 for low-end AI cameras, RK3562/RK3588S for edge AI compute), MediaTek (Genio for AIoT). On the sensor + power side: STMicro IMUs, ams OSRAM optical sensors, Maxim/TI power management. We don't claim coverage of every silicon vendor — when a project needs a chipset outside our regular set, we say so up front and either bring in a specialist or refer you elsewhere.",
  },
  {
    q: "What's open about Breeze that other partners don't share?",
    a: "Our engineering data is open-sourced on GitHub: ai-hardware-toolkit (MIT license) — BOM cost references, DFM checklist, NRE cost guide, certification matrix, EVT/DVT/PVT checklist, supplier qualification rubric. Every Breeze tool on this site runs on that public data. You can audit our numbers before you trust us — that's the point.",
  },
  {
    q: "What's a realistic BOM cost for a $99 AI hardware product?",
    a: "For a sub-$100 retail product, target BOM is roughly USD 15-25 (15-25% of MSRP) once you factor distributor margin (typically 50% off retail), retailer margin (~50% gross), and your own ~30% operating margin. That's tight for AI hardware — you're picking ESP32-S3 ($1.50-2.50) or Rockchip RV1103 ($2-3) class silicon, on-package flash, a simple sensor stack, plastic enclosure, no display or a small mono OLED, and a 200-400mAh battery. Custom NPU silicon, color displays, or cellular modems break the budget. The unspoken constraint: most $99 AI hardware lives or dies on whether you accept Amazon FBA economics (which compress the margin model) or build direct distribution.",
  },
  {
    q: "What's the difference between EVT, DVT, and PVT?",
    a: "Three engineering validation stages on the path to mass production. EVT (Engineering Validation Test): 10-30 units, hand-assembled, first full integration of all subsystems — proves the design works at all. DVT (Design Validation Test): 30-100 units, near-final tooling, used for certification submission and design freeze. Tests robustness, yield, and reliability. PVT (Production Validation Test): 100-500 units, full production line, validates the factory can actually build at quality and yield. After PVT pass, you ramp to MP (mass production). Typical cadence for a moderate-complexity AI device: EVT week 8-12, DVT week 16-22, PVT week 24-30, with MP starting around week 30-36.",
  },
  {
    q: "How do 2026 US tariffs affect China-made AI hardware?",
    a: "As of mid-2026, China-origin consumer electronics face Section 301 tariffs that have been progressively raised since 2024 — most consumer AI hardware HTS codes now sit in the 15-25% range, with smartwatch/wearable categories on the higher end. The de minimis exemption (under USD 800 per shipment) was tightened in 2025, closing the prior direct-to-consumer Chinese shipping loophole. Practical implications: (1) build tariff into your landed-cost model from day one, not as an afterthought; (2) consider Mexico or Vietnam final-step assembly to qualify under USMCA or other origin rules — but only at volumes that absorb the supply-chain complexity; (3) verify HTS classification with a US customs broker before quoting retail. We're a Shenzhen partner — we'll tell you when reshoring final assembly genuinely helps versus when it just adds cost.",
  },
  {
    q: "Can I manufacture in Shenzhen without a China entity?",
    a: "Yes — most of our founder clients don't have a China entity. Standard arrangement: the manufacturing partner acts as importer/exporter of record on the China side; you transact in USD via Hong Kong or Singapore; goods ship FOB Shenzhen or DDP to your destination. You'll need a foreign entity (US LLC, HK Ltd, SG Pte Ltd are the common choices) to hold supplier contracts and IP. For SRRC/CCC certification, the local Chinese applicant is handled by the manufacturing partner. The friction points are (a) IP protection — get NNN agreements with all suppliers, (b) currency exposure if RMB moves materially, (c) export-control review if your AI capability falls under EAR (most consumer wearables don't, but verify). No China entity needed for >95% of consumer AI hardware projects.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QAS.map((qa) => ({
    "@type": "Question",
    name: qa.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: qa.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-wider text-[#2DD4A8] font-semibold mb-2">
            FAQ
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] leading-tight">
            Direct answers about Breeze
          </h1>
          <p className="mt-4 text-base text-[#64748B] leading-relaxed">
            How we work, how we charge, who we&apos;re for, and when you should pick someone else.
            No marketing fluff.
          </p>
        </header>

        <section className="space-y-8">
          {QAS.map((qa, i) => (
            <article key={i} className="border-b border-gray-100 pb-8 last:border-b-0">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1B3A5C] mb-3">
                {qa.q}
              </h2>
              <p className="text-[15px] text-[#3F546B] leading-relaxed">{qa.a}</p>
            </article>
          ))}
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-[#64748B] leading-relaxed">
            Question not answered here? Email{" "}
            <a
              href="mailto:hello@breezehw.com"
              className="text-[#2DD4A8] hover:underline font-medium"
            >
              hello@breezehw.com
            </a>{" "}
            with what you&apos;re building. We reply with substance, not a discovery-call calendar link.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/tools/bom-estimator"
              className="px-4 py-2 rounded-lg bg-[#1B3A5C] text-white font-medium hover:bg-[#1B3A5C]/90 transition-colors"
            >
              Try BOM Estimator →
            </Link>
            <Link
              href="/tools/nre-simulator"
              className="px-4 py-2 rounded-lg border border-gray-200 text-[#1B3A5C] font-medium hover:border-[#2DD4A8] transition-colors"
            >
              NRE Simulator →
            </Link>
            <a
              href="/breeze-deck.pdf"
              className="px-4 py-2 rounded-lg border border-gray-200 text-[#1B3A5C] font-medium hover:border-[#2DD4A8] transition-colors"
            >
              Read the deck (PDF) →
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
