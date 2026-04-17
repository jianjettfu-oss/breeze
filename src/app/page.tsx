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

      {/* ── Section 5: Why Breeze ── */}
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

      {/* ── Section 6: Contact ── */}
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
                  <a href="#why" className="hover:text-white transition-colors">
                    Why Breeze
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
