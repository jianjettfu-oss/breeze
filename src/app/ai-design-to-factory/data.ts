// Canonical copy: github.com/jianjettfu-oss/ai-hardware-toolkit/ai-design-handoff/README.md
// Keep the two in step when either changes. Numbers last checked 2026-11-08.

export type Source = { label: string; href: string };

export type CheckItem = { title: string; detail?: string; source?: Source };

export type Layer = {
  id: string;
  title: string;
  when: string;
  groups: { name?: string; items: CheckItem[] }[];
};

export const SOURCES = {
  meshy: { label: "Meshy API docs", href: "https://docs.meshy.ai/en/api/text-to-3d" },
  engineering: {
    label: "engineering.com",
    href: "https://www.engineering.com/backflips-back-is-the-mesh-to-cad-ai-real-this-time/",
  },
  xometry: { label: "Xometry Pro", href: "https://xometry.pro/en/articles/text-to-cad-tools-test/" },
  staley: {
    label: "Staley, 2026-02",
    href: "https://kerrickstaley.com/2026/02/22/can-frontier-llms-solve-cad-tasks",
  },
  cadbench: { label: "CadBench", href: "https://arxiv.org/abs/2605.10873" },
  pcbgpt: { label: "pcbGPT", href: "https://arxiv.org/abs/2606.01188" },
  hwebench: { label: "HWE-Bench", href: "https://arxiv.org/abs/2603.18102" },
  jlcpcb: {
    label: "JLCPCB",
    href: "https://jlcpcb.com/blog/kicad-mcp-how-to-design-a-pcb-with-claude-code",
  },
  embedagent: { label: "EmbedAgent", href: "https://arxiv.org/abs/2506.11003" },
  hn: { label: "Hacker News", href: "https://news.ycombinator.com/item?id=49584343" },
} satisfies Record<string, Source>;

export const LAYERS: Layer[] = [
  {
    id: "machine",
    title: "Layer 1: machine-checkable",
    when: "Run these yourself, before you ask anyone for a quote.",
    groups: [
      {
        name: "Mechanical",
        items: [
          {
            title: "Every part is a solid STEP file, not a mesh.",
            detail:
              "Image-to-3D tools export meshes (Meshy's API lists GLB, FBX, STL and similar, no STEP). A mesh has no dimensions and no wall thickness, so a mold maker cannot quote from it.",
            source: SOURCES.meshy,
          },
          {
            title: "Dimensions measured in a second CAD tool against your spec.",
            detail:
              "Measure the part, not the AI's summary of the part. In one test of a mesh-to-CAD tool, none of 5 results for a toaster-oven knob was free of errors.",
            source: SOURCES.engineering,
          },
          {
            title: "Wall thickness, draft angles and undercuts run through a DFM analysis.",
            detail: "These are deterministic geometry checks, not AI.",
          },
          {
            title: "Interference check on the full assembly.",
            detail: "AI-written CAD code handles single parts. Assemblies and tolerance stacks are where it stops.",
          },
          {
            title: "Small features checked by eye: gears, threads, snap fits, ribs, bosses.",
            detail: "In a seven-tool text-to-CAD test, a 24-tooth gear came back failed or simplified.",
            source: SOURCES.xometry,
          },
        ],
      },
      {
        name: "Electronics",
        items: [
          {
            title: "ERC and DRC clean, and every ERC warning read.",
            detail:
              "Two overlapping net labels shorted ISENSE to ISET in a published KiCad + Claude Code build. ERC reported it only as a warning.",
            source: SOURCES.jlcpcb,
          },
          {
            title: "Netlist compared pin by pin against the intended design.",
            detail: "Start with power, sense, enable and reset nets. This is how the short above was found.",
          },
          {
            title: "Every footprint checked against the datasheet land pattern for the exact part number.",
          },
          {
            title: "BOM lines complete.",
            detail:
              "Manufacturer part number, quantity, reference designators, lifecycle status, and an approved second source for anything single-sourced.",
          },
        ],
      },
      {
        name: "Firmware",
        items: [
          {
            title: "Clean build on the exact SDK version the factory test station will use.",
            detail: "Treat compiler warnings as errors.",
          },
          {
            title: "Ported code tested on the target framework.",
            detail: "Models migrating code to ESP-IDF passed 29.4% of tasks in the EmbedAgent benchmark.",
            source: SOURCES.embedagent,
          },
        ],
      },
    ],
  },
  {
    id: "physical",
    title: "Layer 2: needs a physical test",
    when: "Only a prototype answers these. This is what the EVT and DVT builds are for.",
    groups: [
      {
        items: [
          {
            title: "Thermal under sustained load, inside the real enclosure.",
            detail: "Test at the highest ambient temperature you will claim.",
          },
          {
            title: "RF in the final enclosure.",
            detail: "With a hand or body nearby for wearables. Pre-scan before you pay for certification.",
          },
          {
            title: "First power-on with a current-limited supply.",
            detail: "Check every rail before you load firmware.",
          },
          {
            title: "Fit and tolerance stack.",
            detail: "On printed or CNC parts first, then again on the first molded samples (T1).",
          },
          {
            title: "Molding defects.",
            detail: "Shrink, warpage, sink marks, gate marks and flash only show up on T1 samples.",
          },
          {
            title: "Soft materials and fit on the body.",
            detail:
              "Silicone, TPE, straps, seals. We found no published evidence that generative AI predicts these. Test on people.",
          },
          {
            title: "Drop, battery and charging tests.",
          },
        ],
      },
    ],
  },
  {
    id: "human",
    title: "Layer 3: needs a human sign-off",
    when: "Someone who has shipped this kind of part owns the decision.",
    groups: [
      {
        items: [
          {
            title: "Mold design: parting line, gate location, ejection, steel.",
            detail: "Agreed between the mold maker's engineer and yours.",
          },
          {
            title: "High-speed and RF layout.",
            detail: "Reviewed by an engineer who has shipped that interface before.",
          },
          {
            title: "Certification plan: markets, tests, lab, budget.",
          },
          {
            title: "Safety-critical parts: battery protection, charging circuit, skin-contact materials.",
          },
          {
            title: "DFM sign-off from the factory that will build it, against a written checklist.",
          },
        ],
      },
    ],
  },
];

