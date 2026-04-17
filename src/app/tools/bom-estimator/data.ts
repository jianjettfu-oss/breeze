/* BOM cost data — Shenzhen pricing at 1K volume (USD per unit) */

export type Tier = { low: number; mid: number; high: number };

export interface ComponentOption {
  id: string;
  label: string;
  description: string;
  cost: Tier;
}

export interface ComponentCategory {
  id: string;
  label: string;
  icon: string;
  options: ComponentOption[];
  optional?: boolean;
}

export const categories: ComponentCategory[] = [
  {
    id: "soc",
    label: "Processor / SoC",
    icon: "🧠",
    options: [
      {
        id: "esp32s3",
        label: "ESP32-S3",
        description: "Basic AI (voice, gesture). WiFi + BLE built-in.",
        cost: { low: 2.1, mid: 2.5, high: 3.2 },
      },
      {
        id: "rv1103",
        label: "Rockchip RV1103",
        description: "Camera + AI, 0.5 TOPS NPU. Plaud NotePin tier.",
        cost: { low: 3.5, mid: 5.0, high: 7.0 },
      },
      {
        id: "rk3562",
        label: "Rockchip RK3562",
        description: "Mid-range AI, 1 TOPS NPU, Mali G52 GPU.",
        cost: { low: 7.89, mid: 10.0, high: 13.0 },
      },
      {
        id: "rk3588s",
        label: "Rockchip RK3588S",
        description: "High-end, 6 TOPS NPU, octa-core. For edge servers.",
        cost: { low: 25.0, mid: 35.0, high: 50.0 },
      },
      {
        id: "genio",
        label: "MediaTek Genio 510/700",
        description: "4–10 TOPS NPU, industrial grade.",
        cost: { low: 18.0, mid: 28.0, high: 40.0 },
      },
    ],
  },
  {
    id: "memory",
    label: "Memory (RAM + Storage)",
    icon: "💾",
    options: [
      {
        id: "mem_low",
        label: "512MB + 4GB eMMC",
        description: "Basic: voice recorder, simple sensor device.",
        cost: { low: 2.7, mid: 4.0, high: 5.5 },
      },
      {
        id: "mem_mid",
        label: "1GB + 8GB eMMC",
        description: "Standard: camera device, on-device AI inference.",
        cost: { low: 4.2, mid: 6.5, high: 9.0 },
      },
      {
        id: "mem_high",
        label: "2GB + 32GB eMMC",
        description: "High: smart display, local LLM, multi-model AI.",
        cost: { low: 8.0, mid: 11.5, high: 16.0 },
      },
      {
        id: "mem_mcu",
        label: "8MB PSRAM + 4MB Flash",
        description: "MCU-tier: ESP32-S3 builds, no discrete RAM.",
        cost: { low: 0.85, mid: 1.4, high: 2.2 },
      },
    ],
  },
  {
    id: "display",
    label: "Display",
    icon: "📱",
    optional: true,
    options: [
      {
        id: "none",
        label: "No display",
        description: "Audio-only device (like Plaud NotePin).",
        cost: { low: 0, mid: 0, high: 0 },
      },
      {
        id: "oled_small",
        label: '0.96" OLED (mono)',
        description: "Simple status display, 128x64.",
        cost: { low: 0.8, mid: 1.2, high: 1.8 },
      },
      {
        id: "oled_color",
        label: '1.54" AMOLED (color)',
        description: "Smartwatch-tier, 240x240.",
        cost: { low: 3.0, mid: 5.0, high: 8.0 },
      },
      {
        id: "lcd",
        label: '2.4" TFT LCD IPS',
        description: "Full color display, 320x240.",
        cost: { low: 2.5, mid: 4.0, high: 6.0 },
      },
      {
        id: "eink",
        label: '2.13" E-ink',
        description: "Ultra-low power, 212x104.",
        cost: { low: 4.0, mid: 6.0, high: 9.0 },
      },
    ],
  },
  {
    id: "battery",
    label: "Battery",
    icon: "🔋",
    options: [
      {
        id: "bat_tiny",
        label: "100–150mAh",
        description: "Ultra-slim pendant, ~4hr runtime.",
        cost: { low: 0.4, mid: 0.65, high: 0.9 },
      },
      {
        id: "bat_small",
        label: "300–500mAh",
        description: "Compact wearable, ~8–12hr runtime.",
        cost: { low: 1.0, mid: 1.4, high: 2.0 },
      },
      {
        id: "bat_medium",
        label: "800–1000mAh",
        description: "Full-day device, ~16–20hr runtime.",
        cost: { low: 1.5, mid: 2.2, high: 3.2 },
      },
      {
        id: "bat_large",
        label: "1500–2000mAh",
        description: "Multi-day, larger form factor required.",
        cost: { low: 2.5, mid: 3.8, high: 5.5 },
      },
    ],
  },
  {
    id: "connectivity",
    label: "Connectivity",
    icon: "📡",
    options: [
      {
        id: "conn_builtin",
        label: "WiFi + BLE (built-in)",
        description: "Included in ESP32-S3. No extra cost.",
        cost: { low: 0, mid: 0, high: 0 },
      },
      {
        id: "conn_ble",
        label: "BLE 5.0 module",
        description: "nRF52840-based, ultra-low power.",
        cost: { low: 2.0, mid: 3.5, high: 5.0 },
      },
      {
        id: "conn_wifi",
        label: "WiFi/BT module (add-on)",
        description: "For non-Espressif SoCs.",
        cost: { low: 1.5, mid: 2.5, high: 4.0 },
      },
      {
        id: "conn_4g",
        label: "4G LTE Cat-1",
        description: "Quectel EC21/EC25. Adds SIM slot + antenna.",
        cost: { low: 7.0, mid: 10.0, high: 15.0 },
      },
      {
        id: "conn_gps",
        label: "GPS/GNSS add-on",
        description: "Location tracking. +$1.50–8 on top of above.",
        cost: { low: 1.5, mid: 5.0, high: 8.0 },
      },
    ],
  },
  {
    id: "sensors",
    label: "Sensors",
    icon: "🎤",
    optional: true,
    options: [
      {
        id: "sens_mic",
        label: "MEMS Microphones (×2)",
        description: "PDM/I2S. Essential for voice AI.",
        cost: { low: 0.6, mid: 1.0, high: 1.8 },
      },
      {
        id: "sens_imu",
        label: "6-axis IMU",
        description: "Accelerometer + Gyroscope.",
        cost: { low: 0.4, mid: 0.8, high: 1.5 },
      },
      {
        id: "sens_cam2",
        label: "Camera 2MP (OV2640)",
        description: "Basic AI vision, fixed focus.",
        cost: { low: 1.5, mid: 2.5, high: 4.0 },
      },
      {
        id: "sens_cam5",
        label: "Camera 5MP (OV5640)",
        description: "Higher resolution, auto-focus.",
        cost: { low: 3.0, mid: 5.0, high: 8.0 },
      },
      {
        id: "sens_env",
        label: "Environmental (temp/humidity/pressure)",
        description: "SHT30 + BMP280 combo.",
        cost: { low: 0.5, mid: 0.9, high: 1.6 },
      },
    ],
  },
];

