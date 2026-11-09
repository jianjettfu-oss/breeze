import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";
import { categories, volumeMultipliers } from "../tools/bom-estimator/data";
import { BUILDS, FIXED, part, range, usd } from "./builds";
import { nreCategories, timelineEstimates } from "../tools/nre-simulator/data";
import { certifications } from "../tools/cert-navigator/data";

/*
 * Every number on this page is computed from the tool data modules above, with the same
 * arithmetic as the BOM estimator (selected parts + fixed costs, times the volume factor).
 * There is no hand-kept copy here: update the tool data and this page follows.
 */

const PAGE_URL = "https://breezehw.com/ai-hardware-cost";
const TITLE = "How much does it cost to build an AI hardware device? (2026)";
const DESCRIPTION =
  "Per-unit cost for three example AI devices at 1,000 units, the one-time engineering, tooling and certification costs, what volume does to price, and why memory is the line to watch in 2026.";
const PUBLISHED = "2026-11-08";

export const metadata: Metadata = {
  title: `${TITLE} | Breeze`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "article" },
};

const NRE_ROWS = nreCategories.map((c) => ({
  label: c.label,
  low: Math.min(...c.options.map((o) => o.low)),
  high: Math.max(...c.options.map((o) => o.high)),
  weeks: timelineEstimates[c.id]?.weeks,
}));
const NRE_LOW = NRE_ROWS.reduce((s, r) => s + r.low, 0);
const NRE_HIGH = NRE_ROWS.reduce((s, r) => s + r.high, 0);

const CERTS = ["fcc", "ce", "un383"]
  .map((id) => certifications.find((c) => c.id === id))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const [voice, camera, display] = BUILDS;
const MEM_MID = part("memory", "mem_mid").cost;

const ARTICLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: "Breeze", url: "https://breezehw.com" },
  publisher: {
    "@type": "Organization",
    name: "Breeze",
    logo: { "@type": "ImageObject", url: "https://breezehw.com/breeze-logo.png" },
  },
};

const h2 = "text-2xl font-semibold text-ink mt-14 mb-4";
const p = "text-[15px] text-body leading-relaxed mb-4";
const a = "text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium";
const th = "py-2 pr-3 font-semibold";
const td = "py-2 pr-3";

