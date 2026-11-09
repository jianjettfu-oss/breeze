#!/usr/bin/env node
// Breeze brand-check — fails any Breeze surface that uses a colour or a font that is not in tokens.json,
// and fails when DESIGN.md's generated regions are stale (runs build-design.mjs --check).
//
// Run:  node data/brand/breeze/brand-check.mjs                 scan data/brand/breeze/** (default root)
//       node data/brand/breeze/brand-check.mjs --root <dir>    scan another tree too (breezehw.com source, PDF script); repeatable
//       node data/brand/breeze/brand-check.mjs --selftest      prove the checker can fail (exit 0 = it caught the planted faults)
// Exit: 0 clean · 1 violations · 2 the checker itself could not run.
//
// What counts as a colour: #RGB / #RRGGBB / #RRGGBBAA, rgb()/rgba(), the CSS keywords black/white, and — in .mjs/.js only —
// a quoted bare 6-hex string ('1B2528', the DOCX builder's form). Fonts: CSS font-family (declaration or SVG attribute),
// Google Fonts `family=` names, and the DOCX builder's ascii/hAnsi/eastAsia names. First family in a stack must be a token
// family; later ones may be token families or tokens.type.fallbacks.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, relative, extname } from 'node:path';
import { T, C, BRAND, palette, families } from './kit/tokens.mjs';

