// Breeze token access + colour maths. One module, so DESIGN.md, brand-check and the review pages read the
// same palette the same way (artifact-ownership Rule 1a: one rule, N enforcement points, same predicate).
import { readFileSync } from 'node:fs';
const HERE = new URL('.', import.meta.url).pathname;
export const BRAND = `${HERE}../`, KIT = `${HERE}out/`;
export const T = JSON.parse(readFileSync(`${BRAND}tokens.json`, 'utf8')), C = T.colour;
export const manifest = () => JSON.parse(readFileSync(`${KIT}manifest.json`, 'utf8'));

// The shipped palette: every colour a Breeze surface may use, with its token path. Records are NOT in it:
// hw.candidates, hw.groundCandidates, hw._killed, sisters — those exist to be compared against, never used.
export function palette() {
  const out = [], add = (path, hex) => out.push({ path, hex: hex.toUpperCase() });
  for (const [k, v] of Object.entries(C)) {
    if (k.startsWith('_') || k === 'sisters') continue;
    if (typeof v === 'string') { add(k, v); continue; }
    for (const g of ['light', 'dark']) if (typeof v[g] === 'string') add(`${k}.${g}`, v[g]);
    if (k === 'hw' && v.darkGround) add('hw.darkGround', v.darkGround);
  }
  const seen = new Map();
  for (const p of out) if (!seen.has(p.hex)) seen.set(p.hex, p.path);
  return { list: out, byHex: seen };
}
export const families = () => Object.entries(T.type).filter(([k, v]) => !k.startsWith('_') && v.family).map(([k, v]) => ({ role: k, ...v }));

// ---------- colour maths (WCAG contrast, CIEDE2000)
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = h => { const [r, g, b] = rgb(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
function lab(h) {
  const [r, g, b] = rgb(h).map(lin), f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  const X = f((r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047), Y = f(r * 0.2126 + g * 0.7152 + b * 0.0722), Z = f((r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883);
  return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)];
}
export function de00(h1, h2) {
  const [L1, a1, b1] = lab(h1), [L2, a2, b2] = lab(h2), d = Math.PI / 180;
  const Cb = (Math.hypot(a1, b1) + Math.hypot(a2, b2)) / 2, G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const A1 = (1 + G) * a1, A2 = (1 + G) * a2, C1 = Math.hypot(A1, b1), C2 = Math.hypot(A2, b2);
  const hp = (a, b) => { const v = Math.atan2(b, a) / d; return v < 0 ? v + 360 : v; }, h1p = hp(A1, b1), h2p = hp(A2, b2);
  let dh = h2p - h1p; if (Math.abs(dh) > 180) dh -= 360 * Math.sign(dh);
  const dL = L2 - L1, dC = C2 - C1, dH = 2 * Math.sqrt(C1 * C2) * Math.sin(dh * d / 2), Lb = (L1 + L2) / 2, Cp = (C1 + C2) / 2;
  let hb = (h1p + h2p) / 2; if (Math.abs(h1p - h2p) > 180) hb += 180;
  const Tt = 1 - 0.17 * Math.cos((hb - 30) * d) + 0.24 * Math.cos(2 * hb * d) + 0.32 * Math.cos((3 * hb + 6) * d) - 0.2 * Math.cos((4 * hb - 63) * d);
  const SL = 1 + 0.015 * (Lb - 50) ** 2 / Math.sqrt(20 + (Lb - 50) ** 2), SC = 1 + 0.045 * Cp, SH = 1 + 0.015 * Cp * Tt;
  const RT = -2 * Math.sqrt(Cp ** 7 / (Cp ** 7 + 25 ** 7)) * Math.sin(60 * Math.exp(-(((hb - 275) / 25) ** 2)) * d);
  return Math.sqrt((dL / SL) ** 2 + (dC / SC) ** 2 + (dH / SH) ** 2 + RT * (dC / SC) * (dH / SH));
}
