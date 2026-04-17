import { Nav } from "./components/nav";

/* ─── Icon components ─── */

function WindIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Data ─── */

const painPoints = [
  {
    title: "Factories won't take your 1K MOQ",
    desc: "Most factories want 10K+ units. We start at 1,000.",
  },
  {
    title: "Unpredictable NRE costs",
    desc: "You get a clear, fixed NRE quote before any work starts.",
  },
  {
    title: "IP leaks and design theft",
    desc: "NDA + IP assignment standard on every engagement. Your designs stay yours.",
  },
  {
    title: "Language and timezone barriers",
    desc: "Native English + Mandarin team. We work your hours.",
  },
  {
    title: "No DFM feedback until late",
    desc: "We run DFM checks at the design stage, not after you've committed to tooling.",
  },
  {
    title: "Certification maze",
    desc: "FCC, CE, UL, SRRC — we handle the paperwork, testing, and timeline.",
  },
];

const steps = [
  {
    num: "01",
    title: "Scoping",
    desc: "Share your concept. We assess feasibility, BOM, and ballpark cost.",
  },
  {
    num: "02",
    title: "Engineering Design",
    desc: "Schematic, PCB layout, mechanical design, firmware architecture.",
  },
  {
    num: "03",
    title: "DFM & Prototyping",
    desc: "Optimize for manufacturability. 3–5 functional prototypes.",
  },
  {
    num: "04",
    title: "Tooling & Sourcing",
    desc: "Injection molds, jigs, fixtures. Component sourcing from 3,000+ local suppliers.",
  },
  {
    num: "05",
    title: "Pilot Run",
    desc: "50–500 units. Test assembly line, QC process, packaging.",
  },
  {
    num: "06",
    title: "Mass Production",
    desc: "Scale to 1K, 10K, 100K+. Ongoing QC, logistics, fulfillment.",
  },
];

const tools = [
  {
    icon: "💰",
    title: "BOM Cost Estimator",
    desc: "Input your specs, get a manufacturing cost ballpark in 60 seconds.",
    cta: "Try it",
    href: "/tools/bom-estimator",
  },
  {
    icon: "✓",
    title: "DFM Checklist",
    desc: "30-point check for AI hardware design pitfalls.",
    cta: "Start check",
    href: "/tools/dfm-checklist",
  },
  {
    icon: "📋",
    title: "NRE Quote Simulator",
    desc: "Estimate development cost: engineering, tooling, prototyping.",
    cta: "Estimate",
    href: "/tools/nre-simulator",
  },
  {
    icon: "🗺",
    title: "Certification Navigator",
    desc: "FCC, CE, UL, SRRC — which do you need? Timeline + cost.",
    cta: "Navigate",
    href: "/tools/cert-navigator",
  },
];

const differentiators = [
  {
    title: "Whole Product",
    desc: "Not just parts. We build the full device — electronics, enclosure, firmware, packaging.",
  },
  {
    title: "No Equity",
    desc: "NRE + per-unit. Pure service. We don't take a piece of your company. Period.",
  },
  {
    title: "Your IP Stays Yours",
    desc: "NDA + IP assignment standard on every engagement. Full source files delivered.",
  },
  {
    title: "AI Hardware Native",
    desc: "We understand edge AI thermal management, antenna design, and battery optimization.",
  },
];

const stats = [
  { value: "3,000+", label: "Component suppliers in our network" },
  { value: "12 wk", label: "Average concept-to-prototype" },
  { value: "1K", label: "Minimum pilot run — no 10K gate" },
];