// Records, not surfaces: they show rejected colours on purpose. Printed in every report so the gap is visible.
const EXCLUDE = [/^brand-check\.mjs$/, /^review\//,/^breeze-[a-z-]+-2026-07-29\.html$/, /^PLAN-[\d-]+\.md$/, /^BRIEF\.md$/, /^DESIGN\.md$/, /^tokens\.json$/, /(^|\/)\.[^/]+/, /(^|\/)node_modules\//, /(^|\/)\.next\//, /(^|\/)dist\//];
const EXT = new Set(['.html', '.htm', '.css', '.svg', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.py']);

const PAL = palette().byHex;
const FAM = new Set(families().map(f => f.family.toLowerCase())), FALL = new Set(T.type.fallbacks.map(f => f.toLowerCase()));
const CJK = new Set(families().filter(f => f.role.startsWith('cjk')).map(f => f.family.toLowerCase()));
const LATIN = new Set([...FAM].filter(f => !CJK.has(f)));
if (!CJK.size || !LATIN.size) { console.error('FAIL brand-check: tokens.type has no CJK or no Latin family (role names changed?)'); process.exit(2); }
const KNOWN_BAD = new Map(); // a specific reason for colours we have already ruled out
for (const [k, v] of Object.entries(T.sisters)) if (!k.startsWith('_') && !PAL.has(v.toUpperCase())) KNOWN_BAD.set(v.toUpperCase(), `sister brand: ${k}`);
for (const [k, v] of Object.entries(C.hw.candidates || {})) for (const g of ['light', 'dark']) if (v[g] && !PAL.has(v[g].toUpperCase())) KNOWN_BAD.set(v[g].toUpperCase(), `rejected R4 candidate: ${k}`);
for (const [k, v] of Object.entries(C.hw.groundCandidates || {})) if (!PAL.has(v.value.toUpperCase())) KNOWN_BAD.set(v.value.toUpperCase(), `rejected R4 ground: ${k}`);
for (const k of Object.keys(C.hw._killed || {})) for (const h of k.match(/#[0-9A-Fa-f]{6}/g) || []) KNOWN_BAD.set(h.toUpperCase(), 'killed colour (R3/R4)');

const hex6 = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return `#${h.slice(0, 6).toUpperCase()}`; };
const toHex = (r, g, b) => `#${[r, g, b].map(n => Math.round(+n).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
const lineOf = (s, i) => s.slice(0, i).split('\n').length;

export function scan(text, ext) {
  // The text inside <code>…</code> documents a value (a rejected colour, a sister brand); it is never applied.
  // Blank it, keeping length and line breaks; the element's own attributes (style="…") are still scanned.
  if (['.html', '.htm'].includes(ext)) text = text.replace(/(<code\b[^>]*>)([\s\S]*?)(<\/code>)/g, (_, a, b, c) => a + b.replace(/[^\n]/g, ' ') + c);
  // Inside @font-face, font-family names a face (one family, no fallbacks); it is not a stack. Blank the declaration.
  text = text.replace(/@font-face\s*\{[^}]*/g, m => m.replace(/font-family\s*:[^;]*/i, d => d.replace(/[^\n]/g, ' ')));
  const out = [],colour = (i, raw, hex) => { if (!PAL.has(hex)) out.push({ line: lineOf(text, i), kind: 'colour', value: raw, why: KNOWN_BAD.get(hex) || `${hex} is not a token` }); };
  for (const m of text.matchAll(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])/g)) {
    const pre = text[m.index - 1] || '';
    if (/[&\w]/.test(pre)) continue;                        // &#123; entities, url fragments like foo#abc
    if (m[1].length === 3 && /^\d{3}$/.test(m[1]) && /[?&=]/.test(text.slice(m.index - 3, m.index))) continue;
    colour(m.index, m[0], hex6(m[0]));
  }
  for (const m of text.matchAll(/rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/gi)) colour(m.index, m[0] + ')', toHex(m[1], m[2], m[3]));
  if (['.css', '.html', '.htm', '.svg'].includes(ext)) for (const m of text.matchAll(/(?:color|fill|stroke|background(?:-color)?|border(?:-[a-z]+)?)\s*[:=]\s*["']?(black|white)\b/gi)) colour(m.index, m[1], m[1].toLowerCase() === 'white' ? '#FFFFFF' : '#000000');
  // Web app code writes colours with '#'; there an all-digit quoted string is a number ("100000" in a form whitelist,
  // 2026-11-09 false positive), so only the DOCX/ReportLab builders (.mjs/.py) are read for all-digit bare hex.
  if (['.mjs', '.js', '.ts', '.py'].includes(ext)) for (const m of text.matchAll(/['"]([0-9A-Fa-f]{6})['"]/g)) {
    if (/^\d{6}$/.test(m[1]) && ['.js', '.ts'].includes(ext)) continue;
    colour(m.index, m[0], `#${m[1].toUpperCase()}`);
  }

  const stack = (i, raw, css = false) => {
    const fams = raw.split(',').map(f => f.trim().replace(/^['"]|['"]$/g, '').trim()).filter(Boolean);
    if (!fams.length || /^(var\(|inherit|initial|unset)/.test(fams[0])) return;
    fams.forEach((f, n) => {
      const lc = f.toLowerCase();
      if (FAM.has(lc)) return;
      if (n > 0 && FALL.has(lc)) return;
      out.push({ line: lineOf(text, i), kind: 'font', value: f, why: n === 0 && FALL.has(lc) ? 'a fallback may not lead a stack' : 'not a token family' });
    });
    // A Latin-only stack sends any Chinese character to a system font (PingFang, variable ⇒ Type3 in PDF). Measured in the
    // July SCM templates 2026-11-08: th / .sec / .party .role. Every CSS stack led by a Latin family names a CJK token family.
    if (css && LATIN.has(fams[0].toLowerCase()) && !fams.some(f => CJK.has(f.toLowerCase())))
      out.push({ line: lineOf(text, i), kind: 'font', value: raw.trim(), why: 'Latin-only stack: add a CJK token family (Noto Sans SC) before the generic' });
  };
  // Two forms of the CSS declaration: unquoted / single-quoted families, and a stack that opens with a double-quoted
  // family. (Before 2026-11-08 only the first form was read, so `font-family:"Inter"` passed unseen.)
  for (const m of text.matchAll(/font-family\s*:\s*([^;}"\n]+)/gi)) stack(m.index, m[1], true);
  for (const m of text.matchAll(/font-family\s*:\s*((?:"[^"\n]*"\s*,?\s*)+[^;}\n"<]*)/gi)) stack(m.index, m[1], true);
  for (const m of text.matchAll(/font-family\s*=\s*"([^"]+)"/gi)) stack(m.index, m[1].replace(/&quot;|&#39;/g, "'"), true);
  for (const m of text.matchAll(/fonts\.googleapis\.com\/css2?\?[^"'\s)]+/g))
    for (const f of m[0].matchAll(/family=([^:&]+)/g)) stack(m.index, decodeURIComponent(f[1].replace(/\+/g, ' ')));
  if (['.mjs', '.js', '.ts'].includes(ext)) for (const m of text.matchAll(/(?:ascii|hAnsi|eastAsia|font)\s*:\s*'([^']+)'/g)) stack(m.index, m[1]);
  // A web app hides fonts and colours in three places the declarations above never see (found re-skinning breezehw.com,
  // 2026-11-09): Tailwind v4 `@theme { --font-sans: … }`, `next/font/google` imports, and Tailwind's own palette classes.
  for (const m of text.matchAll(/--font-[\w-]+\s*:\s*([^;}\n]+)/g)) stack(m.index, m[1], true);
  for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g))
    for (const n of m[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean)) stack(m.index, n.replace(/_/g, ' '));
  if (['.tsx', '.jsx', '.ts', '.js', '.html', '.htm'].includes(ext))
    for (const m of text.matchAll(/(?<![\w-])(?:bg|text|border(?:-[trblxy])?|from|to|via|ring|fill|stroke|divide|outline|decoration|shadow|accent|caret|placeholder)-(?:(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}|black)(?![\w-])/g))
      out.push({ line: lineOf(text, m.index), kind: 'colour', value: m[0], why: 'Tailwind palette class, not a token — use the theme token (ink, sub, hairline, hw, danger, caution …)' });
  // ReportLab and friends name fonts by file: Inter-Bold.ttf. Compare the family part with the token families, spaces removed.
  if (ext === '.py') for (const m of text.matchAll(/["']([A-Za-z]+)-(?:Regular|Bold|Medium|SemiBold|Light|Italic|Thin|ExtraBold|Black)\w*\.ttf["']/g))
    if (![...FAM].some(f => f.replace(/\s+/g, '') === m[1].toLowerCase())) out.push({ line: lineOf(text, m.index), kind: 'font', value: m[1], why: 'font file is not a token family' });
  return out;
}

function walk(root, base = root, acc = []) {
  for (const n of readdirSync(root)) {
    const p = join(root, n), rel = relative(base, p);
    if (EXCLUDE.some(re => re.test(rel))) continue;
    const s = statSync(p);
    if (s.isDirectory()) walk(p, base, acc); else if (EXT.has(extname(n).toLowerCase())) acc.push({ p, rel });
  }
  return acc;
}

function selftest() {
  const cases = [
    ['clean CSS', '.css', `a{color:${C.ink};font-family:"IBM Plex Sans","Noto Sans SC","PingFang SC",sans-serif;background:#fff}`, 0],
    ['double-quoted off-token font', '.css', 'a{font-family:"Inter",sans-serif}', 1],
    ['Latin-only stack (double quotes)', '.css', 'th{font-family:"IBM Plex Sans";font-weight:700}', 1],
    ['Latin-only stack (single quotes)', '.css', "a{font-family:'IBM Plex Mono',monospace}", 1],
    ['Latin + CJK stack', '.css', `a{font-family:'IBM Plex Mono','Noto Sans SC',monospace}`, 0],
    ['CJK-led stack', '.css', 'a{font-family:"Noto Serif SC",serif}', 0],
    ['@font-face names a face, not a stack', '.css', '@font-face{font-family:"IBM Plex Sans";font-weight:400;src:url(x.ttf)}', 0],
    ['@font-face does not hide the next rule', '.css', '@font-face{font-family:"IBM Plex Sans";src:url(x.ttf)}th{font-family:"IBM Plex Sans"}', 1],
    ['off-token hex', '.css', 'a{color:#123456}', 1],
    ['sister colour', '.css', 'a{color:#25C19B}', 1],
    ['rejected candidate', '.html', '<rect fill="#FF6A1F"/>', 1],
    ['off-token font', '.css', 'a{font-family:Inter,sans-serif}', 1],
    ['fallback first', '.css', 'a{font-family:sans-serif}', 1],
    ['docx bare hex', '.mjs', "const X='3A4E51';", 1],
    ['all-digit string in app code is a number', '.ts', 'const V = new Set(["", "10000", "100000"]);', 0],
    ['all-digit bare hex in a builder still counts', '.mjs', "const G='333333';", 1],
    ['docx font', '.mjs', "const S={ascii:'Arial'};", 1],
    ['google fonts family', '.html', '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400">', 1],
    ['entity not a colour', '.html', '&#123; and #section-1 anchor', 0],
    ['documented value in <code>', '.html', '<td><code>#FF6A1F</code> rejected</td>', 0],
    ['styled <code> still checked', '.html', '<code style="color:#123456">x</code>', 1],
    ['@theme font var off-token', '.css', '@theme inline{--font-sans:"Inter",ui-sans-serif,sans-serif}', 1],
    ['@theme font var on-token', '.css', '@theme inline{--font-sans:"IBM Plex Sans","Noto Sans SC",sans-serif}', 0],
    ['@theme font var as var()', '.css', '@theme inline{--font-sans:var(--font-plex)}', 0],
    ['next/font off-token', '.tsx', 'import { Inter, JetBrains_Mono } from "next/font/google";', 2],
    ['next/font on-token', '.tsx', 'import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";', 0],
    ['Tailwind palette class', '.tsx', '<p className="text-gray-400 border-red-500/20">', 2],
    ['token classes pass', '.tsx', '<p className="text-sub border-hairline bg-hw/10 text-ink">', 0],
    ['palette word inside a longer name', '.tsx', '<p className="my-text-gray-400x prose-red-50">', 0],
    ['py font file off-token', '.py', 'TTFont("Inter", os.path.join(D, "Inter-Regular.ttf"))', 1],
    ['py font file on-token', '.py', 'TTFont("Plex", os.path.join(D, "IBMPlexSans-Regular.ttf"))', 0],
  ];
  let bad = 0;
  for (const [name, ext, src, want] of cases) { const got = scan(src, ext).length; const ok = want === 0 ? got === 0 : got >= want; if (!ok) bad++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}: ${got} finding(s), want ${want === 0 ? 0 : `>= ${want}`}`); }
  console.log(bad ? `SELFTEST FAILED: ${bad} case(s)` : `SELFTEST OK: ${cases.length} cases`);
  process.exit(bad ? 1 : 0);
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) selftest();
const roots = [BRAND.replace(/\/$/, '')];
args.forEach((a, i) => { if (a === '--root') roots.push(args[i + 1]); });
let files = 0, findings = 0;
for (const root of roots) {
  if (!existsSync(root)) { console.error(`FAIL root not found: ${root}`); process.exit(2); }
  for (const { p, rel } of walk(root)) {
    files++;
    for (const f of scan(readFileSync(p, 'utf8'), extname(p).toLowerCase())) { findings++; console.log(`${root === roots[0] ? rel : p}:${f.line}  ${f.kind}  ${f.value}  — ${f.why}`); }
  }
}
let design = 'skipped (--no-design)';
if (!args.includes('--no-design')) {
  try { execFileSync(process.execPath, [`${BRAND}build-design.mjs`, '--check'], { stdio: 'pipe' }); design = 'current'; }
  catch (e) { design = `STALE — ${String(e.stderr || e.message).trim()}`; findings++; }
}
console.log(`\nbrand-check: ${files} files in ${roots.length} root(s) · palette ${PAL.size} colours · ${FAM.size} families · DESIGN.md ${design}`);
console.log(`not scanned: brand-check.mjs (its selftest fixtures are wrong on purpose) · records: review/ ·breeze-*-2026-07-29.html · PLAN · BRIEF · DESIGN (regions checked separately) · tokens.json · dot-dirs · binaries (.docx/.png/.pdf)`);
console.log(findings ? `FAIL ${findings} finding(s)` : 'OK no off-token colours or fonts');
process.exit(findings ? 1 : 0);
