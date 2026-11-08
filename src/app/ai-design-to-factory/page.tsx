import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";
import { HANDOFF, LAYERS, SOURCES, WHERE_AI_IS, type Source } from "./data";

const PAGE_URL = "https://breezehw.com/ai-design-to-factory";
const TITLE = "What to check before an AI-made hardware design goes to a factory (2026)";
const DESCRIPTION =
  "AI tools now produce CAD, schematics, layouts and firmware that pass automated checks. What they miss, the published failures, and a three-layer checklist before you pay for tooling.";
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

const h2 = "text-2xl font-semibold text-[#1B3A5C] mt-14 mb-4";
const p = "text-[15px] text-[#3F546B] leading-relaxed mb-4";
const a = "text-[#2DD4A8] hover:underline font-medium";

function Cite({ s }: { s: Source }) {
  return (
    <a href={s.href} className={a} rel="noopener">
      {s.label}
    </a>
  );
}

export default function AiDesignToFactory() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSONLD) }}
      />
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-wider text-[#2DD4A8] font-semibold mb-2">
            Guide · November 2026
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] leading-tight">
            What to check before an AI-made hardware design goes to a factory
          </h1>
        </header>

        <section className="rounded-xl bg-gray-50 border border-gray-100 p-5 mb-8">
          <h2 className="text-sm font-semibold text-[#1B3A5C] mb-2">Short answer</h2>
          <p className="text-[15px] text-[#3F546B] leading-relaxed">
            AI tools can now draw CAD models, schematics, board layouts and firmware that open cleanly
            and pass automated checks. They are still weak where only the physical world has the
            answer: heat inside the enclosure, how parts fit, whether a mold can be built, whether
            the radio works, whether the board survives its first power-on. Review in three layers.
            Clear what a machine can check before you ask for quotes. Plan prototypes for what only a
            physical test answers. Get an experienced engineer to sign off the rest.
          </p>
        </section>

        <p className={p}>
          These tools change month to month. Everything below is as of November 2026, and every
          number links to where it came from. Most come from small samples or from authors testing
          their own methods. Vendors publish efficiency figures too; none of the ones we found had
          been reproduced independently, so we left them out.
        </p>

        <h2 className={h2}>Where AI design tools are today</h2>
        <p className={p}>
          One pattern runs through mechanical, electronics and firmware. AI does well where a
          machine can check its output: a compiler, a design-rule checker, a CAD kernel, a
          simulator. It does badly where the check is a physical prototype.
        </p>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="text-left text-[#1B3A5C] border-b border-gray-200">
                <th className="py-2 pr-3 font-semibold">Step</th>
                <th className="py-2 pr-3 font-semibold">Works for</th>
                <th className="py-2 pr-3 font-semibold">Breaks on</th>
                <th className="py-2 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {WHERE_AI_IS.map((r) => (
                <tr key={r.step} className="align-top border-b border-gray-100 text-[#3F546B]">
                  <td className="py-2 pr-3 font-medium text-[#1B3A5C]">{r.step}</td>
                  <td className="py-2 pr-3">{r.works}</td>
                  <td className="py-2 pr-3">{r.breaks}</td>
                  <td className="py-2">
                    {r.sources.map((s, i) => (
                      <span key={s.href}>
                        {i > 0 && ", "}
                        <Cite s={s} />
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>Four published failures worth knowing</h2>

        <h3 className="text-lg font-semibold text-[#1B3A5C] mt-6 mb-2">
          A short that passed ERC
        </h3>
        <p className={p}>
          JLCPCB published a full walkthrough of a buck converter board drawn with Claude Code
          through a KiCad MCP server. The layout ended clean on ERC and DRC. Along the way they
          logged seven problems, some caused by the AI and some by the server. The worst: two net
          labels overlapped and shorted ISENSE to ISET. ERC flagged it as a warning, not an error.
          They found it only by comparing the exported netlist pin by pin. The board was never
          built or powered. Source: <Cite s={SOURCES.jlcpcb} />.
        </p>

        <h3 className="text-lg font-semibold text-[#1B3A5C] mt-6 mb-2">
          A gear that came back simplified
        </h3>
        <p className={p}>
          Xometry gave seven text-to-CAD tools the same three prompts. Simple round parts worked. A
          24-tooth gear failed or came back simplified, and a manifold block came back empty or
          simplified. Each prompt got one try, on free plans. Xometry sells manufacturing, so it has
          a stake in the answer. Source: <Cite s={SOURCES.xometry} />.
        </p>

        <h3 className="text-lg font-semibold text-[#1B3A5C] mt-6 mb-2">
          A knob with no clean result
        </h3>
        <p className={p}>
          An engineering.com reporter fed a mesh-to-CAD tool a mesh of a toaster-oven knob. None of
          the five results was free of errors. A simpler adapter ring did come out right in one
          mode. Source: <Cite s={SOURCES.engineering} />.
        </p>

        <h3 className="text-lg font-semibold text-[#1B3A5C] mt-6 mb-2">
          CAD that runs, in the wrong shape
        </h3>
        <p className={p}>
          In the CadBench benchmark, one image-to-CAD model produced programs that ran 95% of the
          time. The shapes they produced matched the target with an IoU of about 0.3. A file that
          opens in your CAD tool tells you very little about whether it is the part you asked for.
          Source: <Cite s={SOURCES.cadbench} />.
        </p>

        <p className={p}>
          Electronics benchmarks look contradictory for a related reason: they measure different
          things. A system with part lookup and checks built in scored pass@1 0.90 on constrained
          embedded schematic tasks (<Cite s={SOURCES.pcbgpt} />). On 300 open board-level tasks,
          the best model passed 8.15% (<Cite s={SOURCES.hwebench} />). The two numbers cannot be
          compared directly. Together they say that narrow, well-specified circuits are within
          reach and open-ended board design mostly is not.
        </p>

        <h2 className={h2}>The checklist</h2>
        <p className={p}>
          A factory prices what is in your files, so clear layer 1 before you ask for quotes. EVT and DVT
          are the first engineering and design prototype builds; our{" "}
          <Link href="/faq" className={a}>
            FAQ
          </Link>{" "}
          has the typical timing.
        </p>

        {LAYERS.map((layer) => (
          <section key={layer.id} className="mb-10" aria-labelledby={`layer-${layer.id}`}>
            <h3 id={`layer-${layer.id}`} className="text-xl font-semibold text-[#1B3A5C] mt-8 mb-1">
              {layer.title}
            </h3>
            <p className="text-sm text-[#64748B] mb-4">{layer.when}</p>
            {layer.groups.map((g, gi) => (
              <div key={g.name ?? gi} className="mb-5">
                {g.name && (
                  <p className="text-xs uppercase tracking-wider text-[#64748B] font-semibold mb-2">
                    {g.name}
                  </p>
                )}
                <ul className="space-y-3">
                  {g.items.map((it) => (
                    <li key={it.title} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 rounded border border-gray-300"
                      />
                      <span className="text-[15px] text-[#3F546B] leading-relaxed">
                        <span className="font-medium text-[#1B3A5C]">{it.title}</span>
                        {it.detail && <> {it.detail}</>}
                        {it.source && (
                          <>
                            {" "}
                            (<Cite s={it.source} />)
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        <h2 className={h2}>The handoff package a factory will ask for</h2>
        <div className="overflow-x-auto -mx-6 px-6 mb-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {HANDOFF.map((r) => (
                <tr key={r.item} className="align-top border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium text-[#1B3A5C] whitespace-nowrap">{r.item}</td>
                  <td className="py-2 text-[#3F546B]">{r.send}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>Free tools for each layer</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px] text-[#3F546B] mb-4">
          <li>
            <Link href="/tools/dfm-checklist" className={a}>
              DFM Checklist
            </Link>
            : 29 checks across thermal, RF, power, mechanical, PCB, firmware and certification. Layers 1 and 3.
          </li>
          <li>
            <Link href="/tools/cert-navigator" className={a}>
              Certification Navigator
            </Link>
            : which certifications apply in each market, with cost and time. Layer 3.
          </li>
          <li>
            <Link href="/tools/nre-simulator" className={a}>
              NRE Quote Simulator
            </Link>
            : what the prototypes, tooling and certification in layers 2 and 3 will cost.
          </li>
          <li>
            <Link href="/tools/bom-estimator" className={a}>
              BOM Cost Estimator
            </Link>
            : per-unit cost at your target volume, before you commit to the parts list.
          </li>
        </ul>
        <p className={p}>
          The same checklist as Markdown, to copy into your own repository:{" "}
          <a
            href="https://github.com/jianjettfu-oss/ai-hardware-toolkit/tree/main/ai-design-handoff"
            className={a}
            rel="noopener"
          >
            ai-hardware-toolkit on GitHub
          </a>
          . Corrections and new failure cases are welcome there as pull requests.
        </p>

        <footer className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-[#64748B] leading-relaxed">
            Breeze runs prototype-to-production projects for AI hardware teams from Shenzhen, and
            design-for-manufacturing review is part of that work. If you have files drawn with AI
            and want to know what to fix before you pay for tooling,{" "}
            <Link href="/#contact" className={a}>
              tell us what you&apos;re building
            </Link>
            .
          </p>
          <p className="mt-4 text-xs text-[#94A3B8]">
            Published {PUBLISHED} by Breeze. Numbers checked against their sources on {PUBLISHED}.
          </p>
        </footer>
      </main>
    </>
  );
}