const team = [
  {
    name: "Jett Fu",
    role: "Founder & CEO",
    bio: "15+ years cross-border operator. Founded AirPop — smart air wearable launched at CES 2021, covered by Tom's Guide, Wired, and Digital Trends. US (Delaware) + HK + Singapore entities. Native English and Chinese. Based in Shenzhen.",
    avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Jett",
  },
  {
    name: "Jank Liu",
    role: "Supply Chain + Quality Lead",
    bio: "30 years across industrial valves, PCB, wire harness connectors, smart masks, and rail transit. GE Six Sigma Black Belt — led HX-5 rail NPI. Amphenol Medical cross-border supplier development and compliance lead. Alumni: Tyco, Amphenol, General Electric.",
    avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Jank",
  },
  {
    name: "Sky",
    role: "Engineering Lead",
    bio: "10+ years in Shenzhen consumer electronics supply chain. Prototype to mass production for wearables, IoT devices, and audio products. Ground-truth knowledge of the supplier network within 50 km of our office.",
    avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Sky",
  },
  {
    name: "Arting Chen",
    role: "Partnerships & Deal Flow",
    bio: "AI hardware incubator and investor network. Qualifies deal flow and connects AI hardware founders with Breeze. Direct relationships with YC/HAX-adjacent teams building their first physical product.",
    avatar: "https://api.dicebear.com/9.x/personas/svg?seed=ArtingChen&hair=fade&facialHair=shadow&facialHairProbability=100",
  },
];

const trackRecord = [
  {
    title: "AirPop Active+ Halo",
    subtitle: "World's first smart air wearable — CES 2021",
    desc: "Bluetooth respiratory sensor + iOS/Android app + certified mask manufacturing. Global retail launch via AirPopHealth direct and national retailers.",
    coverage: "Tom's Guide · Hypebeast · Digital Trends · Wired · ComputerWeekly",
  },
  {
    title: "Cross-Border Supply Chain Execution",
    subtitle: "Customs, logistics, international delivery",
    desc: "Deep fluency in import/export customs clearance, HS-code classification, commercial invoicing, multi-modal freight (ocean, air, rail), bonded warehouse coordination, and destination-country fulfillment into US, EU, LATAM, and APAC markets.",
    coverage: null,
  },
  {
    title: "EU Medical Packaging",
    subtitle: "Hospital surgical tray systems",
    desc: "Regulated medical device packaging — material sourcing, sterility validation, third-party lab testing, and full compliance documentation for EU hospital systems.",
    coverage: null,
  },
];

const comparisonRows = [
  { feature: "Scope", breeze: "Whole product", fictiv: "Parts only", hax: "Accelerator + parts", titoma: "Whole product", trading: "Sourcing only" },
  { feature: "Equity taken", breeze: "None", fictiv: "None", hax: "6–10%", titoma: "None", trading: "None" },
  { feature: "Minimum order", breeze: "1,000 units", fictiv: "1 unit (parts)", hax: "Varies", titoma: "~1,000", trading: "10,000+" },
  { feature: "Location", breeze: "Shenzhen", fictiv: "SF + global", hax: "SF + Shenzhen", titoma: "Taiwan", trading: "Shenzhen / Yiwu" },
  { feature: "AI hardware focus", breeze: "Yes", fictiv: "No", hax: "Some", titoma: "Generalist", trading: "No" },
  { feature: "Price transparency", breeze: "Tools upfront", fictiv: "Instant quote", hax: "Opaque", titoma: "Quote-based", trading: "Opaque" },
  { feature: "Language", breeze: "Native EN + ZH", fictiv: "EN", hax: "EN", titoma: "EN", trading: "Broken EN" },
  { feature: "IP policy", breeze: "Assignment standard", fictiv: "Assignment", hax: "Varies", titoma: "Case-by-case", trading: "Often unclear" },
  { feature: "Open-source toolkit", breeze: "Yes (4 tools)", fictiv: "No", hax: "No", titoma: "No", trading: "No" },
];

