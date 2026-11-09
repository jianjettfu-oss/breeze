"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ToolCrossLinks from "@/components/ToolCrossLinks";
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
            BOM Cost Estimator
          </h1>
          <p className="mt-3 text-lg text-sub max-w-2xl">
            Select your components. Get a Shenzhen manufacturing ballpark in 60
            seconds. All prices at wholesale volume — not retail.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: component selector */}
          <div className="lg:col-span-2 space-y-8">
            {/* Volume selector */}
            <div>
              <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">
                Production Volume
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(volumeMultipliers).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => setVolume(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      volume === key
                        ? "bg-ink text-white"
                        : "bg-hairline text-sub hover:bg-hairline"
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
                  <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">
                    {cat.icon} {cat.label}
                    {cat.optional && (
                      <span className="ml-2 text-xs font-normal text-sub normal-case">
                        (optional{isMulti ? ", multi-select" : ""})
                      </span>
                    )}
                    {isMulti && (
                      <span className="ml-2 text-xs font-normal text-sub normal-case">
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
                              ? "border-hw bg-hw/10 shadow-sm"
                              : "border-hairline hover:border-hairline"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p
                                className={`font-medium text-sm ${
                                  active ? "text-ink" : "text-sub"
                                }`}
                              >
                                {opt.label}
                              </p>
                              <p className="text-xs text-sub mt-1">
                                {opt.description}
                              </p>
                            </div>
                            <span
                              className={`text-sm font-semibold whitespace-nowrap ${
                                active ? "text-ink" : "text-sub"
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
            <div className="sticky top-24 bg-ink text-white rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Estimated BOM Cost</h3>
                <p className="text-xs text-sub-dark mt-1">
                  Per unit at {volumeMultipliers[volume]?.label} · Shenzhen
                  pricing
                </p>
              </div>

              {!hasSelections ? (
                <div className="py-8 text-center">
                  <p className="text-sub-dark text-sm">
                    Select components to see your estimate
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected components */}
                  <div className="space-y-2">
                    <p className="text-xs text-sub-dark uppercase tracking-wide">
                      Your components
                    </p>
                    {breakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-sub-dark">{item.label}</span>
                        <span className="font-medium">
                          {fmt(item.cost.mid)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Fixed costs */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <p className="text-xs text-sub-dark uppercase tracking-wide">
                      Fixed costs (always included)
                    </p>
                    {fixedCosts.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-sub-dark">{item.label}</span>
                        <span className="text-sub-dark">
                          {fmt(item.cost.mid)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Volume adjustment */}
                  {volume !== "1000" && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-sub-dark">
                          Volume adjustment (
                          {volumeMultipliers[volume]?.label})
                        </span>
                        <span
                          className={
                            volumeMultipliers[volume]?.factor < 1
                              ? "text-white"
                              : "text-caution-dark"
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
                        <p className="text-xs text-sub-dark">
                          Per unit total
                        </p>
                        <p className="text-3xl font-semibold text-white">
                          {fmt(totalCost.mid)}
                        </p>
                      </div>
                      <p className="text-xs text-sub-dark text-right">
                        Range: {fmt(totalCost.low)} – {fmt(totalCost.high)}
                      </p>
                    </div>
                  </div>

                  {/* Retail price suggestion */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-xs text-sub-dark mb-2">
                      Suggested retail price (4–6× BOM)
                    </p>
                    <p className="text-lg font-semibold">
                      {fmt(totalCost.mid * 4)} – {fmt(totalCost.mid * 6)}
                    </p>
                  </div>

                  {/* NRE one-time costs */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <p className="text-xs text-sub-dark uppercase tracking-wide">
                      One-time NRE costs
                    </p>
                    {Object.values(nreCosts).map((nre) => (
                      <div
                        key={nre.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-sub-dark">{nre.label}</span>
                        <span className="text-sub-dark">
                          {fmtK(nre.mid)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-medium pt-2">
                      <span className="text-sub-dark">Total NRE</span>
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

              <p className="text-[10px] text-sub-dark leading-relaxed">
                Estimates based on Shenzhen wholesale pricing (LCSC, JLC PCB).
                Actual costs vary by component availability, custom
                requirements, and market conditions. Contact us for a precise
                quote.
              </p>
            </div>
          </div>
        </div>
        <ToolCrossLinks current="bom-estimator" />
      </div>
    </div>
  );
}