export const WHERE_AI_IS: { step: string; works: string; breaks: string; sources: Source[] }[] = [
  {
    step: "Concept to 3D shape (image-to-3D)",
    works: "A viewable model in minutes",
    breaks: "Output is a mesh: no dimensions, no wall thickness",
    sources: [SOURCES.meshy],
  },
  {
    step: "Mesh or image to CAD",
    works: "Simple machined parts, partly",
    breaks:
      "No error-free result in 5 tries on a knob; best image-input shape match (IoU) 0.412; noisy mesh input dropped 0.707 → 0.130",
    sources: [SOURCES.engineering, SOURCES.cadbench],
  },
  {
    step: "Text to CAD, one shot",
    works: "Cylinder-level parts",
    breaks: "24-tooth gear failed or simplified; a manifold block came back empty or simplified",
    sources: [SOURCES.xometry],
  },
  {
    step: "LLM writes CAD code, checks in simulation",
    works: "Simple brackets, mounts, enclosures",
    breaks: "Passing designs were mostly close, not usable as-is; assemblies and tolerances not covered",
    sources: [SOURCES.staley],
  },
  {
    step: "Schematic, constrained embedded tasks",
    works: "pass@1 0.90, with part lookup and checks built into the system",
    breaks: "—",
    sources: [SOURCES.pcbgpt],
  },
  {
    step: "Schematic, open board-level tasks",
    works: "—",
    breaks: "Best model passed 8.15% of 300 tasks",
    sources: [SOURCES.hwebench],
  },
  {
    step: "Simple board, end to end",
    works: "Individual developers report small boards (ESP32 class) built and working",
    breaks: "Hand fixes and manual routing were common; in one published build a short passed ERC as a warning",
    sources: [SOURCES.hn, SOURCES.jlcpcb],
  },
  {
    step: "Firmware",
    works: "55.6% pass@1 with the schematic; 65.1% with retrieval and compiler feedback",
    breaks: "29.4% when migrating to ESP-IDF (2025 models)",
    sources: [SOURCES.embedagent],
  },
];

export const HANDOFF: { item: string; send: string }[] = [
  {
    item: "Mechanical",
    send: "STEP for every part; 2D drawings with tolerances, critical dimensions, material, color and finish",
  },
  { item: "BOM", send: "Part numbers, quantities, reference designators, approved alternates" },
  {
    item: "PCB",
    send: "Gerbers or ODB++, drill files, pick-and-place, assembly drawing, stack-up and impedance notes",
  },
  { item: "Firmware", send: "Production image, programming procedure, factory test firmware" },
  { item: "Test", send: "Test plan with pass/fail criteria per unit" },
  { item: "Market", send: "Target countries and the certifications you need" },
  { item: "Commercial", send: "Target volume and target unit cost" },
];
