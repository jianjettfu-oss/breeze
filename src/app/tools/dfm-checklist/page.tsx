"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { checkCategories, severityConfig, type Severity } from "./data";

function Badge({ severity }: { severity: Severity }) {
  const cfg = severityConfig[severity];
  return (
    <span
      className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
      style={{ color: cfg.color, backgroundColor: `${cfg.color}15` }}
    >
      {cfg.label}
    </span>
  );
}

export default function DfmChecklist() {
  const [checked, setChecked] = useState<Record<string, "pass" | "fail" | "na">>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string, value: "pass" | "fail" | "na") => {
    setChecked((prev) => ({ ...prev, [id]: prev[id] === value ? undefined! : value }));
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allItems = useMemo(
    () => checkCategories.flatMap((cat) => cat.items),
    []
  );

  const stats = useMemo(() => {
    let total = allItems.length;
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    let answered = 0;
    let maxScore = 0;
    let earnedScore = 0;

    for (const item of allItems) {
      const weight = severityConfig[item.severity].weight;
      const state = checked[item.id];
      maxScore += weight;
      if (state === "pass") {
        passed++;
        answered++;
        earnedScore += weight;
      } else if (state === "fail") {
        failed++;
        answered++;
      } else if (state === "na") {
        skipped++;
        answered++;
        maxScore -= weight; // N/A items don't count against score
        total--;
      }
    }

    const adjustedMax = maxScore > 0 ? maxScore : 1;
    const score = answered > 0 ? Math.round((earnedScore / adjustedMax) * 100) : 0;
    const grade =
      score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";
    const gradeColor =
      score >= 90
        ? "#10B981"
        : score >= 75
        ? "#2DD4A8"
        : score >= 60
        ? "#F59E0B"
        : "#EF4444";

    return { total, passed, failed, skipped, answered, score, grade, gradeColor };
  }, [checked, allItems]);

  const criticalFails = useMemo(
    () =>
      allItems.filter(
        (item) => item.severity === "critical" && checked[item.id] === "fail"
      ),
    [checked, allItems]
  );

  const buildReportData = useCallback(() => ({
    score: stats.score,
    grade: stats.grade,
    passed: stats.passed,
    failed: stats.failed,
    skipped: stats.skipped,
    total: stats.total,
    criticalFails: criticalFails.map((item) => item.question),
    failedItems: allItems
      .filter((item) => checked[item.id] === "fail")
      .map((item) => item.question),
  }), [stats, criticalFails, allItems, checked]);

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
            DFM Checklist for AI Hardware
          </h1>
          <p className="mt-3 text-lg text-[#64748B] max-w-2xl">
            30 design-for-manufacturability checks specific to AI devices.
            Catch problems before they cost you a mold revision.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: checklist */}
          <div className="lg:col-span-2 space-y-10">
            {checkCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm font-semibold text-[#1B3A5C] uppercase tracking-wide mb-4">
                  {cat.icon} {cat.label}
                  <span className="ml-2 text-xs font-normal text-[#64748B] normal-case">
                    ({cat.items.length} checks)
                  </span>
                </h3>
                <div className="space-y-3">
                  {cat.items.map((item) => {
                    const state = checked[item.id];
                    const isExpanded = expanded[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`border rounded-xl transition-all ${
                          state === "pass"
                            ? "border-[#10B981]/30 bg-[#10B981]/5"
                            : state === "fail"
                            ? "border-red-200 bg-red-50/50"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge severity={item.severity} />
                              </div>
                              <p className="text-sm font-medium text-[#1B3A5C] leading-relaxed">
                                {item.question}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => toggle(item.id, "pass")}
                                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                                  state === "pass"
                                    ? "bg-[#10B981] text-white"
                                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                                }`}
                                title="Pass"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => toggle(item.id, "fail")}
                                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                                  state === "fail"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                                }`}
                                title="Fail"
                              >
                                ✕
                              </button>
                              <button
                                onClick={() => toggle(item.id, "na")}
                                className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                                  state === "na"
                                    ? "bg-[#64748B] text-white"
                                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                                }`}
                                title="Not applicable"
                              >
                                N/A
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-xs text-[#2DD4A8] font-medium mt-2 hover:underline"
                          >
                            {isExpanded ? "Hide details ↑" : "Why this matters ↓"}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
                            <div>
                              <p className="text-xs font-semibold text-[#1B3A5C] mb-0.5">
                                Why it matters
                              </p>
                              <p className="text-xs text-[#64748B] leading-relaxed">
                                {item.why}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#1B3A5C] mb-0.5">
                                How to fix
                              </p>
                              <p className="text-xs text-[#64748B] leading-relaxed">
                                {item.fix}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: score panel (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0F2440] text-white rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold">DFM Readiness Score</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {stats.answered} of {allItems.length} checks completed
                </p>
              </div>

              {stats.answered === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Start checking items to see your score
                  </p>
                </div>
              ) : (
                <>
                  {/* Score circle */}
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={stats.gradeColor}
                          strokeWidth="8"
                          strokeDasharray={`${stats.score * 2.64} 264`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: stats.gradeColor }}
                        >
                          {stats.grade}
                        </span>
                        <span className="text-xs text-gray-400">
                          {stats.score}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                        <span className="text-gray-300">
                          {stats.passed} passed
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-gray-300">
                          {stats.failed} failed
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#64748B]" />
                        <span className="text-gray-300">
                          {stats.skipped} N/A
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Critical failures alert */}
                  {criticalFails.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <p className="text-xs font-semibold text-red-400 mb-2">
                        ⚠ {criticalFails.length} Critical Issue
                        {criticalFails.length > 1 ? "s" : ""}
                      </p>
                      <ul className="space-y-1">
                        {criticalFails.map((item) => (
                          <li
                            key={item.id}
                            className="text-xs text-red-300 leading-relaxed"
                          >
                            • {item.question.slice(0, 60)}...
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interpretation */}
                  <div className="text-sm text-gray-300 leading-relaxed">
                    {stats.score >= 90 ? (
                      <p>
                        Your design is production-ready. Minor optimizations may
                        still reduce cost or improve yield.
                      </p>
                    ) : stats.score >= 75 ? (
                      <p>
                        Good foundation, but address the failed items before
                        tooling. Each fix now saves 10× the cost in production.
                      </p>
                    ) : stats.score >= 60 ? (
                      <p>
                        Several issues need attention. We recommend a DFM review
                        session before committing to mold tooling.
                      </p>
                    ) : (
                      <p>
                        Significant DFM risks detected. A thorough design review
                        is strongly recommended before proceeding to prototyping.
                      </p>
                    )}
                  </div>

                  {/* Email Capture */}
                  <EmailCapture tool="dfm-checklist" buildData={buildReportData} />
                </>
              )}

              <p className="text-[10px] text-gray-500 leading-relaxed">
                This checklist covers common AI hardware DFM issues. Your
                specific design may have additional requirements. Contact us for
                a comprehensive review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
