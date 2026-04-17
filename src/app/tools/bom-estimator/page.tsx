"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import {
  categories,
  fixedCosts,
  volumeMultipliers,
  nreCosts,
  type Tier,
} from "./data";

function sum(a: Tier, b: Tier): Tier {
  return { low: a.low + b.low, mid: a.mid + b.mid, high: a.high + b.high };
}

function scale(t: Tier, f: number): Tier {
  return {
    low: Math.round(t.low * f * 100) / 100,
    mid: Math.round(t.mid * f * 100) / 100,
    high: Math.round(t.high * f * 100) / 100,
  };
}

function fmt(n: number): string {
  return n < 1 ? `$${n.toFixed(2)}` : `$${n.toFixed(2)}`;
}

function fmtK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toLocaleString()}`;
}

export default function BomEstimator() {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [volume, setVolume] = useState("1000");

  const toggle = (catId: string, optId: string, multi: boolean) => {
    setSelections((prev) => {
      const current = prev[catId] || [];
      if (multi) {
        // sensors: multi-select
        return {
          ...prev,
          [catId]: current.includes(optId)
            ? current.filter((x) => x !== optId)
            : [...current, optId],
        };
      }
      // single select
      return { ...prev, [catId]: current[0] === optId ? [] : [optId] };
    });
  };

  const { componentCost, totalCost, breakdown, hasSelections } = useMemo(() => {
    let compCost: Tier = { low: 0, mid: 0, high: 0 };
    const breakdown: { label: string; cost: Tier }[] = [];

    for (const cat of categories) {
      const selected = selections[cat.id] || [];
      for (const optId of selected) {
        const opt = cat.options.find((o) => o.id === optId);
        if (opt && (opt.cost.low > 0 || opt.cost.mid > 0)) {
          compCost = sum(compCost, opt.cost);
          breakdown.push({ label: `${cat.icon} ${opt.label}`, cost: opt.cost });
        }
      }
    }

    let fixedTotal: Tier = { low: 0, mid: 0, high: 0 };
    for (const f of fixedCosts) {
      fixedTotal = sum(fixedTotal, f.cost);
    }

    const volFactor = volumeMultipliers[volume]?.factor ?? 1;
    const rawTotal = sum(compCost, fixedTotal);
    const scaledTotal = scale(rawTotal, volFactor);

    return {
      componentCost: compCost,
      totalCost: scaledTotal,
      breakdown,
      hasSelections: Object.values(selections).some((arr) => arr.length > 0),
    };
  }, [selections, volume]);

  const buildReportData = useCallback(() => ({
    volume: volumeMultipliers[volume]?.label ?? volume,
    components: breakdown.map((item) => ({
      label: item.label,
      cost: fmt(item.cost.mid),
    })),
    fixedCosts: fixedCosts.map((f) => ({
      label: f.label,
      cost: fmt(f.cost.mid),
    })),
    volumeAdjustment:
      volume !== "1000"
        ? `${volumeMultipliers[volume]?.factor < 1 ? "" : "+"}${Math.round(
            (volumeMultipliers[volume]?.factor - 1) * 100
          )}%`
        : undefined,
    totalPerUnit: fmt(totalCost.mid),
    totalRange: `${fmt(totalCost.low)} – ${fmt(totalCost.high)}`,
    retailRange: `${fmt(totalCost.mid * 4)} – ${fmt(totalCost.mid * 6)}`,
    nreTotal: fmtK(
      Object.values(nreCosts).reduce((s, n) => s + n.mid, 0)
    ),
  }), [breakdown, totalCost, volume]);

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
            BOM Cost Estimator
          </h1>
          <p className="mt-3 text-lg text-[#64748B] max-w-2xl">
            Select your components. Get a Shenzhen manufacturing ballpark in 60
            seconds. All prices at wholesale volume — not retail.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: component selector */}
          <div className="lg:col-span-2 space-y-8">
            {/* Volume selector */}
            <div>
              <h3 className="text-sm font-semibold text-[#1B3A5C] uppercase tracking-wide mb-3">
                Production Volume
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(volumeMultipliers).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => setVolume(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      volume === key
                        ? "bg-[#1B3A5C] text-white"
                        : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            {categories.map((cat) => {
              const isMulti = cat.id === "sensors";
              const selected = selections[cat.id] || [];

              return (
                <div key={cat.id}>
                  <h3 className="text-sm font-semibold text-[#1B3A5C] uppercase tracking-wide mb-3">
                    {cat.icon} {cat.label}
                    {cat.optional && (
                      <span className="ml-2 text-xs font-normal text-[#64748B] normal-case">
                        (optional{isMulti ? ", multi-select" : ""})
                      </span>
                    )}
                    {isMulti && (
                      <span className="ml-2 text-xs font-normal text-[#64748B] normal-case">
                        (multi-select)
                      </span>
                    )}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {cat.options.map((opt) => {
                      const active = selected.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggle(cat.id, opt.id, isMulti)}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            active
                              ? "border-[#2DD4A8] bg-[#E6FBF5] shadow-sm"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
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
                            <span
                              className={`text-sm font-semibold whitespace-nowrap ${
                                active ? "text-[#2DD4A8]" : "text-[#64748B]"
                              }`}
                            >
                              {opt.cost.mid === 0
                                ? "$0"
                                : `${fmt(opt.cost.mid)}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: cost summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0F2440] text-white rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold">Estimated BOM Cost</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Per unit at {volumeMultipliers[volume]?.label} · Shenzhen
                  pricing
                </p>
              </div>

              {!hasSelections ? (
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Select components to see your estimate
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected components */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Your components
                    </p>
                    {breakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-300">{item.label}</span>
                        <span className="font-medium">
                          {fmt(item.cost.mid)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Fixed costs */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Fixed costs (always included)
                    </p>
                    {fixedCosts.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-gray-300">
                          {fmt(item.cost.mid)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Volume adjustment */}
                  {volume !== "1000" && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Volume adjustment (
                          {volumeMultipliers[volume]?.label})
                        </span>
                        <span
                          className={
                            volumeMultipliers[volume]?.factor < 1
                              ? "text-[#10B981]"
                              : "text-[#F59E0B]"
                          }
                        >
                          {volumeMultipliers[volume]?.factor < 1 ? "" : "+"}
                          {Math.round(
                            (volumeMultipliers[volume]?.factor - 1) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400">
                          Per unit total
                        </p>
                        <p className="text-3xl font-bold text-[#2DD4A8]">
                          {fmt(totalCost.mid)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 text-right">
                        Range: {fmt(totalCost.low)} – {fmt(totalCost.high)}
                      </p>
                    </div>
                  </div>

                  {/* Retail price suggestion */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-2">
                      Suggested retail price (4–6× BOM)
                    </p>
                    <p className="text-lg font-semibold">
                      {fmt(totalCost.mid * 4)} – {fmt(totalCost.mid * 6)}
                    </p>
                  </div>

                  {/* NRE one-time costs */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      One-time NRE costs
                    </p>
                    {Object.values(nreCosts).map((nre) => (
                      <div
                        key={nre.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-400">{nre.label}</span>
                        <span className="text-gray-300">
                          {fmtK(nre.mid)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-medium pt-2">
                      <span className="text-gray-300">Total NRE</span>
                      <span>
                        {fmtK(
                          Object.values(nreCosts).reduce(
                            (s, n) => s + n.mid,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Email Capture */}
                  <EmailCapture tool="bom-estimator" buildData={buildReportData} />
                </>
              )}

              <p className="text-[10px] text-gray-500 leading-relaxed">
                Estimates based on Shenzhen wholesale pricing (LCSC, JLC PCB).
                Actual costs vary by component availability, custom
                requirements, and market conditions. Contact us for a precise
                quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
