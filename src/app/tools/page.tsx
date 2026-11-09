import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";
import { links } from "@/components/ToolCrossLinks";

export const metadata: Metadata = {
  title: "Free AI Hardware Tools — BOM, NRE, DFM, Certification | Breeze",
  description:
    "Four free tools for AI hardware founders: BOM cost per unit, one-time NRE cost, a DFM checklist, and the certifications your product needs by market.",
  alternates: { canonical: "https://breezehw.com/tools" },
  openGraph: {
    title: "Free AI Hardware Tools — Breeze",
    description:
      "BOM cost, NRE cost, DFM checklist and certification paths for AI hardware, with the data open on GitHub.",
    url: "https://breezehw.com/tools",
    type: "website",
  },
};

export default function ToolsIndex() {
  const tools = links.filter((l) => l.slug !== "faq");

  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-wider text-ink font-semibold mb-2">
            Tools
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            Free tools for AI hardware founders
          </h1>
          <p className="mt-4 text-base text-sub leading-relaxed">
            Four free tools, no sign-up. The reference data behind them (component prices,
            engineering rates, certification costs and timelines) is open on{" "}
            <a
              href="https://github.com/jianjettfu-oss/ai-hardware-toolkit"
              className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium"
            >
              GitHub
            </a>
            , so you can check them before you rely on them.
          </p>
        </header>

        <ul className="grid gap-5 sm:grid-cols-2">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link
                href={t.href}
                className="block h-full rounded-xl border border-hairline p-6 hover:border-hw transition-colors"
              >
                <h2 className="text-lg font-semibold text-ink">{t.title} →</h2>
                <p className="mt-2 text-sm text-sub leading-relaxed">{t.desc}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-sub leading-relaxed">
          Want the numbers worked through for three example devices? Read{" "}
          <Link href="/ai-hardware-cost" className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium">
            what an AI hardware device costs to build
          </Link>
          . Planning prototype builds? See{" "}
          <Link href="/evt-dvt-pvt" className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium">
            what EVT, DVT and PVT must each prove
          </Link>
          . Drew your design with AI tools? Read{" "}
          <Link href="/ai-design-to-factory" className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium">
            what to check before it goes to a factory
          </Link>
          . Questions about fees, timelines or minimum runs? See the{" "}
          <Link href="/faq" className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium">
            FAQ
          </Link>
          , or{" "}
          <Link href="/#contact" className="text-ink underline decoration-hw decoration-2 underline-offset-4 font-medium">
            tell us what you&apos;re building
          </Link>
          .
        </p>
      </main>
    </>
  );
}