const pricingTiers = [
  {
    name: "Scoping",
    price: "Free",
    description: "Initial concept review. 30-minute call plus a one-page feasibility note.",
    items: [
      "Device feasibility assessment",
      "Ballpark BOM range",
      "Certification needs summary",
      "Timeline estimate",
    ],
    featured: false,
  },
  {
    name: "NRE + Pilot",
    price: "$50K – $150K",
    description: "Engineering to working prototype plus pilot batch. Fixed-price.",
    items: [
      "Schematic, PCB, mechanical, firmware architecture",
      "3–5 functional prototypes (EVT / DVT)",
      "Tooling, jigs, fixtures",
      "50–500 unit pilot run",
      "Full source files delivered",
    ],
    featured: true,
  },
  {
    name: "Production",
    price: "$15 – $60 / unit",
    description: "At 5K volume for typical AI wearables. Scales with volume and complexity.",
    items: [
      "1K – 100K+ unit runs",
      "Ongoing QC + yield optimization",
      "Logistics + fulfillment",
      "Global shipping",
      "Replenishment planning",
    ],
    featured: false,
  },
];

const timeline = [
  { week: "Week 1", phase: "Scoping", desc: "30-minute feasibility call + ballpark cost. Sign NDA." },
  { week: "Week 2–4", phase: "Engineering Design", desc: "Schematic, PCB layout, mechanical CAD, firmware architecture. Weekly sync." },
  { week: "Week 5–8", phase: "DFM + Prototyping", desc: "3–5 functional prototypes. DFM checks. EVT gate." },
  { week: "Week 9–10", phase: "Tooling + Sourcing", desc: "Injection molds, jigs, fixtures. Component sourcing from 3,000+ suppliers. DVT." },
  { week: "Week 11–12", phase: "Pilot Run", desc: "50–500 units. Test assembly line, QC process, packaging. PVT." },
  { week: "Week 13+", phase: "Production", desc: "Ongoing scale to 1K, 10K, 100K+. QC, logistics, fulfillment." },
];

const faqs = [
  {
    q: "How do you protect my IP?",
    a: "NDA + IP assignment is standard on every engagement — signed before any technical discussion. You receive full source files (schematics, PCB files, firmware, mechanical CAD, BOM) at the end of NRE. No hidden clauses, no exclusivity locks.",
  },
  {
    q: "What's a typical project cost?",
    a: "For most AI wearables and connected devices: NRE ranges from $50K to $150K, per-unit cost $15–$60 at 5K volume. Complexity (sensors, radios, battery chemistry, certifications) drives the range. Try the NRE Simulator for a tailored ballpark in 60 seconds.",
  },
  {
    q: "How long from signed contract to first prototype?",
    a: "8–12 weeks for most AI wearables, reaching a functional EVT prototype. Faster paths exist if you have a working PoC — we've turned around a DVT-ready design in under 6 weeks for projects with mature schematics.",
  },
  {
    q: "What if my pilot is under 1,000 units?",
    a: "Sub-1K orders require hand-assembly rather than full SMT lines. We can quote, but pricing structure differs — expect $30–$120 per unit at 200–500 volume. For a 100-unit dev run, we usually roll this into NRE.",
  },
  {
    q: "Can you work with my existing contractor or PCB house?",
    a: "Yes. We can join mid-stream, integrate your existing BOM, or coordinate with a fab you've already selected. We've also rescued stalled projects — if your current partner isn't delivering, tell us what's broken.",
  },
  {
    q: "Do you only work on AI hardware?",
    a: "AI hardware is our focus and default. We accept adjacent projects (consumer IoT, wearables, connected health devices) case-by-case. Pure mechanical products or under-500-unit hobby runs are usually a better fit elsewhere.",
  },
  {
    q: "What certifications do you handle?",
    a: "We run in-house pre-compliance (FCC Part 15, UN38.3 battery, CE RED pre-scan) and coordinate full testing through accredited labs — SGS, TÜV, ETL. Cert timeline and cost are budgeted into your NRE so there are no Week-11 surprises.",
  },
  {
    q: "What are your payment terms?",
    a: "NRE: 50% at kickoff, 50% on milestones (usually EVT + PVT gates). Per-unit production: standard T/T 30/70. All fixed-price — no T&M, no scope-creep billing. If scope changes, we scope it as a change order, not a surprise invoice.",
  },
];

