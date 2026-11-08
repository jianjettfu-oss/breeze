import { categories, fixedCosts, volumeMultipliers, type Tier } from "../tools/bom-estimator/data";

/*
 * Three example builds priced with the BOM estimator's arithmetic (selected parts + fixed
 * costs, times the volume factor). Shared by the cost guide and the homepage FAQ so both
 * quote the same numbers, and both follow the tool data when it changes.
 */

export const ZERO: Tier = { low: 0, mid: 0, high: 0 };
export const add = (a: Tier, b: Tier): Tier => ({ low: a.low + b.low, mid: a.mid + b.mid, high: a.high + b.high });
export const scale = (t: Tier, f: number): Tier => ({ low: t.low * f, mid: t.mid * f, high: t.high * f });

export function part(categoryId: string, optionId: string) {
  const cat = categories.find((c) => c.id === categoryId);
  const opt = cat?.options.find((o) => o.id === optionId);
  if (!cat || !opt) throw new Error(`ai-hardware-cost: unknown BOM option ${categoryId}/${optionId}`);
  return { category: cat.label, label: opt.label, cost: opt.cost };
}

export const FIXED: Tier = fixedCosts.reduce((t, f) => add(t, f.cost), ZERO);

export const BUILDS = [
  {
    name: "Voice pendant",
    use: "Records speech and sends it to the cloud. MCU class.",
    parts: [
      part("soc", "esp32s3"),
      part("memory", "mem_mcu"),
      part("battery", "bat_small"),
      part("connectivity", "conn_builtin"),
      part("sensors", "sens_mic"),
    ],
  },
  {
    name: "Camera device",
    use: "Runs vision models on the device. Linux SoC with an NPU.",
    parts: [
      part("soc", "rk3562"),
      part("memory", "mem_mid"),
      part("battery", "bat_medium"),
      part("connectivity", "conn_wifi"),
      part("sensors", "sens_cam5"),
      part("sensors", "sens_mic"),
    ],
  },
  {
    name: "Screen + local AI",
    use: "Small screen, camera and a local language model.",
    parts: [
      part("soc", "rk3588s"),
      part("memory", "mem_high"),
      part("display", "lcd"),
      part("battery", "bat_large"),
      part("connectivity", "conn_wifi"),
      part("sensors", "sens_mic"),
      part("sensors", "sens_cam2"),
    ],
  },
].map((b) => {
  const parts = b.parts.reduce((t, p) => add(t, p.cost), ZERO);
  const memory = b.parts.filter((p) => p.category.startsWith("Memory")).reduce((t, p) => add(t, p.cost), ZERO);
  const unit = add(parts, FIXED);
  return { ...b, unit, memoryShare: Math.round((memory.mid / unit.mid) * 100) };
});

/** Unit cost of a build at a volume key of `volumeMultipliers` (e.g. "5000"). */
export const atVolume = (unit: Tier, volume: keyof typeof volumeMultipliers) =>
  scale(unit, volumeMultipliers[volume]?.factor ?? 1);

export const usd = (n: number) => (n >= 100 ? `$${Math.round(n).toLocaleString("en-US")}` : `$${n.toFixed(2)}`);
export const range = (t: Tier) => `${usd(t.low)}–${usd(t.high)}`;
