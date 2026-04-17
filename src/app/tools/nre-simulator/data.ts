/* NRE (Non-Recurring Engineering) cost data — Shenzhen pricing (USD) */

export interface NreOption {
  id: string;
  label: string;
  description: string;
  low: number;
  mid: number;
  high: number;
}

export interface NreCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  options: NreOption[];
  multiSelect?: boolean;
}

export const nreCategories: NreCategory[] = [
  {
    id: "industrial",
    label: "Industrial Design",
    icon: "🎨",
    description: "Product appearance, ergonomics, CMF (color, material, finish).",
    options: [
      {
        id: "id_basic",
        label: "Basic (simple enclosure, 1 concept)",
        description: "Rectangular housing, minimal curves. Suitable for MVP/dev kit.",
        low: 2000,
        mid: 4000,
        high: 6000,
      },
      {
        id: "id_standard",
        label: "Standard (refined design, 2–3 concepts)",
        description: "Organic shapes, user-tested ergonomics, CMF spec. Most wearables.",
        low: 6000,
        mid: 12000,
        high: 18000,
      },
      {
        id: "id_premium",
        label: "Premium (consumer-grade, 5+ concepts)",
        description: "Apple-level finish. Multiple rounds of refinement, renders, mockups.",
        low: 15000,
        mid: 30000,
        high: 50000,
      },
    ],
  },
  {
    id: "mechanical",
    label: "Mechanical Engineering",
    icon: "📐",
    description: "3D CAD, tolerance analysis, mold design, FEA simulation.",
    options: [
      {
        id: "me_simple",
        label: "Simple (2-part enclosure, no moving parts)",
        description: "Snap-fit or screw assembly. Badge/pendant form factor.",
        low: 3000,
        mid: 6000,
        high: 10000,
      },
      {
        id: "me_medium",
        label: "Medium (3–5 parts, buttons, sealing)",
        description: "Watch-like assembly, gaskets, IPX4. Most AI wearables.",
        low: 8000,
        mid: 15000,
        high: 25000,
      },
      {
        id: "me_complex",
        label: "Complex (hinge, slider, or modular design)",
        description: "Foldable, rotatable, or multi-module. AR glasses tier.",
        low: 20000,
        mid: 35000,
        high: 60000,
      },
    ],
  },
  {
    id: "electronics",
    label: "Electronics Engineering",
    icon: "⚡",
    description: "Schematic, PCB layout, power design, signal integrity.",
    options: [
      {
        id: "ee_mcu",
        label: "MCU-based (ESP32-S3 tier)",
        description: "Simple SoC + sensors + BLE. 2-layer or 4-layer PCB.",
        low: 3000,
        mid: 5000,
        high: 8000,
      },
      {
        id: "ee_ap",
        label: "Application processor (Rockchip/MTK tier)",
        description: "DDR routing, high-speed interfaces, 4–6 layer PCB.",
        low: 8000,
        mid: 15000,
        high: 25000,
      },
      {
        id: "ee_advanced",
        label: "Advanced (multi-board, flex, RF custom)",
        description: "Rigid-flex PCB, custom antenna, multiple power domains.",
        low: 20000,
        mid: 35000,
        high: 55000,
      },
    ],
  },
  {
    id: "firmware",
    label: "Firmware & Software",
    icon: "💻",
    description: "BSP, drivers, application logic, OTA, cloud integration.",
    options: [
      {
        id: "fw_basic",
        label: "Basic (sensor + BLE + app)",
        description: "Data collection, BLE transfer to phone app. No on-device AI.",
        low: 5000,
        mid: 10000,
        high: 18000,
      },
      {
        id: "fw_ai",
        label: "On-device AI (inference + cloud sync)",
        description: "Edge model deployment, voice/vision processing, OTA updates.",
        low: 15000,
        mid: 30000,
        high: 50000,
      },
      {
        id: "fw_full",
        label: "Full stack (device + app + cloud backend)",
        description: "Complete product software: firmware, mobile app, API, dashboard.",
        low: 30000,
        mid: 60000,
        high: 100000,
      },
    ],
  },
  {
    id: "tooling",
    label: "Tooling & Molds",
    icon: "🔩",
    description: "Injection mold fabrication, jigs, fixtures, test equipment.",
    options: [
      {
        id: "tool_soft",
        label: "Soft mold (aluminum, <500 units)",
        description: "Quick-turn prototype mold. 2–3 week lead time. Limited shots.",
        low: 500,
        mid: 1500,
        high: 3000,
      },
      {
        id: "tool_production",
        label: "Production mold (steel, simple 2-part)",
        description: "P20 steel, 100K+ shot life. Standard for most products.",
        low: 3000,
        mid: 6000,
        high: 12000,
      },
      {
        id: "tool_complex",
        label: "Complex mold (multi-cavity, side actions)",
        description: "H13 steel, overmolding, slides. Premium finish products.",
        low: 10000,
        mid: 20000,
        high: 40000,
      },
    ],
  },
  {
    id: "prototyping",
    label: "Prototyping",
    icon: "🧪",
    description: "Functional prototypes for testing and investor demos.",
    multiSelect: true,
    options: [
      {
        id: "proto_3d",
        label: "3D printed enclosure (3–5 units)",
        description: "SLA/SLS prints for form factor and ergonomics testing.",
        low: 500,
        mid: 1500,
        high: 3000,
      },
      {
        id: "proto_pcba",
        label: "PCBA prototypes (5–10 boards)",
        description: "Fully assembled PCBs for firmware development and testing.",
        low: 1000,
        mid: 3000,
        high: 6000,
      },
      {
        id: "proto_evt",
        label: "EVT build (10–30 units)",
        description: "Engineering validation test. Near-final design, manual assembly.",
        low: 5000,
        mid: 10000,
        high: 20000,
      },
      {
        id: "proto_dvt",
        label: "DVT build (30–100 units)",
        description: "Design validation test. Tooled enclosures, production-intent.",
        low: 10000,
        mid: 20000,
        high: 40000,
      },
    ],
  },
  {
    id: "certification",
    label: "Certification & Testing",
    icon: "📜",
    description: "Regulatory testing and compliance for target markets.",
    multiSelect: true,
    options: [
      {
        id: "cert_fcc",
        label: "FCC (United States)",
        description: "Required for any wireless device sold in the US.",
        low: 3000,
        mid: 5000,
        high: 10000,
      },
      {
        id: "cert_ce",
        label: "CE / RED (European Union)",
        description: "Radio Equipment Directive for EU market access.",
        low: 3000,
        mid: 6000,
        high: 12000,
      },
      {
        id: "cert_ul",
        label: "UL / IEC 62368 (Safety)",
        description: "Product safety certification. Required by many retailers.",
        low: 5000,
        mid: 10000,
        high: 20000,
      },
      {
        id: "cert_srrc",
        label: "SRRC + CCC (China)",
        description: "Radio and compulsory certification for China market.",
        low: 4000,
        mid: 8000,
        high: 15000,
      },
      {
        id: "cert_battery",
        label: "UN38.3 (Battery transport)",
        description: "Required for lithium battery air shipping.",
        low: 1500,
        mid: 3000,
        high: 5000,
      },
    ],
  },
];

/* Timeline estimates (weeks) */
export const timelineEstimates: Record<string, { label: string; weeks: number }> = {
  industrial: { label: "Industrial Design", weeks: 4 },
  mechanical: { label: "Mechanical Engineering", weeks: 6 },
  electronics: { label: "Electronics Engineering", weeks: 6 },
  firmware: { label: "Firmware & Software", weeks: 10 },
  tooling: { label: "Tooling & Molds", weeks: 5 },
  prototyping: { label: "Prototyping", weeks: 4 },
  certification: { label: "Certification", weeks: 10 },
};