/* ─── Page ─── */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Nav ── */}
      <Nav />

      {/* ── Section 1: Hero ── */}
      <section className="bg-breeze-deep text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <WindIcon className="w-5 h-5 text-breeze-teal" />
              <span className="text-breeze-teal text-sm font-semibold tracking-wide uppercase">
                Breeze
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Your Engineering Partner{" "}
              <span className="text-breeze-teal">for AI Hardware</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              From concept to production — BOM optimization, DFM, prototyping,
              and manufacturing. China supply chain expertise, global delivery.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 bg-breeze-teal text-breeze-deep px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-breeze-teal/90 transition-colors"
              >
                Estimate Your Product Cost
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-white/10 transition-colors"
              >
                Talk to Our Team
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-400 font-medium">
              No equity. No MOQ surprises. Just engineering.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Pain Points ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Building AI hardware is hard.
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Finding the right manufacturing partner shouldn&apos;t be.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="border border-gray-100 rounded-xl p-6 hover:border-breeze-teal/30 hover:shadow-sm transition-all"
              >
                <XIcon className="w-6 h-6 text-red-400 mb-3" />
                <h3 className="font-semibold text-breeze-navy text-base">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-breeze-slate leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Process ── */}
      <section id="process" className="bg-breeze-offwhite py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Concept to Production in 6 Steps
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              A clear, predictable path from your idea to manufactured product.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="text-5xl font-bold text-breeze-teal/20">
                  {step.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-breeze-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-breeze-slate leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Free Tools ── */}
      <section id="tools" className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Free Tools for AI Hardware Founders
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Plan your product before your first factory visit.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className="group border border-gray-100 rounded-xl p-8 hover:border-breeze-teal/40 hover:shadow-md transition-all block"
              >
                <span className="text-3xl">{tool.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-breeze-navy">
                  {tool.title}
                </h3>
                <p className="mt-2 text-breeze-slate leading-relaxed">
                  {tool.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 text-breeze-teal font-semibold text-sm group-hover:gap-2.5 transition-all">
                  {tool.cta}
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-breeze-slate">
            All tools are free to use. No sign-up required.
          </p>
        </div>
      </section>

      {/* ── Section 5: Open-Source Toolkit ── */}
      <section id="opensource" className="bg-breeze-offwhite py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border border-breeze-teal/30 bg-white rounded-2xl p-10 md:p-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-breeze-teal/10 text-breeze-teal text-xs font-semibold tracking-wide">
              OPEN SOURCE
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-breeze-navy leading-tight">
              We&apos;ve built AI devices in Shenzhen for 10+ years.
              <span className="block text-breeze-teal mt-2">
                We open-sourced our cost data.
              </span>
            </h2>
            <p className="mt-6 text-lg text-breeze-slate leading-relaxed max-w-3xl">
              BOM cost references, DFM checklists, NRE guidelines, certification
              playbooks — the same data we use every day, free on GitHub. No
              signup, no email gate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/jianjettfu-oss/ai-hardware-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-breeze-deep text-white px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-breeze-navy transition-colors"
              >
                View on GitHub
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 border border-breeze-navy/20 text-breeze-navy px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-breeze-navy/5 transition-colors"
              >
                Try the interactive tools
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Why Breeze ── */}
      <section id="why" className="bg-breeze-deep text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why founders choose Breeze
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((diff) => (
              <div key={diff.title}>
                <CheckIcon className="w-7 h-7 text-breeze-teal mb-3" />
                <h3 className="text-lg font-semibold">{diff.title}</h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid sm:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-breeze-teal">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Comparison Table ── */}
      <section id="compare" className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              How we compare
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Honest differences, not marketing fluff.
            </p>
          </div>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b-2 border-breeze-navy">
                  <th className="text-left py-4 pr-4 text-breeze-slate font-medium">
                    Feature
                  </th>
                  <th className="text-left py-4 px-4 font-bold text-breeze-navy bg-breeze-teal/10">
                    Breeze
                  </th>
                  <th className="text-left py-4 px-4 text-breeze-slate font-medium">
                    Fictiv / Xometry
                  </th>
                  <th className="text-left py-4 px-4 text-breeze-slate font-medium">
                    HAX / SOSV
                  </th>
                  <th className="text-left py-4 px-4 text-breeze-slate font-medium">
                    Titoma
                  </th>
                  <th className="text-left py-4 px-4 text-breeze-slate font-medium">
                    Trading Company
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-breeze-navy">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 bg-breeze-teal/5 font-semibold text-breeze-navy">
                      {row.breeze}
                    </td>
                    <td className="py-3 px-4 text-breeze-slate">{row.fictiv}</td>
                    <td className="py-3 px-4 text-breeze-slate">{row.hax}</td>
                    <td className="py-3 px-4 text-breeze-slate">{row.titoma}</td>
                    <td className="py-3 px-4 text-breeze-slate">{row.trading}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 8: Pricing Bands ── */}
      <section id="pricing" className="bg-breeze-offwhite py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Typical Project Costs
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Fixed-price at every stage. No T&amp;M. No scope-creep invoices.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-8 border ${
                  tier.featured
                    ? "border-breeze-teal bg-white shadow-md"
                    : "border-gray-200 bg-white"
                }`}
              >
                {tier.featured && (
                  <span className="inline-block mb-3 px-3 py-1 rounded-full bg-breeze-teal/10 text-breeze-teal text-xs font-semibold tracking-wide">
                    MOST ENGAGEMENTS
                  </span>
                )}
                <h3 className="text-xl font-semibold text-breeze-navy">
                  {tier.name}
                </h3>
                <p className="mt-2 text-3xl font-bold text-breeze-navy">
                  {tier.price}
                </p>
                <p className="mt-3 text-sm text-breeze-slate leading-relaxed">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm text-breeze-slate"
                    >
                      <CheckIcon className="w-5 h-5 text-breeze-teal flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-breeze-slate">
            Complexity (sensors, radios, battery chemistry, certifications)
            drives the final number. Try the{" "}
            <a
              href="/tools/nre-simulator"
              className="text-breeze-teal font-medium hover:underline"
            >
              NRE Simulator
            </a>{" "}
            for a tailored estimate in 60 seconds.
          </p>
        </div>
      </section>

      {/* ── Section 9: Engagement Timeline ── */}
      <section id="timeline" className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              What happens after you sign
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              A predictable 12-week path to pilot. Transparent weekly sync.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-4 right-4 h-0.5 bg-breeze-teal/20" />
            <div className="grid md:grid-cols-6 gap-8 md:gap-4">
              {timeline.map((t, idx) => (
                <div key={idx} className="relative">
                  <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-breeze-teal ring-4 ring-white" />
                  <div className="md:pt-14">
                    <p className="text-xs font-semibold text-breeze-teal uppercase tracking-wide">
                      {t.week}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-breeze-navy">
                      {t.phase}
                    </h3>
                    <p className="mt-2 text-xs text-breeze-slate leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 10: Team + Track Record ── */}
      <section id="team" className="bg-breeze-offwhite py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Who&apos;s behind Breeze
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Four operators with 60+ combined years in Shenzhen supply chain,
              smart hardware, and cross-border delivery.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-20 h-20 rounded-full mb-4 bg-breeze-teal/10"
                />
                <h3 className="text-lg font-semibold text-breeze-navy">
                  {m.name}
                </h3>
                <p className="text-sm text-breeze-teal font-medium">{m.role}</p>
                <p className="mt-3 text-sm text-breeze-slate leading-relaxed">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Track Record subsection */}
          <div className="mt-20 border-t border-breeze-navy/10 pt-16">
            <div className="max-w-2xl mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-breeze-navy">
                10+ Years. Not a New Company.
              </h3>
              <p className="mt-4 text-base text-breeze-slate">
                Before Breeze Hardware, our team shipped production at scale:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {trackRecord.map((p) => (
                <div
                  key={p.title}
                  className="bg-white rounded-xl p-6 border border-gray-100"
                >
                  <h4 className="font-semibold text-breeze-navy text-base">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-sm text-breeze-teal font-medium">
                    {p.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-breeze-slate leading-relaxed">
                    {p.desc}
                  </p>
                  {p.coverage && (
                    <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-breeze-slate">
                      <span className="font-semibold text-breeze-navy">
                        Press:
                      </span>{" "}
                      {p.coverage}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-breeze-slate italic max-w-3xl">
              Breeze&apos;s co-founder Jett Fu is AirPop&apos;s founder &amp;
              CEO. AirPop Halo was delivered by the same supply-chain and
              engineering team now powering Breeze.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 11: FAQ ── */}
      <section id="faq" className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Frequently asked
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Real questions from founders we&apos;ve talked with.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-semibold text-breeze-navy">
                  {f.q}
                </h3>
                <p className="mt-3 text-breeze-slate leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 12: Contact ── */}
      <section id="contact" className="bg-breeze-offwhite py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-breeze-navy">
              Ready to build?
            </h2>
            <p className="mt-4 text-lg text-breeze-slate">
              Tell us about your project. We&apos;ll respond within 24 hours
              with a preliminary assessment.
            </p>
          </div>
          <form className="mt-12 max-w-lg mx-auto space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-breeze-navy mb-1.5"
              >
                Your name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-breeze-teal/40 focus:border-breeze-teal transition-colors"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-breeze-navy mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-breeze-teal/40 focus:border-breeze-teal transition-colors"
                placeholder="jane@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="product"
                className="block text-sm font-medium text-breeze-navy mb-1.5"
              >
                One-line product description
              </label>
              <input
                id="product"
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-breeze-teal/40 focus:border-breeze-teal transition-colors"
                placeholder="AI-powered wearable for real-time translation"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="volume"
                  className="block text-sm font-medium text-breeze-navy mb-1.5"
                >
                  Estimated volume
                </label>
                <select
                  id="volume"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-breeze-teal/40 focus:border-breeze-teal transition-colors bg-white"
                >
                  <option value="">Select</option>
                  <option value="100">~100 units</option>
                  <option value="1000">~1,000 units</option>
                  <option value="10000">~10,000 units</option>
                  <option value="100000">100,000+</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="stage"
                  className="block text-sm font-medium text-breeze-navy mb-1.5"
                >
                  Current stage
                </label>
                <select
                  id="stage"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-breeze-teal/40 focus:border-breeze-teal transition-colors bg-white"
                >
                  <option value="">Select</option>
                  <option value="idea">Idea</option>
                  <option value="design">Design</option>
                  <option value="prototype">Prototype</option>
                  <option value="production">Production</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-breeze-teal text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-breeze-teal/90 transition-colors flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-breeze-slate">
            Or email us directly at{" "}
            <a
              href="mailto:hello@breezehw.com"
              className="text-breeze-teal font-medium hover:underline"
            >
              hello@breezehw.com
            </a>
          </p>
        </div>
      </section>

      {/* ── Section 7: Footer ── */}
      <footer className="bg-breeze-deep text-gray-400 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <WindIcon className="w-6 h-6 text-breeze-teal" />
                <span className="text-white text-xl font-bold tracking-wide">
                  BREEZE
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Hardware engineering, globally delivered.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/tools/bom-estimator" className="hover:text-white transition-colors">
                    BOM Estimator
                  </a>
                </li>
                <li>
                  <a href="/tools/dfm-checklist" className="hover:text-white transition-colors">
                    DFM Checklist
                  </a>
                </li>
                <li>
                  <a href="/tools/nre-simulator" className="hover:text-white transition-colors">
                    NRE Simulator
                  </a>
                </li>
                <li>
                  <a href="/tools/cert-navigator" className="hover:text-white transition-colors">
                    Cert Navigator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#process" className="hover:text-white transition-colors">
                    Process
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jianjettfu-oss/ai-hardware-toolkit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@breezehw.com"
                    className="hover:text-white transition-colors"
                  >
                    hello@breezehw.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-xs text-gray-500">
            © 2026 Breeze. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
