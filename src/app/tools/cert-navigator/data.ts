/* Certification Navigator — decision tree data */

export interface CertInfo {
  id: string;
  name: string;
  fullName: string;
  region: string;
  flag: string;
  required: boolean;
  description: string;
  applicableTo: string[];
  timeline: string;
  cost: { low: number; mid: number; high: number };
  keyRequirements: string[];
  tips: string[];
  labExamples: string[];
}

export const certifications: CertInfo[] = [
  {
    id: "fcc",
    name: "FCC",
    fullName: "Federal Communications Commission",
    region: "United States",
    flag: "🇺🇸",
    required: true,
    description: "Required for any electronic device that emits RF energy sold in the US. Covers intentional radiators (WiFi, BLE, cellular) and unintentional radiators (digital devices).",
    applicableTo: ["wifi", "ble", "cellular", "digital"],
    timeline: "4–8 weeks",
    cost: { low: 3000, mid: 5000, high: 10000 },
    keyRequirements: [
      "FCC Part 15 for WiFi/BLE (intentional radiator)",
      "FCC Part 15B for digital devices (unintentional radiator)",
      "FCC ID required — must apply through a Grantee Code",
      "5 production-representative samples needed",
      "Label with FCC ID must be visible or e-label for small devices",
    ],
    tips: [
      "Apply for a Grantee Code early — it takes 1–2 weeks",
      "Pre-scan at a local EMC lab ($500–1000) before formal testing saves rework",
      "Small devices (<8cm) can use e-labeling instead of physical FCC ID label",
      "Modular transmitter approval: if using a pre-certified WiFi module, you may only need unintentional radiator testing",
    ],
    labExamples: ["Bureau Veritas (Shenzhen)", "TÜV SÜD", "SGS", "Intertek"],
  },
  {
    id: "ce",
    name: "CE / RED",
    fullName: "Radio Equipment Directive (2014/53/EU)",
    region: "European Union",
    flag: "🇪🇺",
    required: true,
    description: "Mandatory for placing radio equipment on the EU market. Covers safety (LVD), EMC, and radio spectrum requirements. Self-declaration possible but Notified Body review recommended.",
    applicableTo: ["wifi", "ble", "cellular"],
    timeline: "6–10 weeks",
    cost: { low: 3000, mid: 6000, high: 12000 },
    keyRequirements: [
      "EN 301 489 — EMC for radio equipment",
      "EN 300 328 — 2.4GHz WiFi/BLE",
      "EN 62368-1 — Safety (replaces EN 60950-1)",
      "EN 62311 — Human exposure to electromagnetic fields (SAR for body-worn)",
      "DoC (Declaration of Conformity) required",
      "Authorized representative in the EU required since 2021",
    ],
    tips: [
      "CE and FCC testing can be done in parallel at the same lab to save time",
      "Body-worn devices need SAR testing — budget extra $3K–5K",
      "You need an EU-based Authorized Representative (can be a service for ~$500/yr)",
      "Keep the Technical File (design docs, test reports, risk assessment) for 10 years",
    ],
    labExamples: ["SGS (Shenzhen)", "Bureau Veritas", "TÜV Rheinland", "CTTL"],
  },
  {
    id: "ul",
    name: "UL / IEC 62368",
    fullName: "UL 62368-1 / IEC 62368-1 Safety Certification",
    region: "Global (US, EU, others)",
    flag: "🌐",
    required: false,
    description: "Product safety standard for audio/video, IT, and communication equipment. Not legally required in all markets, but major retailers (Amazon, Best Buy, Target) and insurance companies often require it.",
    applicableTo: ["wifi", "ble", "cellular", "digital", "battery"],
    timeline: "8–14 weeks",
    cost: { low: 5000, mid: 10000, high: 20000 },
    keyRequirements: [
      "Covers fire, electric shock, and mechanical hazards",
      "Battery-powered devices: battery must meet IEC 62133 or UL 2054",
      "Charging system evaluated for abnormal conditions",
      "All safety-critical components must be UL-recognized or tested",
      "Factory inspection required (initial + annual follow-up)",
    ],
    tips: [
      "Start with a preliminary review — UL offers 'pre-submission' consultations",
      "Amazon often requires UL certification for lithium battery products",
      "CB Scheme report (IEC 62368-1) can be transferred to multiple national marks",
      "Annual factory inspections: budget $2K–4K/year ongoing cost",
    ],
    labExamples: ["UL (direct)", "TÜV SÜD", "CSA Group", "Intertek (ETL)"],
  },
  {
    id: "srrc",
    name: "SRRC",
    fullName: "State Radio Regulation of China",
    region: "China",
    flag: "🇨🇳",
    required: true,
    description: "Radio type approval required for any wireless device sold in China. Must be obtained before CCC (if CCC applicable) or before sale.",
    applicableTo: ["wifi", "ble", "cellular"],
    timeline: "6–10 weeks",
    cost: { low: 4000, mid: 8000, high: 15000 },
    keyRequirements: [
      "Type approval application to MIIT (Ministry of Industry and Information Technology)",
      "Testing at designated Chinese lab",
      "Chinese entity required as applicant (or local agent)",
      "5 samples required",
      "SRRC certificate valid for 5 years",
    ],
    tips: [
      "If you have a Shenzhen partner (like Breeze), they can be the local applicant",
      "SRRC must be obtained BEFORE applying for CCC",
      "Pre-certified WiFi/BLE modules reduce scope to just the host device",
      "Processing time has improved — typically 4–6 weeks after submission",
    ],
    labExamples: ["CTTL (Beijing)", "CESI", "CTC (Shenzhen)", "MTNet"],
  },
  {
    id: "ccc",
    name: "CCC",
    fullName: "China Compulsory Certification",
    region: "China",
    flag: "🇨🇳",
    required: false,
    description: "Compulsory for specific product categories sold in China. Not all electronics require CCC — check the CCC catalog. Battery-powered, low-voltage devices are often exempt.",
    applicableTo: ["digital", "battery"],
    timeline: "8–16 weeks",
    cost: { low: 5000, mid: 10000, high: 20000 },
    keyRequirements: [
      "Must be in the CCC product catalog to be required",
      "Factory audit required (initial + annual)",
      "SRRC must be obtained first (if wireless)",
      "Testing at CNCA-designated lab",
      "Chinese entity required as certificate holder",
    ],
    tips: [
      "Many AI wearables are CCC-exempt — check the catalog before budgeting",
      "Battery-only devices (no mains power) are often exempt",
      "If exempt from CCC, voluntary CQC mark is available but rarely needed",
      "Factory audit can be done at your Shenzhen manufacturing facility",
    ],
    labExamples: ["CQC (direct)", "CESI", "CTC"],
  },
  {
    id: "mic",
    name: "MIC / TELEC",
    fullName: "Ministry of Internal Affairs and Communications",
    region: "Japan",
    flag: "🇯🇵",
    required: true,
    description: "Technical standards conformity certification for radio equipment in Japan. Required for WiFi, BLE, and cellular devices.",
    applicableTo: ["wifi", "ble", "cellular"],
    timeline: "4–8 weeks",
    cost: { low: 3000, mid: 5000, high: 10000 },
    keyRequirements: [
      "TELEC certification for specified radio equipment",
      "Testing per ARIB standards",
      "Japanese entity as applicant (or registered agent)",
      "Technical document submission in Japanese",
    ],
    tips: [
      "Many test labs in Shenzhen can do TELEC testing",
      "Can run in parallel with FCC/CE testing",
      "Pre-certified modules simplify the process significantly",
      "Japan has specific requirements for 5GHz WiFi DFS channels",
    ],
    labExamples: ["TÜV Rheinland (Shenzhen)", "SGS", "Bureau Veritas"],
  },
  {
    id: "un383",
    name: "UN38.3",
    fullName: "UN Manual of Tests and Criteria — Section 38.3",
    region: "Global (transportation)",
    flag: "✈️",
    required: true,
    description: "Required for ALL lithium battery products for air/sea transport. Without UN38.3, your batteries cannot be shipped — your entire supply chain stops.",
    applicableTo: ["battery"],
    timeline: "3–6 weeks",
    cost: { low: 1500, mid: 3000, high: 5000 },
    keyRequirements: [
      "8 tests: altitude, thermal, vibration, shock, short circuit, impact, overcharge, forced discharge",
      "Test report (not certification) is the deliverable",
      "Must test the specific cell AND the battery pack",
      "MSDS (Material Safety Data Sheet) also required for shipping",
    ],
    tips: [
      "Source batteries from suppliers who already have UN38.3 reports",
      "Custom battery shapes require new testing — use standard cells when possible",
      "Keep the UN38.3 report accessible — freight forwarders will ask for it",
      "Some airlines have additional requirements beyond UN38.3",
    ],
    labExamples: ["SGS", "Bureau Veritas", "TÜV", "UL"],
  },
  {
    id: "ised",
    name: "ISED",
    fullName: "Innovation, Science and Economic Development Canada",
    region: "Canada",
    flag: "🇨🇦",
    required: true,
    description: "Canadian radio certification, similar to FCC. Required for wireless devices sold in Canada.",
    applicableTo: ["wifi", "ble", "cellular"],
    timeline: "4–6 weeks",
    cost: { low: 2000, mid: 4000, high: 8000 },
    keyRequirements: [
      "RSS-247 for WiFi/BLE devices",
      "RSS-102 for RF exposure (SAR for body-worn)",
      "ISED certification number on label",
      "Can often use same test data as FCC (save cost)",
    ],
    tips: [
      "File FCC and ISED together — many labs do both in one test run",
      "ISED accepts FCC test data for most parameters",
      "If selling via Amazon.ca, ISED certification is mandatory",
      "Processing time is typically faster than FCC",
    ],
    labExamples: ["Same labs as FCC — Bureau Veritas, SGS, TÜV"],
  },
];

/* Device feature flags for filtering */
export const deviceFeatures = [
  { id: "wifi", label: "WiFi", icon: "📶" },
  { id: "ble", label: "Bluetooth / BLE", icon: "🔵" },
  { id: "cellular", label: "Cellular (4G/5G)", icon: "📱" },
  { id: "digital", label: "Digital circuits (any)", icon: "💻" },
  { id: "battery", label: "Lithium battery", icon: "🔋" },
];

/* Target market regions */
export const targetMarkets = [
  { id: "us", label: "United States", flag: "🇺🇸", certs: ["fcc", "ul", "un383"] },
  { id: "eu", label: "European Union", flag: "🇪🇺", certs: ["ce", "ul", "un383"] },
  { id: "cn", label: "China", flag: "🇨🇳", certs: ["srrc", "ccc", "un383"] },
  { id: "jp", label: "Japan", flag: "🇯🇵", certs: ["mic", "un383"] },
  { id: "ca", label: "Canada", flag: "🇨🇦", certs: ["ised", "un383"] },
  { id: "global", label: "Global (all major)", flag: "🌐", certs: ["fcc", "ce", "ul", "srrc", "mic", "ised", "un383"] },
];
