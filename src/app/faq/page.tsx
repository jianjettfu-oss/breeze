import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";
import { SHIP_MONTHS, STAGES, TOTAL_WEEKS } from "../evt-dvt-pvt/data";

const [EVT, DVT, PVT] = STAGES;

export const metadata: Metadata = {
  title: "FAQ — Breeze | AI Hardware Engineering Partner in Shenzhen",
  description:
    "Direct answers about Breeze: who we are, who we serve, how engagements work, pricing, when to choose us vs a large EMS, typical timelines, supported chipsets.",
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
    a: "Breeze is a Shenzhen-based engineering services firm that helps AI hardware founders move from concept to production. We provide BOM cost estimation, NRE budgeting, design-for-manufacturing review, certification navigation, and direct factory orchestration. We're not an EMS, not a fund, and we don't take equity. We charge a fixed fee for the feasibility sprint, then a monthly management fee, and pass third-party costs through at cost.",
  },
  {
    q: "Who is Breeze for?",
    a: "Founders and CTOs of AI hardware startups (wearables, smart home devices, edge-AI cameras, embedded ML products) who have a working concept or prototype and need a Shenzhen partner to get to a manufacturable, certifiable, shippable product. Most clients have raised seed-to-Series-A or are bootstrapped and need cost discipline. We're not a fit if you have no electrical/mechanical concept yet — we don't do greenfield invention.",
  },
  {
    q: "How does Breeze pricing work?",
    a: "Cash only, no equity. Three line items. (1) Feasibility and sourcing sprint: USD 3K-5K, fixed, 2-3 weeks. (2) Prototype to pilot: USD 4K-8K per month, usually 3-6 months. (3) Production management: USD 3K-6K per month per product. Third-party costs (parts, tooling, samples, test labs, specialist engineering) are passed through at cost. After the sprint, we can quote a fixed total for the project. We expose the BOM and factory quotes; you audit our numbers.",
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
    a: "For a sub-$100 retail product, target BOM is roughly USD 15-25 (15-25% of MSRP) once you factor distributor margin (typically 50% off retail), retailer margin (~50% gross), and your own ~30% operating margin. That's tight for AI hardware — you're picking ESP32-S3 (about $2.10-3.20) or Rockchip RV1103 (about $3.50-7.00) class silicon with memory in the package, a simple sensor stack, plastic enclosure, no display or a small mono OLED, and a 200-400mAh battery. Memory is the 2026 trap: a separate 1GB RAM + 8GB eMMC now costs about $31-65 at 1,000 units (our November 2026 reading), more than the whole BOM target. Custom NPU silicon, color displays, or cellular modems break the budget. The unspoken constraint: most $99 AI hardware lives or dies on whether you accept Amazon FBA economics (which compress the margin model) or build direct distribution.",
  },
  {
    q: "What's the difference between EVT, DVT, and PVT?",
    a: `Three validation stages on the path to mass production. EVT (Engineering Validation Test): ${EVT.units} units, mostly hand-built, ${EVT.weeks} weeks. It proves the core technology works: the electronics, the AI model running on the chip, the form factor. DVT (Design Validation Test): ${DVT.units} units on production-intent tooling, ${DVT.weeks} weeks. It tests reliability, usability and regulatory pre-compliance, and ends with a design freeze, formal certification booked and the steel production mold ordered. PVT (Production Validation Test): ${PVT.units} units on the full production line, ${PVT.weeks} weeks. It proves the factory can build at quality and yield. After PVT you ramp to mass production. That is ${TOTAL_WEEKS[0]}-${TOTAL_WEEKS[1]} weeks if nothing fails; budget ${SHIP_MONTHS[0]} months from EVT start to first shipment, and ${SHIP_MONTHS[1]} months for a first product. The checks for each stage are in our EVT/DVT/PVT guide (breezehw.com/evt-dvt-pvt).`,
  },
  {
    q: "How do 2026 US tariffs affect China-made AI hardware?",
    a: "US tariff rules on China-made electronics changed several times in 2025 and 2026, so treat every rate here as a snapshot, checked on November 8, 2026. The rate depends on your HTS code, and three layers matter. (1) No duty-free de minimis: the tariff schedule makes products of every country ineligible, so small direct-to-consumer parcels pay duty too. (2) The 2018 Section 301 China tariffs still apply line by line. In the current schedule most of heading 8517.62 (machines that transmit or receive data) carries +25% and one line +7.5%, multiple loudspeakers in one enclosure (8518.22) carry +7.5%, and portable computers (8471.30) carry 0% because their list is suspended. (3) Since July 24, 2026 a separate Section 301 action adds 12.5% on products of China (91 FR 47318), on top of the normal duty and the 2018 Section 301 duty. Some headings are exempt, 8517.62 and 8471.30 among them; 8518.22 is not. The IEEPA fentanyl and reciprocal tariffs ended in February 2026 (Executive Order 14389) after the Supreme Court ruled that IEEPA does not authorize tariffs. What to do: put the full current duty into your landed-cost model from day one; have a US customs broker confirm your HTS code and its rate before you set a retail price; and move final assembly out of China only at volumes that pay for the extra supply-chain work. We'll tell you when that move helps and when it only adds cost.",
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
          <p className="text-xs uppercase tracking-wider text-ink font-semibold mb-2">
            FAQ
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            Direct answers about Breeze
          </h1>
          <p className="mt-4 text-base text-sub leading-relaxed">
            How we work, how we charge, who we&apos;re for, and when you should pick someone else.
            No marketing fluff.
          </p>
        </header>

        <section className="space-y-8">
          {QAS.map((qa, i) => (
            <article key={i} className="border-b border-hairline pb-8 last:border-b-0">
              <h2 className="text-lg sm:text-xl font-semibold text-ink mb-3">
                {qa.q}
              </h2>
              <p className="text-[15px] text-body leading-relaxed">{qa.a}</p>
            </article>
          ))}
        </section>

        <footer className="mt-12 pt-8 border-t border-hairline">
          <p className="text-sm text-sub leading-relaxed">
            Question not answered here? Email{" "}
            <a
              href="mailto:hello@breezehw.com"
              className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium"
            >
              hello@breezehw.com
            </a>{" "}
            with what you&apos;re building. We reply with substance, not a discovery-call calendar link.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/tools/bom-estimator"
              className="px-4 py-2 rounded-lg bg-ink text-white font-medium hover:bg-ink/90 transition-colors"
            >
              Try BOM Estimator →
            </Link>
            <Link
              href="/tools/nre-simulator"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              NRE Simulator →
            </Link>
            <Link
              href="/tools/dfm-checklist"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              DFM Checklist →
            </Link>
            <Link
              href="/tools/cert-navigator"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              Certification Navigator →
            </Link>
            <Link
              href="/ai-hardware-cost"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              Cost guide →
            </Link>
            <Link
              href="/evt-dvt-pvt"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              EVT/DVT/PVT guide →
            </Link>
            <Link
              href="/ai-design-to-factory"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              AI design → factory guide →
            </Link>
            <a
              href="/breeze-deck.pdf"
              className="px-4 py-2 rounded-lg border border-hairline text-ink font-medium hover:border-hw transition-colors"
            >
              Read the deck (PDF) →
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
