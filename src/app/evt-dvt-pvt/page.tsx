import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";
import { STAGES, TIMELINE_NOTE, TOTAL_WEEKS, pretty } from "./data";

const PAGE_URL = "https://breezehw.com/evt-dvt-pvt";
const TITLE = "EVT, DVT and PVT for AI hardware: what each stage must prove";
const DESCRIPTION =
  "What EVT, DVT and PVT each prove, how many units and weeks they take, the checks that matter most for AI devices, and when to stop instead of moving on.";
const PUBLISHED = "2026-11-08";

export const metadata: Metadata = {
  title: `${TITLE} | Breeze`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "article" },
};

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

const CHECKLIST_URL =
  "https://github.com/jianjettfu-oss/ai-hardware-toolkit/blob/main/evt-dvt-pvt-checklist/validation-stages.md";

const h2 = "text-2xl font-semibold text-ink mt-14 mb-4";
const h3 = "text-lg font-semibold text-ink mt-8 mb-2";
const p = "text-[15px] text-body leading-relaxed mb-4";
const a = "text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium";
const th = "py-2 pr-3 font-semibold";
const td = "py-2 pr-3";

const [evt, dvt, pvt] = STAGES;
const range = (s: string) => s.replace("-", "–");
const STOP_LABEL: Record<string, string> = {
  EVT: "Do not start DVT if: ",
  DVT: "Do not start PVT if: ",
  PVT: "Do not ship if: ",
};