export default function AiHardwareCost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSONLD) }}
      />
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-wider text-ink font-semibold mb-2">
            Cost guide · November 2026
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            How much does it cost to build an AI hardware device?
          </h1>
        </header>

        <section className="rounded-xl bg-panel border border-hairline p-5 mb-8">
          <h2 className="text-sm font-semibold text-ink mb-2">Short answer</h2>
          <p className="text-[15px] text-body leading-relaxed">
            You pay twice: once per unit, and once before the first unit ships. At 1,000 units our
            estimator puts a simple voice pendant at about {usd(voice.unit.mid)} per unit and a camera
            device at about {usd(camera.unit.mid)}, before freight and duty. One-time costs for
            design, tooling, prototypes and certification range from about {usd(NRE_LOW)}, if every
            line takes its cheapest single option, to about {usd(NRE_HIGH)}, if every line takes its
            most expensive one. Your own choices fall in between, and the{" "}
            <Link href="/tools/nre-simulator" className={a}>
              NRE Quote Simulator
            </Link>{" "}
            adds them up. Watch memory in 2026: it is {camera.memoryShare}% of the camera
            device&apos;s unit cost.
          </p>
        </section>

        <p className={p}>
          The numbers come from the same data as our free{" "}
          <Link href="/tools/bom-estimator" className={a}>
            BOM Cost Estimator
          </Link>{" "}
          and{" "}
          <Link href="/tools/nre-simulator" className={a}>
            NRE Quote Simulator
          </Link>
          , which is published as open data on{" "}
          <a href="https://github.com/jianjettfu-oss/ai-hardware-toolkit" className={a} rel="noopener">
            GitHub
          </a>
          . They are Shenzhen prices for planning, not quotes. Each range shows low, middle and high.
        </p>

        <h2 className={h2}>Per-unit cost: three example devices</h2>
        <p className={p}>
          Each total is the parts listed plus the costs every device carries: PCB, enclosure,
          assembly, test, passives and power management ({range(FIXED)} together).
        </p>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="text-left text-ink border-b border-hairline">
                <th className={th}>Device</th>
                <th className={th}>Main parts</th>
                <th className={th}>Per unit at 1,000</th>
                <th className="py-2 font-semibold">Memory share</th>
              </tr>
            </thead>
            <tbody>
              {BUILDS.map((b) => (
                <tr key={b.name} className="align-top border-b border-hairline text-body">
                  <td className={`${td} font-medium text-ink`}>
                    {b.name}
                    <div className="font-normal text-xs text-sub mt-1">{b.use}</div>
                  </td>
                  <td className={td}>{b.parts.map((x) => x.label).join(" · ")}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    <span className="font-medium text-ink">{usd(b.unit.mid)}</span>
                    <div className="text-xs text-sub">{range(b.unit)}</div>
                  </td>
                  <td className="py-2">{b.memoryShare}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={p}>
          A common rule of thumb puts retail at four to six times the unit cost, so the voice pendant
          sells for roughly {usd(voice.unit.mid * 4)}–{usd(voice.unit.mid * 6)} and the screen
          device for {usd(display.unit.mid * 4)}–{usd(display.unit.mid * 6)}. The $99 question in
          the{" "}
          <Link href="/faq" className={a}>
            FAQ
          </Link>{" "}
          walks through the margins behind that rule.
        </p>

        <h2 className={h2}>Memory is the line to watch in 2026</h2>
        <p className={p}>
          Legacy DRAM and eMMC cost many times what they did in early 2025. The press, quoting
          DRAMeXchange, put the DDR4 8Gb contract price at about $1.35 in March 2025 and about
          $27.50 in October 2026. The prices below are our November 2026 readings at about 1,000
          units. Confidence is low, the 2GB + 32GB row is an estimate, and allocation can
          matter more than price. Get quotes before you fix a retail price.
        </p>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="text-left text-ink border-b border-hairline">
                <th className={th}>Memory</th>
                <th className={th}>Per unit at 1,000</th>
                <th className="py-2 font-semibold">Typical use</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .find((c) => c.id === "memory")
                ?.options.map((o) => (
                  <tr key={o.id} className="align-top border-b border-hairline text-body">
                    <td className={`${td} font-medium text-ink whitespace-nowrap`}>{o.label}</td>
                    <td className={`${td} whitespace-nowrap`}>
                      {usd(o.cost.mid)} <span className="text-xs text-sub">({range(o.cost)})</span>
                    </td>
                    <td className="py-2">{o.description.split(".")[0]}.</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className={p}>
          For a product under $100, choose a chip or module that carries its memory in the package,
          such as an ESP32-S3 module with PSRAM or a Rockchip RV1103. Our FAQ puts the parts budget
          of a $99 product at about $15–25, and a separate 1GB of RAM plus 8GB of eMMC costs{" "}
          {range(MEM_MID)} on its own. How each range was built is in the notes column of the{" "}
          <a
            href="https://github.com/jianjettfu-oss/ai-hardware-toolkit/blob/main/bom-cost-reference/shenzhen-component-pricing.csv"
            className={a}
            rel="noopener"
          >
            pricing data
          </a>
          .
        </p>

        <h2 className={h2}>What volume does to unit cost</h2>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[420px]">
            <thead>
              <tr className="text-left text-ink border-b border-hairline">
                <th className={th}>Volume</th>
                <th className={th}>Factor</th>
                <th className="py-2 font-semibold">Voice pendant, middle estimate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(volumeMultipliers).map(([k, v]) => (
                <tr key={k} className="border-b border-hairline text-body">
                  <td className={`${td} font-medium text-ink`}>{v.label}</td>
                  <td className={td}>×{v.factor}</td>
                  <td className="py-2">{usd(voice.unit.mid * v.factor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={p}>
          Below 1,000 units every line costs more, because suppliers price small runs higher and
          setup costs are spread over fewer units. A pilot of 50–500 units is still worth running
          first. It is where assembly and test problems show up while they are cheap to fix.
        </p>

        <h2 className={h2}>One-time costs before the first unit ships</h2>
        <p className={p}>
          Not every project needs every line, and the phases overlap, so the weeks do not add up end
          to end.
        </p>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[480px]">
            <thead>
              <tr className="text-left text-ink border-b border-hairline">
                <th className={th}>Line</th>
                <th className={th}>Range</th>
                <th className="py-2 font-semibold">Typical duration</th>
              </tr>
            </thead>
            <tbody>
              {NRE_ROWS.map((r) => (
                <tr key={r.label} className="border-b border-hairline text-body">
                  <td className={`${td} font-medium text-ink`}>{r.label}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    {usd(r.low)}–{usd(r.high)}
                  </td>
                  <td className="py-2">{r.weeks ? `${r.weeks} weeks` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>Certification for a US and EU launch</h2>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[480px]">
            <thead>
              <tr className="text-left text-ink border-b border-hairline">
                <th className={th}>Certification</th>
                <th className={th}>Cost</th>
                <th className="py-2 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {CERTS.map((c) => (
                <tr key={c.id} className="border-b border-hairline text-body">
                  <td className={`${td} font-medium text-ink`}>
                    {c.name} <span className="font-normal text-xs text-sub">({c.region})</span>
                  </td>
                  <td className={`${td} whitespace-nowrap`}>
                    {usd(c.cost.low)}–{usd(c.cost.high)}
                  </td>
                  <td className="py-2">{c.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={p}>
          For connected or body-worn devices sold in the EU, cybersecurity testing to EN 18031 is
          now part of CE and is not in the range above. The{" "}
          <Link href="/tools/cert-navigator" className={a}>
            Certification Navigator
          </Link>{" "}
          covers other markets and the EU rules that reach back into the design.
        </p>

        <h2 className={h2}>From factory price to landed cost</h2>
        <p className={p}>
          Everything above is the price in Shenzhen. Freight, import duty and fees come on top. For
          US imports, duty depends on the HTS code and has several layers for China-made
          electronics; our{" "}
          <Link href="/faq" className={a}>
            tariff answer
          </Link>{" "}
          lists them as of November 2026. Put the full duty into your cost model from the start.
        </p>

        <footer className="mt-12 pt-8 border-t border-hairline">
          <p className="text-sm text-sub leading-relaxed">
            Breeze runs prototype-to-production projects for AI hardware teams from Shenzhen. We
            charge a fixed fee for the feasibility sprint, then a monthly management fee, and pass
            third-party costs through at cost. If you want these numbers for your own device,{" "}
            <Link href="/#contact" className={a}>
              tell us what you&apos;re building
            </Link>
            .
          </p>
          <p className="mt-4 text-xs text-sub">
            Published {PUBLISHED} by Breeze. Computed from the tool data on the date of the last site
            build.
          </p>
        </footer>
      </main>
    </>
  );
}
