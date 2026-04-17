"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { nreCategories, timelineEstimates } from "./data";

function fmtK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `$${n}`;
}

export default function NreSimulator() {
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const toggle = (catId: string, optId: string, multi: boolean) => {
    setSelections((prev) => {
      const current = prev[catId] || [];
      if (multi) {
        return {
          ...prev,
          [catId]: current.includes(optId)
            ? current.filter((x) => x !== optId)
            : [...current, optId],
        };
      }
      return { ...prev, [catId]: current[0] === optId ? [] : [optId] };
    });
  };

  const { breakdown, totalLow, totalMid, totalHigh, activeCats, hasSelections } =
    useMemo(() => {
      const breakdown: { icon: string; label: string; low: number; mid: number; high: number }[] = [];
      let totalLow = 0,
        totalMid = 0,
        totalHigh = 0;
      const activeCats = new Set<string>();

      for (const cat of nreCategories) {
        const selected = selections[cat.id] || [];
        for (const optId of selected) {
          const opt = cat.options.find((o) => o.id === optId);
          if (opt) {
            breakdown.push({
              icon: cat.icon,
              label: opt.label,
              low: opt.low,
              mid: opt.mid,
              high: opt.high,
            });
            totalLow += opt.low;
            totalMid += opt.mid;
            totalHigh += opt.high;
            activeCats.add(cat.id);
          }
        }
      }

      return {
        breakdown,
        totalLow,
        totalMid,
        totalHigh,
        activeCats,
        hasSelections: breakdown.length > 0,
      };
    }, [selections]);

  // Estimate timeline: longest parallel track + sequential cert
  const timeline = useMemo(() => {
    if (!hasSelections) return 0;
    const parallelWeeks = Math.max(
      ...[...activeCats]
        .filter((c) => c !== "certification" && c !== "prototyping")
        .map((c) => timelineEstimates[c]?.weeks ?? 0)
    );
    const protoWeeks = activeCats.has("prototyping")
      ? timelineEstimates.prototyping.weeks
      : 0;
    const certWeeks = activeCats.has("certification")
      ? timelineEstimates.certification.weeks
      : 0;
    return parallelWeeks + protoWeeks + certWeeks;
  }, [activeCats, hasSelections]);

  const buildReportData = useCallback(() => ({
    services: breakdown.map((item) => ({
      label: `${item.icon} ${item.label}`,
      cost: fmtK(item.mid),
    })),
    totalNre: fmtK(totalMid),
    totalRange: `${fmtK(totalLow)} – ${fmtK(totalHigh)}`,
    timeline: `~${timeline} weeks`,
    amortization: [1000, 5000, 10000].map((vol) => ({
      volume: vol >= 1000 ? `${vol / 1000}K` : `${vol}`,
      perUnit: `$${(totalMid / vol).toFixed(2)}`,
    })),
  }), [breakdown, totalMid, totalLow, totalHigh, timeline]);

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
            NRE Quote Simulator
          </h1>
          <p className="mt-3 text-lg text-[#64748B] max-w-2xl">
            Estimate your one-time development cost — engineering, tooling,
            prototyping, and certification. No surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: category selector */}
          <div className="lg:col-span-2 space-y-10">
            {nreCategories.map((cat) => {
              const selected = selections[cat.id] || [];
              const isMulti = cat.multiSelect ?? false;

              return (
                <div key={cat.id}>
                  <h3 className="text-sm font-semibold text-[#1B3A5C] uppercase tracking-wide mb-1">
                    {cat.icon} {cat.label}
                    {isMulti && (
                      <span className="ml-2 text-xs font-normal text-[#64748B] normal-case">
                        (select all that apply)
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#64748B] mb-4">
                    {cat.description}
                  </p>
                  <div className="space-y-3">
                    {cat.options.map((opt) => {
                      const active = selected.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggle(cat.id, opt.id, isMulti)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            active
                              ? "border-[#2DD4A8] bg-[#E6FBF5] shadow-sm"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p
                                className={`font-medium text-sm ${
                                  active ? "text-[#1B3A5C]" : "text-[#64748B]"
                                }`}
                              >
                                {opt.label}
                              </p>
                              <p className="text-xs text-[#64748B] mt-1">
                                {opt.description}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p
                                className={`text-sm font-semibold ${
                                  active ? "text-[#2DD4A8]" : "text-[#64748B]"
                                }`}
                              >
                                {fmtK(opt.mid)}
                              </p>
                              <p className="text-[10px] text-[#64748B]">
                                {fmtK(opt.low)}–{fmtK(opt.high)}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: quote summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0F2440] text-white rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold">NRE Quote Estimate</h3>
                <p className="text-xs text-gray-400 mt-1">
                  One-time development investment
                </p>
              </div>

              {!hasSelections ? (
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Select services to build your quote
                  </p>
                </div>
              ) : (
                <>
                  {/* Breakdown */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Selected services
                    </p>
                    {breakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm gap-2"
                      >
                        <span className="text-gray-300 truncate">
                          {item.icon} {item.label}
                        </span>
                        <span className="font-medium shrink-0">
                          {fmtK(item.mid)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400">Total NRE</p>
                        <p className="text-3xl font-bold text-[#2DD4A8]">
                          {fmtK(totalMid)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 text-right">
                        Range: {fmtK(totalLow)} – {fmtK(totalHigh)}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      Estimated timeline
                    </p>
                    <p className="text-lg font-semibold">
                      ~{timeline} weeks
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Engineering phases run in parallel. Prototyping and
                      certification are sequential.
                    </p>
                  </div>

                  {/* Per-unit amortization */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-2">
                      NRE amortized per unit
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[1000, 5000, 10000].map((vol) => (
                        <div key={vol}>
                          <p className="text-sm font-semibold">
                            ${(totalMid / vol).toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            @{vol >= 1000 ? `${vol / 1000}K` : vol} units
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email Capture */}
                  <EmailCapture tool="nre-simulator" buildData={buildReportData} />
                </>
              )}

              <p className="text-[10px] text-gray-500 leading-relaxed">
                Estimates based on Shenzhen engineering service rates. Actual
                costs depend on complexity, timeline, and specific requirements.
                50% NRE typically due at project kick-off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