export default function EvtDvtPvt() {
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
            Validation guide · November 2026
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            EVT, DVT and PVT for AI hardware: what each stage must prove
          </h1>
        </header>

        <section className="rounded-xl bg-panel border border-hairline p-5 mb-8">
          <h2 className="text-sm font-semibold text-ink mb-2">Short answer</h2>
          <p className="text-[15px] text-body leading-relaxed">
            EVT proves the technology works. DVT proves the design survives real use and is ready
            for certification. PVT proves the factory can build it the same way every time. In our
            checklist that is {range(evt.units)} units over {range(evt.weeks)} weeks,{" "}
            {range(dvt.units)} units over {range(dvt.weeks)} weeks, then {range(pvt.units)} units
            over {range(pvt.weeks)} weeks: {TOTAL_WEEKS[0]}–{TOTAL_WEEKS[1]} weeks if nothing
            fails. Budget 6 months from the start of EVT to the first shipment. For a first product,
            9 months is more realistic.
          </p>
        </section>

        <p className={p}>
          This page is a short version of the open{" "}
          <a href={CHECKLIST_URL} className={a} rel="noopener">
            validation checklist
          </a>{" "}
          in our AI Hardware Toolkit. It lists the checks we would least want a team to skip on an
          AI device, with the pass criteria from that checklist. Treat the criteria as starting
          targets and set your own from the product spec.
        </p>

        <h2 className={h2}>The three stages at a glance</h2>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="text-left text-ink border-b border-hairline">
                <th className={th}>Stage</th>
                <th className={th}>Units</th>
                <th className={th}>Weeks</th>
                <th className={th}>How it is built</th>
                <th className="py-2 font-semibold">You come out with</th>
              </tr>
            </thead>
            <tbody>
              {STAGES.map((s) => (
                <tr key={s.name} className="align-top border-b border-hairline text-body">
                  <td className={`${td} font-medium text-ink`}>
                    {s.name}
                    <div className="font-normal text-xs text-sub mt-1">{s.full}</div>
                  </td>
                  <td className={`${td} whitespace-nowrap`}>{range(s.units)}</td>
                  <td className={`${td} whitespace-nowrap`}>{range(s.weeks)}</td>
                  <td className={td}>{s.assembly}</td>
                  <td className="py-2">{s.deliverable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={p}>{pretty(TIMELINE_NOTE)}</p>

        <h2 className={h2}>What AI hardware adds</h2>
        <p className={p}>
          A simple gadget mostly has to power on, connect and survive a drop. An AI device has
          three more ways to fail. The model can lose accuracy once it is compressed to fit the
          chip. The chip can overheat when inference runs for half an hour, not half a minute. And
          the firmware has to update itself in the field without bricking units. The checks below
          test all three, at the stage where a fix is still cheap.
        </p>

        {STAGES.map((s) => (
          <section key={s.name}>
            <h2 className={h2}>
              {s.name}: {s.full}
            </h2>
            <p className={p}>{pretty(s.goal)}</p>
            <div className="overflow-x-auto -mx-6 px-6 mb-4">
              <table className="w-full text-sm border-collapse min-w-[520px]">
                <thead>
                  <tr className="text-left text-ink border-b border-hairline">
                    <th className={th}>#</th>
                    <th className={th}>Check</th>
                    <th className="py-2 font-semibold">Pass criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {s.checks.map((c) => (
                    <tr key={c.code} className="align-top border-b border-hairline text-body">
                      <td className={`${td} text-xs text-sub`}>{c.code}</td>
                      <td className={`${td} font-medium text-ink`}>{c.check}</td>
                      <td className="py-2">{pretty(c.criteria)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-lg border-l-4 border-caution bg-caution/5 px-4 py-3 mb-4">
              <p className="text-sm text-body leading-relaxed">
                <span className="font-semibold text-ink">{STOP_LABEL[s.name]}</span>
                {pretty(s.stopIf)}
              </p>
            </div>
          </section>
        ))}

        <h2 className={h2}>Where the money goes</h2>
        <p className={p}>
          EVT units are hand-built in small numbers, so each one costs more than the per-unit
          figures in our{" "}
          <Link href="/ai-hardware-cost" className={a}>
            cost guide
          </Link>
          , whose volume table starts at 500 units. The large one-time costs land in these stages:
          prototypes in EVT, then certification testing and the steel production mold, which are
          booked and ordered as DVT closes. The cost guide and the{" "}
          <Link href="/tools/nre-simulator" className={a}>
            NRE Quote Simulator
          </Link>{" "}
          give the ranges.
        </p>

        <h2 className={h2}>Four common mistakes</h2>
        <h3 className={h3}>Calling it a prototype and skipping EVT</h3>
        <p className={p}>
          Without structured tests, basic problems surface during certification, which is the
          most expensive place to find them.
        </p>
        <h3 className={h3}>Leaving reliability tests out of DVT</h3>
        <p className={p}>
          Drop tests and temperature cycling find the weak points that would otherwise come back as
          field returns.
        </p>
        <h3 className={h3}>Changing the design during PVT</h3>
        <p className={p}>
          If the PCB is still changing, you are in DVT, not PVT. Go back a stage instead of
          building production units on a moving design.
        </p>
        <h3 className={h3}>Shipping before OTA is proven</h3>
        <p className={p}>
          Your first update to real customers will find every edge case you missed. Run it on PVT
          units first, and keep the update server live before the first unit ships.
        </p>

        <h2 className={h2}>The full checklist</h2>
        <p className={p}>
          The{" "}
          <a href={CHECKLIST_URL} className={a} rel="noopener">
            complete checklist
          </a>{" "}
          has every check with its notes, and the exit criteria for each stage. It is MIT
          licensed. If you work with an AI coding agent, the same checklist ships as the{" "}
          <code className="text-[13px]">hardware-validation-gates</code> skill in the{" "}
          <a href="https://github.com/jianjettfu-oss/ai-hardware-toolkit" className={a} rel="noopener">
            toolkit&apos;s Claude Code plugin
          </a>
          . For certification, see the{" "}
          <Link href="/tools/cert-navigator" className={a}>
            Certification Navigator
          </Link>
          ; for a design check before EVT, see the{" "}
          <Link href="/tools/dfm-checklist" className={a}>
            DFM Checklist
          </Link>
          .
        </p>

        <footer className="mt-12 pt-8 border-t border-hairline">
          <p className="text-sm text-sub leading-relaxed">
            Breeze runs prototype-to-production projects for AI hardware teams from Shenzhen,
            including the EVT, DVT and PVT builds. We charge a fixed fee for the feasibility sprint,
            then a monthly management fee, and pass third-party costs through at cost. If you are
            planning a build,{" "}
            <Link href="/#contact" className={a}>
              tell us what you&apos;re building
            </Link>
            .
          </p>
          <p className="mt-4 text-xs text-sub">
            Published {PUBLISHED} by Breeze. Stage figures and check criteria come from the open
            toolkit checklist and are checked against it.
          </p>
        </footer>
      </main>
    </>
  );
}
