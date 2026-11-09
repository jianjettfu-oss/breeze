"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ToolCrossLinks from "@/components/ToolCrossLinks";
import {
  certifications,
  deviceFeatures,
  targetMarkets,
  type CertInfo,
} from "./data";

function fmtK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `$${n}`;
}

function CertCard({ cert }: { cert: CertInfo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-hairline rounded-xl hover:border-hw/30 transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{cert.flag}</span>
              <h3 className="text-base font-semibold text-ink">
                {cert.name}
              </h3>
              {cert.required && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-danger/5 text-danger">
                  Required
                </span>
              )}
            </div>
            <p className="text-xs text-sub mb-2">{cert.fullName}</p>
            <p className="text-sm text-sub leading-relaxed">
              {cert.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-semibold text-ink">
              {fmtK(cert.cost.mid)}
            </p>
            <p className="text-[10px] text-sub">
              {fmtK(cert.cost.low)}–{fmtK(cert.cost.high)}
            </p>
            <p className="text-xs text-sub mt-1">{cert.timeline}</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-ink font-medium mt-3 underline decoration-hw decoration-2 underline-offset-4"
        >
          {open ? "Hide details ↑" : "View requirements & tips ↓"}
        </button>
      </div>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-hairline pt-4">
          <div>
            <p className="text-xs font-semibold text-ink mb-2">
              Key Requirements
            </p>
            <ul className="space-y-1">
              {cert.keyRequirements.map((req, i) => (
                <li key={i} className="text-xs text-sub flex gap-2">
                  <span className="text-sub shrink-0">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink mb-2">
              Tips from Shenzhen
            </p>
            <ul className="space-y-1">
              {cert.tips.map((tip, i) => (
                <li key={i} className="text-xs text-ink flex gap-2">
                  <span className="shrink-0">💡</span>
                  <span className="text-sub">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink mb-1">
              Recommended Labs
            </p>
            <p className="text-xs text-sub">
              {cert.labExamples.join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CertNavigator() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleMarket = (id: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const { filteredCerts, totalCost, totalTimeline } = useMemo(() => {
    if (selectedFeatures.length === 0 && selectedMarkets.length === 0) {
      return { filteredCerts: [], totalCost: { low: 0, mid: 0, high: 0 }, totalTimeline: "" };
    }

    // Get cert IDs from selected markets
    const marketCertIds = new Set<string>();
    for (const mktId of selectedMarkets) {
      const mkt = targetMarkets.find((m) => m.id === mktId);
      if (mkt) mkt.certs.forEach((c) => marketCertIds.add(c));
    }

    // Filter certs by features AND markets
    const filtered = certifications.filter((cert) => {
      // Must match at least one selected feature
      const featureMatch =
        selectedFeatures.length === 0 ||
        cert.applicableTo.some((a) => selectedFeatures.includes(a));

      // Must be in at least one selected market's cert list
      const marketMatch =
        selectedMarkets.length === 0 || marketCertIds.has(cert.id);

      return featureMatch && marketMatch;
    });

    const totalLow = filtered.reduce((s, c) => s + c.cost.low, 0);
    const totalMid = filtered.reduce((s, c) => s + c.cost.mid, 0);
    const totalHigh = filtered.reduce((s, c) => s + c.cost.high, 0);

    // Timeline: assume parallel testing, longest cert determines timeline
    const weeks = filtered.reduce((max, c) => {
      const w = parseInt(c.timeline.split("–").pop() || "0");
      return Math.max(max, w);
    }, 0);

    return {
      filteredCerts: filtered,
      totalCost: { low: totalLow, mid: totalMid, high: totalHigh },
      totalTimeline: weeks > 0 ? `${weeks} weeks` : "",
    };
  }, [selectedFeatures, selectedMarkets]);

  const hasInput = selectedFeatures.length > 0 || selectedMarkets.length > 0;

  const buildReportData = useCallback(() => ({
    features: selectedFeatures.map(
      (id) => deviceFeatures.find((f) => f.id === id)?.label ?? id
    ),
    markets: selectedMarkets.map(
      (id) => {
        const mkt = targetMarkets.find((m) => m.id === id);
        return mkt ? `${mkt.flag} ${mkt.label}` : id;
      }
    ),
    certs: filteredCerts.map((c) => ({
      name: `${c.flag} ${c.name}`,
      cost: fmtK(c.cost.mid),
      timeline: c.timeline,
    })),
    totalCost: fmtK(totalCost.mid),
    totalRange: `${fmtK(totalCost.low)} – ${fmtK(totalCost.high)}`,
    totalTimeline,
  }), [selectedFeatures, selectedMarkets, filteredCerts, totalCost, totalTimeline]);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/brand/lockup-a-hw-en-light.svg"
              alt="Breeze"
              width={165}
              height={32}
              unoptimized
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/#contact"
            className="bg-hw text-ink px-4 py-2 rounded-lg text-sm font-semibold hover:bg-hw/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/tools"
            className="text-sm text-sub hover:text-ink mb-4 inline-block"
          >
            ← Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold text-ink">
            Certification Navigator
          </h1>
          <p className="mt-3 text-lg text-sub max-w-2xl">
            Tell us what your device does and where you want to sell it. We&apos;ll
            show you exactly which certifications you need, how long they take,
            and what they cost.
          </p>
        </div>

        {/* Static reference table — crawlable cert matrix for LLMs/search engines */}
        <section className="mb-12 border border-hairline rounded-xl overflow-hidden">
          <details>
            <summary className="cursor-pointer px-5 py-4 bg-panel hover:bg-hairline text-sm font-semibold text-ink">
              📋 Reference: full certification cost &amp; timeline matrix (2026)
            </summary>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Consumer AI hardware certification cost, lead time, and region matrix for FCC, CE, UKCA, RCM, CCC, SRRC, MIC, ISED, UN38.3, and UL.
                </caption>
                <thead className="bg-panel">
                  <tr className="text-left text-xs text-sub uppercase tracking-wide">
                    <th className="px-5 py-3">Cert</th>
                    <th className="px-5 py-3">Region</th>
                    <th className="px-5 py-3">Mandatory</th>
                    <th className="px-5 py-3">USD typical</th>
                    <th className="px-5 py-3">USD range</th>
                    <th className="px-5 py-3">Lead time</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((c) => (
                    <tr key={c.id} className="border-t border-hairline">
                      <td className="px-5 py-3 text-ink font-medium whitespace-nowrap">
                        {c.flag} {c.name}
                      </td>
                      <td className="px-5 py-3 text-body">{c.region}</td>
                      <td className="px-5 py-3 text-sub">
                        {c.required ? "Yes" : "Conditional"}
                      </td>
                      <td className="px-5 py-3 text-ink font-semibold whitespace-nowrap">
                        ${c.cost.mid.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-sub whitespace-nowrap">
                        ${c.cost.low.toLocaleString()}–${c.cost.high.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-sub whitespace-nowrap">
                        {c.timeline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-5 py-3 text-xs text-sub bg-panel leading-relaxed">
                Most consumer AI hardware needs FCC (US) + CE/RED (EU) + UN38.3 (battery transport) at minimum.
                CCC applies only to specific product categories in China — many AI wearables are exempt.
                Most certs can be tested in parallel; SRRC must precede CCC.
              </p>
            </div>
          </details>
        </section>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">
              Your device has...
            </h3>
            <div className="flex flex-wrap gap-2">
              {deviceFeatures.map((feat) => (
                <button
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFeatures.includes(feat.id)
                      ? "bg-ink text-white"
                      : "bg-hairline text-sub hover:bg-hairline"
                  }`}
                >
                  {feat.icon} {feat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">
              Target markets
            </h3>
            <div className="flex flex-wrap gap-2">
              {targetMarkets.map((mkt) => (
                <button
                  key={mkt.id}
                  onClick={() => toggleMarket(mkt.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedMarkets.includes(mkt.id)
                      ? "bg-ink text-white"
                      : "bg-hairline text-sub hover:bg-hairline"
                  }`}
                >
                  {mkt.flag} {mkt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {!hasInput ? (
          <div className="text-center py-16">
            <p className="text-sub">
              Select your device features and target markets above to see
              required certifications.
            </p>
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sub">
              No certifications match your selection. Try adding more features
              or markets.
            </p>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="bg-ink text-white rounded-2xl p-6 mb-8">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-sub-dark mb-1">
                    Certifications needed
                  </p>
                  <p className="text-2xl font-semibold">{filteredCerts.length}</p>
                </div>
                <div>
                  <p className="text-xs text-sub-dark mb-1">
                    Estimated total cost
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {fmtK(totalCost.mid)}
                  </p>
                  <p className="text-xs text-sub-dark">
                    Range: {fmtK(totalCost.low)} – {fmtK(totalCost.high)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-sub-dark mb-1">
                    Timeline (parallel testing)
                  </p>
                  <p className="text-2xl font-semibold">~{totalTimeline}</p>
                  <p className="text-xs text-sub-dark">
                    Most certs can be tested simultaneously
                  </p>
                </div>
              </div>
            </div>

            {/* Cert cards */}
            <div className="space-y-4">
              {filteredCerts.map((cert) => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>

            {/* Email Capture */}
            <div className="mt-12 max-w-md mx-auto">
              <div className="bg-ink rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Email this roadmap to yourself</h3>
                  <p className="text-xs text-sub-dark mt-1">
                    Get your full certification breakdown with costs and timelines.
                  </p>
                </div>
                <EmailCapture tool="cert-navigator" buildData={buildReportData} />
                <p className="text-[10px] text-sub-dark leading-relaxed">
                  We handle the full certification process — lab coordination,
                  documentation, and submissions.
                </p>
              </div>
            </div>
          </>
        )}
        <ToolCrossLinks current="cert-navigator" />
      </div>
    </div>
  );
}
