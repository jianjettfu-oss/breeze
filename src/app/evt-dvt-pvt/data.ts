/*
 * Copy of ai-hardware-toolkit/evt-dvt-pvt-checklist/validation-stages.md (the single source).
 * Every string here is verbatim from that file, so the toolkit's `scripts/check-drift.mjs --site`
 * can compare them field by field: units, weeks, deliverable, goal, assembly, stop line, and
 * each check's wording and pass criteria (matched by code, e.g. "A4").
 * Keep one check per line in the { code, check, criteria } shape; the drift check parses it.
 */

export type Check = { code: string; check: string; criteria: string };

export type Stage = {
  name: "EVT" | "DVT" | "PVT";
  full: string;
  units: string;
  weeks: string;
  deliverable: string;
  goal: string;
  assembly: string;
  checks: Check[];
  stopIf: string;
};

export const STAGES: Stage[] = [
  {
    name: "EVT",
    full: "Engineering Validation Test",
    units: "10-30",
    weeks: "4-6",
    deliverable: "Proof of concept. Core tech works.",
    goal: "Prove the core technology works. Does the electronics function? Can the AI model run? Is the form factor viable?",
    assembly: "Hand-soldered or semi-automated. 3D printed enclosures.",
    checks: [
      { code: "E4", check: "Power consumption measured in each mode", criteria: "Sleep, idle, active, peak AI inference -- all recorded" },
      { code: "E6", check: "No magic smoke", criteria: "48-hour burn-in with no component failures" },
      { code: "A1", check: "AI model runs on target SoC", criteria: "Inference completes without crash or timeout" },
      { code: "A3", check: "Model accuracy on device", criteria: "Accuracy within 5% of desktop/cloud version" },
      { code: "A4", check: "Thermal during sustained inference", criteria: "SoC junction temp <85C after 30 min continuous inference" },
      { code: "R3", check: "Antenna performance with enclosure", criteria: "No more than 3dB degradation vs. bare board" },
    ],
    stopIf: "SoC doesn't boot reliably, AI model can't run on device, or power consumption is >2x budget.",
  },
  {
    name: "DVT",
    full: "Design Validation Test",
    units: "30-100",
    weeks: "6-10",
    deliverable: "Validated design. Ready for certification.",
    goal: "Prove the product design works for users and can survive real-world conditions. This is where you test reliability, usability, and regulatory pre-compliance.",
    assembly: "Production-intent. Injection-molded enclosures (soft mold OK). SMT assembly line.",
    checks: [
      { code: "D1", check: "Drop test", criteria: "Survives 1.2m drop onto concrete on all 6 faces + edges" },
      { code: "T1", check: "Skin temperature (wearable)", criteria: "<42C on any user-facing surface" },
      { code: "B1", check: "Battery life matches claims", criteria: "Actual runtime within 10% of spec (per mode)" },
      { code: "P2", check: "Radiated emissions pre-scan", criteria: "Within limits at 3m distance" },
      { code: "F2", check: "OTA failure recovery", criteria: "Device recovers from: power loss mid-update, corrupted image, network drop" },
      { code: "F5", check: "Production provisioning", criteria: "Unique ID, certs, and calibration in <30sec/unit" },
    ],
    stopIf: "Any reliability test fails, pre-compliance shows issues, or OTA doesn't work reliably. These problems get worse at scale, not better.",
  },
  {
    name: "PVT",
    full: "Production Validation Test",
    units: "100-500",
    weeks: "4-6",
    deliverable: "Production process validated. Ready to ship.",
    goal: "Prove the factory can build the product consistently at quality and speed targets. PVT tests the manufacturing process; the design was settled in DVT.",
    assembly: "Full production line. Production tooling. Production test fixtures.",
    checks: [
      { code: "L1", check: "SMT yield", criteria: ">98% first-pass yield" },
      { code: "L4", check: "Functional test pass rate", criteria: ">95% first pass" },
      { code: "Q2", check: "Unit-to-unit consistency", criteria: "Key specs within +/-10% across 20 random units" },
      { code: "FP3", check: "Firmware version locked", criteria: "All units ship with approved firmware version" },
      { code: "FP4", check: "OTA server ready", criteria: "Production OTA endpoint live and tested" },
      { code: "C1", check: "All certifications received", criteria: "FCC, CE, UL, UN38.3 (as applicable) certs in hand" },
    ],
    stopIf: "First-pass yield is below 95%, unit-to-unit variation exceeds spec, or any certification is missing. Fix the process before scaling.",
  },
];

export const TIMELINE_NOTE =
  "Each stage can run longer if problems are found. Budget 6 months from EVT start to first shipment -- 9 months is more realistic for a first product.";

const span = (s: string) => s.split("-").map(Number) as [number, number];

/** Sum of the stage week ranges, e.g. [14, 22]. */
export const TOTAL_WEEKS: [number, number] = STAGES.reduce<[number, number]>(
  (t, s) => {
    const [lo, hi] = span(s.weeks);
    return [t[0] + lo, t[1] + hi];
  },
  [0, 0],
);

/** Toolkit text uses ASCII stand-ins; show proper symbols on the page. */
export const pretty = (s: string) =>
  s
    .replace(/ -- /g, " — ")
    .replace(/\+\/-/g, "±")
    .replace(/>=/g, "≥")
    .replace(/(\d)C\b/g, "$1°C")
    .replace(/(\d+)-(\d+)/g, "$1–$2");
