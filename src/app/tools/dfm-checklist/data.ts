export type Severity = "critical" | "major" | "minor";

export interface CheckItem {
  id: string;
  question: string;
  why: string;
  fix: string;
  severity: Severity;
}

export interface CheckCategory {
  id: string;
  label: string;
  icon: string;
  items: CheckItem[];
}

export const checkCategories: CheckCategory[] = [
  {
    id: "thermal",
    label: "Thermal Management",
    icon: "🌡️",
    items: [
      {
        id: "t1",
        question: "Is there a thermal simulation or estimate for your SoC under peak AI inference load?",
        why: "Edge AI chips (RK3588S, QCS6490) can hit 85°C+ during sustained inference. Without thermal planning, you'll throttle or fail reliability tests.",
        fix: "Run thermal simulation early. Budget 2–5mm for heat spreader or thermal pad in your stack-up.",
        severity: "critical",
      },
      {
        id: "t2",
        question: "Is there adequate PCB copper pour for heat dissipation under the SoC?",
        why: "The PCB is your primary heatsink in compact devices. Insufficient copper pour causes hot spots and solder joint fatigue.",
        fix: "Use thermal vias (array of 0.3mm vias) under the SoC pad, connected to an internal ground plane.",
        severity: "critical",
      },
      {
        id: "t3",
        question: "Have you verified the enclosure material can handle the operating temperature?",
        why: "ABS softens at 80°C. If your SoC runs hot, the enclosure near the chip can deform or discolor.",
        fix: "Use PC (polycarbonate) or ABS/PC blend for areas near heat sources. Add ventilation slots if >3W sustained.",
        severity: "major",
      },
      {
        id: "t4",
        question: "Is the battery positioned away from heat-generating components?",
        why: "LiPo batteries degrade rapidly above 45°C and can swell or fail. Thermal runaway is a safety hazard.",
        fix: "Maintain ≥3mm air gap or thermal barrier between battery and SoC. Never stack battery directly under the processor.",
        severity: "critical",
      },
    ],
  },
  {
    id: "antenna",
    label: "Antenna & RF Design",
    icon: "📡",
    items: [
      {
        id: "a1",
        question: "Is there a ground clearance zone around all antennas (WiFi, BLE, cellular, GPS)?",
        why: "Metal near antennas kills performance. The #1 cause of failed FCC/CE tests is antenna detuning from nearby copper or enclosure metal.",
        fix: "Keep ≥5mm copper-free zone around 2.4GHz antenna. 10mm for cellular. No ground plane under the antenna element.",
        severity: "critical",
      },
      {
        id: "a2",
        question: "Is the antenna placement compatible with typical user grip/wear positions?",
        why: "Human body absorbs RF. A wrist-worn device with the antenna on the skin side will lose 6–10dB signal.",
        fix: "Place antenna on the side facing away from the body. Test with phantom hand/body during development.",
        severity: "major",
      },
      {
        id: "a3",
        question: "Have you accounted for antenna detuning from the enclosure material?",
        why: "Plastic enclosures shift antenna resonant frequency. Metal-painted or metallized plastics can block RF entirely.",
        fix: "Avoid metallic paint near antennas. Tune the antenna with the final enclosure material, not in free space.",
        severity: "major",
      },
      {
        id: "a4",
        question: "If using cellular (4G/5G), is there sufficient antenna volume for the required bands?",
        why: "Multi-band cellular needs ~500–1000mm³ of antenna volume. Undersized antennas cause dropped calls and failed carrier certification.",
        fix: "Allocate antenna volume early in ID design. Consider FPC (flex PCB) antenna if space is tight.",
        severity: "major",
      },
    ],
  },
  {
    id: "power",
    label: "Power & Battery",
    icon: "🔋",
    items: [
      {
        id: "p1",
        question: "Have you profiled the power consumption across all operating modes (sleep, active, AI inference)?",
        why: "AI inference can draw 10–50× more current than idle. Without profiling, your battery life claims will be wrong and your regulator may be undersized.",
        fix: "Measure current in each mode. Size the regulator for peak (not average) current. Design a power state machine in firmware.",
        severity: "critical",
      },
      {
        id: "p2",
        question: "Is your USB-C charging circuit designed to handle the battery safely?",
        why: "Incorrect charging IC selection or missing protection can cause battery swelling, fire, or regulatory failure.",
        fix: "Use a certified charging IC (TP4056 minimum, IP5306 for power path). Add over-voltage, over-current, and thermal cutoff protection.",
        severity: "critical",
      },
      {
        id: "p3",
        question: "Are voltage rails sequenced correctly for the SoC and peripherals?",
        why: "Many SoCs require specific power-up sequences (core → I/O → memory). Wrong sequence causes latch-up or silicon damage.",
        fix: "Read the SoC datasheet power sequencing section. Use PMIC with sequencing support or add enable-chain delays.",
        severity: "major",
      },
      {
        id: "p4",
        question: "Have you added a fuel gauge or voltage-based battery level indicator?",
        why: "Without accurate battery reporting, users can't trust your device. LiPo voltage curves are non-linear.",
        fix: "Use a coulomb counter IC (MAX17048) for accuracy, or implement a voltage lookup table with load compensation.",
        severity: "minor",
      },
    ],
  },
  {
    id: "mechanical",
    label: "Mechanical & Enclosure",
    icon: "📐",
    items: [
      {
        id: "m1",
        question: "Do all plastic walls meet minimum thickness for injection molding (≥1.0mm)?",
        why: "Walls thinner than 1.0mm cause short shots (incomplete fill) and sink marks. Shenzhen tooling houses will reject or charge extra.",
        fix: "Maintain 1.2–1.5mm wall thickness for ABS/PC. Keep uniform thickness to prevent warping.",
        severity: "critical",
      },
      {
        id: "m2",
        question: "Are there draft angles (≥1°) on all vertical surfaces for mold release?",
        why: "Without draft, parts stick in the mold, causing scratches, deformation, and slow cycle times (higher cost).",
        fix: "Add 1–3° draft angle on all walls. Textured surfaces need more draft (1° per 0.025mm texture depth).",
        severity: "critical",
      },
      {
        id: "m3",
        question: "Is the snap-fit or screw boss design validated for repeated assembly/disassembly?",
        why: "Service, RMA, and regulatory testing require opening the device. Snap-fits that break on first open are a production nightmare.",
        fix: "Design snap-fits with 2% max strain for ABS. Add screw bosses as backup. Test with 20+ open/close cycles.",
        severity: "major",
      },
      {
        id: "m4",
        question: "Is there adequate space for FCC/CE/UL markings on the enclosure?",
        why: "Regulatory marks must be permanent and legible. If your enclosure is too small, you'll need to redesign at certification stage.",
        fix: "Reserve a 15×8mm flat area for laser-engraved or pad-printed regulatory marks. Plan this in the ID phase.",
        severity: "minor",
      },
      {
        id: "m5",
        question: "Have you specified IP rating requirements and designed sealing accordingly?",
        why: "Wearables often need IPX4 (splash) minimum. Adding waterproofing after design is extremely expensive.",
        fix: "Define IP rating early. IPX4 needs gaskets at seams. IPX7 needs O-rings, sealed connectors, and pressure-tested enclosures.",
        severity: "major",
      },
    ],
  },
  {
    id: "pcb",
    label: "PCB Layout",
    icon: "🔧",
    items: [
      {
        id: "b1",
        question: "Are high-speed signals (USB, MIPI, DDR) properly impedance-matched?",
        why: "Impedance mismatch causes signal reflections, data errors, and EMI. USB/MIPI/DDR will fail at speed without controlled impedance.",
        fix: "Use impedance-controlled stackup. 90Ω differential for USB, 100Ω for MIPI. Specify in PCB fab notes.",
        severity: "critical",
      },
      {
        id: "b2",
        question: "Are decoupling capacitors placed within 2mm of each power pin?",
        why: "Long traces to decoupling caps add inductance, causing voltage droop during current spikes (especially during AI inference bursts).",
        fix: "Place 100nF caps within 2mm of every power pin. Add bulk caps (10–100µF) near the voltage regulator output.",
        severity: "major",
      },
      {
        id: "b3",
        question: "Is the microphone placement optimized for acoustic performance?",
        why: "MEMS mics are extremely sensitive to placement. Sound ports blocked by enclosure, or mics near vibration sources, kill voice AI accuracy.",
        fix: "Align mic sound port with enclosure hole (≤0.5mm offset). Add acoustic chamber (1–2mm air gap). Keep away from speaker and motor.",
        severity: "critical",
      },
      {
        id: "b4",
        question: "Are test points accessible for production testing (ICT/flying probe)?",
        why: "Without test points, you can't verify boards in production. You'll rely on functional testing only, which is slower and catches fewer defects.",
        fix: "Add test pads for all power rails, key signals, and programming interfaces. Minimum pad size 1.0mm for flying probe.",
        severity: "major",
      },
      {
        id: "b5",
        question: "Is the PCB panelized efficiently for SMT production?",
        why: "Poor panelization wastes PCB material and slows pick-and-place setup. Non-standard panels add NRE charges at the SMT house.",
        fix: "Design panel with 3–5mm rails, V-score or tab-routing. Keep panel size within 100×100mm to 250×330mm for standard SMT lines.",
        severity: "minor",
      },
    ],
  },
  {
    id: "firmware",
    label: "Firmware & Software",
    icon: "💻",
    items: [
      {
        id: "f1",
        question: "Is there a reliable firmware update mechanism (OTA or USB)?",
        why: "You will ship bugs. Without OTA, every firmware fix requires physical recall or customer-side USB flashing — both are expensive.",
        fix: "Implement dual-bank OTA with rollback. Test update failure scenarios (power loss mid-update, corrupted image).",
        severity: "critical",
      },
      {
        id: "f2",
        question: "Have you implemented factory calibration and provisioning in the production flow?",
        why: "Each unit needs unique credentials (device ID, certificates, WiFi provisioning). Manual provisioning doesn't scale past 100 units.",
        fix: "Build a factory tool that programs credentials, runs self-test, and logs results — all in <30 seconds per unit.",
        severity: "major",
      },
      {
        id: "f3",
        question: "Is your AI model optimized for the target SoC (quantized, pruned)?",
        why: "Running an unoptimized model on edge hardware will drain battery 3–5× faster and cause thermal issues.",
        fix: "Quantize to INT8. Use the SoC vendor's NPU SDK (RKNN for Rockchip, TFLite for ESP32). Profile inference time and power.",
        severity: "major",
      },
    ],
  },
  {
    id: "compliance",
    label: "Compliance & Certification",
    icon: "📜",
    items: [
      {
        id: "c1",
        question: "Have you identified all required certifications for your target markets?",
        why: "Missing certifications = can't sell. FCC (US), CE (EU), SRRC (China), MIC (Japan) each have different requirements and timelines.",
        fix: "Map target markets → required certs at project start. Budget 8–16 weeks and $8K–40K for testing.",
        severity: "critical",
      },
      {
        id: "c2",
        question: "Does your design meet EMI limits without requiring a shield can?",
        why: "Adding shield cans late in development adds cost ($0.50–2/unit), height, and requires PCB redesign for grounding.",
        fix: "Follow EMI best practices from the start: solid ground planes, short return paths, filtered I/O. Pre-scan with near-field probe.",
        severity: "major",
      },
      {
        id: "c3",
        question: "Is your battery compliant with UN38.3 transportation testing?",
        why: "Lithium batteries without UN38.3 certification cannot be shipped by air. Your entire supply chain depends on this.",
        fix: "Source batteries from suppliers who provide UN38.3 test reports. Budget $2K–5K if you need to test a custom cell.",
        severity: "critical",
      },
      {
        id: "c4",
        question: "Have you considered data privacy regulations (GDPR, CCPA) for your AI device?",
        why: "AI devices that record audio/video face strict privacy requirements. Non-compliance can result in fines and market bans.",
        fix: "Implement on-device processing where possible. Add clear privacy controls, data deletion, and consent flows.",
        severity: "major",
      },
    ],
  },
];

export const severityConfig: Record<Severity, { label: string; color: string; weight: number }> = {
  critical: { label: "Critical", color: "#EF4444", weight: 3 },
  major: { label: "Major", color: "#F59E0B", weight: 2 },
  minor: { label: "Minor", color: "#64748B", weight: 1 },
};
