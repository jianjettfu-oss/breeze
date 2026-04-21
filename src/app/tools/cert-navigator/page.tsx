"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
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
    <div className="border border-gray-100 rounded-xl hover:border-[#2DD4A8]/30 transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{cert.flag}</span>
              <h3 className="text-base font-semibold text-[#1B3A5C]">
                {cert.name}
              </h3>
              {cert.required && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-red-50 text-red-500">
                  Required
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748B] mb-2">{cert.fullName}</p>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {cert.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-[#1B3A5C]">
              {fmtK(cert.cost.mid)}
            </p>
            <p className="text-[10px] text-[#64748B]">
              {fmtK(cert.cost.low)}–{fmtK(cert.cost.high)}
            </p>
            <p className="text-xs text-[#64748B] mt-1">{cert.timeline}</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-[#2DD4A8] font-medium mt-3 hover:underline"
        >
          {open ? "Hide details ↑" : "View requirements & tips ↓"}
        </button>
      </div>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs font-semibold text-[#1B3A5C] mb-2">
              Key Requirements
            </p>
            <ul className="space-y-1">
              {cert.keyRequirements.map((req, i) => (
                <li key={i} className="text-xs text-[#64748B] flex gap-2">
                  <span className="text-[#64748B] shrink-0">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B3A5C] mb-2">
              Tips from Shenzhen
            </p>
            <ul className="space-y-1">
              {cert.tips.map((tip, i) => (
                <li key={i} className="text-xs text-[#2DD4A8] flex gap-2">
                  <span className="shrink-0">💡</span>
                  <span className="text-[#64748B]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B3A5C] mb-1">
              Recommended Labs
            </p>
            <p className="text-xs text-[#64748B]">
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
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/breeze-logo.png"
              alt="Breeze"
              width={140}
              height={35}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/#contact"
            className="bg-[#2DD4A8] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2DD4A8]/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/#tools"
            className="text-sm text-[#64748B] hover:text-[#1B3A5C] mb-4 inline-block"
          >
            ← Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B3A5C]">
            Certification Navigator
          </h1>
          <p className="mt-3 text-lg text-[#64748B] max-w-2xl">
            Tell us what your device does and where you want to sell it. We&apos;ll
            show you exactly which certifications you need, how long they take,
            and what they cost.
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-[#1B3A5C] uppercase tracking-wide mb-3">
              Your device has...
            </h3>
            <div className="flex flex-wrap gap-2">
              {deviceFeatures.map((feat) => (
                <button
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFeatures.includes(feat.id)
                      ? "bg-[#1B3A5C] text-white"
                      : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                  }`}
                >
                  {feat.icon} {feat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1B3A5C] uppercase tracking-wide mb-3">
              Target markets
            </h3>
            <div className="flex flex-wrap gap-2">
              {targetMarkets.map((mkt) => (
                <button
                  key={mkt.id}
                  onClick={() => toggleMarket(mkt.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedMarkets.includes(mkt.id)
                      ? "bg-[#1B3A5C] text-white"
                      : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
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
            <p className="text-[#64748B]">
              Select your device features and target markets above to see
              required certifications.
            </p>
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#64748B]">
              No certifications match your selection. Try adding more features
              or markets.
            </p>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="bg-[#0F2440] text-white rounded-2xl p-6 mb-8">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Certifications needed
                  </p>
                  <p className="text-2xl font-bold">{filteredCerts.length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Estimated total cost
                  </p>
                  <p className="text-2xl font-bold text-[#2DD4A8]">
                    {fmtK(totalCost.mid)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Range: {fmtK(totalCost.low)} – {fmtK(totalCost.high)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Timeline (parallel testing)
                  </p>
                  <p className="text-2xl font-bold">~{totalTimeline}</p>
                  <p className="text-xs text-gray-400">
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
              <div className="bg-[#0F2440] rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Email this roadmap to yourself</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Get your full certification breakdown with costs and timelines.
                  </p>
                </div>
                <EmailCapture tool="cert-navigator" buildData={buildReportData} />
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  We handle the full certification process — lab coordination,
                  documentation, and submissions.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
