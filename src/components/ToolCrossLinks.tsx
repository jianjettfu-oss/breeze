import Link from "next/link";

export type ToolSlug = "bom-estimator" | "nre-simulator" | "dfm-checklist" | "cert-navigator";

export const links: { slug: ToolSlug | "faq"; href: string; title: string; desc: string }[] = [
  {
    slug: "bom-estimator",
    href: "/tools/bom-estimator",
    title: "BOM Cost Estimator",
    desc: "Pick your components and a volume; get a per-unit cost range.",
  },
  {
    slug: "nre-simulator",
    href: "/tools/nre-simulator",
    title: "NRE Quote Simulator",
    desc: "One-time cost: engineering, tooling, prototypes, certification.",
  },
  {
    slug: "dfm-checklist",
    href: "/tools/dfm-checklist",
    title: "DFM Checklist",
    desc: "29 checks to run before your files go to a factory.",
  },
  {
    slug: "cert-navigator",
    href: "/tools/cert-navigator",
    title: "Certification Navigator",
    desc: "Which certifications your product needs, by market, with cost and time.",
  },
  {
    slug: "faq",
    href: "/faq",
    title: "Hardware FAQ",
    desc: "Fees, timelines, minimum runs, tariffs, IP.",
  },
];

export const guide = {
  href: "/ai-design-to-factory",
  title: "Guide: AI-made design to factory",
  desc: "What AI design tools miss, and a checklist before you pay for tooling.",
};

export default function ToolCrossLinks({ current }: { current: ToolSlug }) {
  return (
    <section className="mt-16 pt-10 border-t border-gray-100" aria-labelledby="more-tools">
      <h2 id="more-tools" className="text-xl font-semibold text-[#1B3A5C] mb-5">
        Free tools and guides
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links
          .filter((l) => l.slug !== current)
          .map((l) => (
            <li key={l.slug}>
              <Link
                href={l.href}
                className="block h-full rounded-xl border border-gray-100 p-4 hover:border-[#2DD4A8] transition-colors"
              >
                <span className="block text-sm font-semibold text-[#1B3A5C]">{l.title} →</span>
                <span className="mt-1 block text-xs text-[#64748B] leading-relaxed">{l.desc}</span>
              </Link>
            </li>
          ))}
        <li>
          <Link
            href={guide.href}
            className="block h-full rounded-xl border border-gray-100 p-4 hover:border-[#2DD4A8] transition-colors"
          >
            <span className="block text-sm font-semibold text-[#1B3A5C]">{guide.title} →</span>
            <span className="mt-1 block text-xs text-[#64748B] leading-relaxed">{guide.desc}</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