/* Fixed costs that always apply */
export const fixedCosts: { label: string; cost: Tier }[] = [
  {
    label: "PCB (4-layer rigid, ~50cm²)",
    cost: { low: 0.5, mid: 0.9, high: 1.5 },
  },
  {
    label: "Enclosure (injection mold, 2-part)",
    cost: { low: 4.5, mid: 8.0, high: 13.0 },
  },
  {
    label: "SMT Assembly (medium complexity)",
    cost: { low: 3.0, mid: 5.0, high: 8.0 },
  },
  {
    label: "Manual assembly + testing",
    cost: { low: 1.3, mid: 2.5, high: 4.5 },
  },
  {
    label: "Passives, connectors, USB-C, LEDs",
    cost: { low: 0.9, mid: 1.45, high: 2.25 },
  },
  {
    label: "Charging IC + power management",
    cost: { low: 0.35, mid: 0.65, high: 1.1 },
  },
];

/* Volume scaling factors (relative to 1K baseline) */
export const volumeMultipliers: Record<string, { label: string; factor: number }> = {
  "500": { label: "500 units", factor: 1.3 },
  "1000": { label: "1,000 units", factor: 1.0 },
  "5000": { label: "5,000 units", factor: 0.75 },
  "10000": { label: "10,000 units", factor: 0.6 },
  "50000": { label: "50,000+ units", factor: 0.48 },
};

/* NRE (one-time) costs */
export const nreCosts = {
  enclosureMold: { label: "Enclosure mold tooling", low: 3000, mid: 6000, high: 20000 },
  pcbNre: { label: "PCB NRE", low: 200, mid: 400, high: 600 },
  certification: { label: "Certification (FCC + CE)", low: 8000, mid: 15000, high: 40000 },
};
