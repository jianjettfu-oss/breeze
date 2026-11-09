// Two checks over a Tailwind v4 site after `next build`:
// 1. every colour-utility class written in src/ resolves to a selector in the compiled CSS (an unknown class
//    — a typo, a removed token, two classes glued together — generates no CSS and fails silently);
// 2. no state variant repeats its base (`bg-x hover:bg-x` is a hover that changes nothing).
// Usage: node class-audit.mjs <site-root>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = process.argv[2];
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const css = walk(join(root, '.next/static')).filter(f => f.endsWith('.css')).map(f => readFileSync(f, 'utf8')).join('\n');
const esc = c => c.replace(/[:/.[\]#%(),]/g, m => '\\' + m);
const COLOUR = /^(?:[a-z-]+:)*(?:bg|text|border(?:-[trblxy])?|ring|placeholder|decoration|divide|from|to|via|fill|stroke|outline|accent|caret|shadow)-([a-z][a-z-]*)(?:\/\d+)?$/;
const NONCOLOUR = /^(xs|sm|base|lg|xl|\dxl|left|right|center|justify|wrap|nowrap|balance|ellipsis|clip|none|solid|dashed|dotted|double|inset|offset|opacity|transparent|current|inherit|clip-text|fixed|local|scroll|cover|contain|repeat|no-repeat|gradient-to-[a-z]+|linear-to-[a-z]+|auto|t|b|l|r|x|y|0|2|4|8|collapse|separate|black|white)$/;
let unknown = 0, same = 0;
for (const f of walk(join(root, 'src')).filter(f => /\.(tsx|ts|jsx|js)$/.test(f))) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/["'`]([^"'`\n]*)["'`]/g)) {
    const classes = m[1].split(/\s+/).filter(Boolean);
    if (!classes.some(c => COLOUR.test(c))) continue;
    const line = text.slice(0, m.index).split('\n').length;
    for (const c of classes) {
      const k = COLOUR.exec(c);
      if (!k || NONCOLOUR.test(k[1])) continue;
      if (!css.includes('.' + esc(c))) { unknown++; console.log(`UNKNOWN  ${f.slice(root.length + 1)}:${line}  ${c}`); }
    }
    for (const c of classes) {
      const v = /^(hover|focus|active|group-hover):(.+)$/.exec(c);
      if (v && classes.includes(v[2])) { same++; console.log(`NO-OP    ${f.slice(root.length + 1)}:${line}  ${c}`); }
    }
  }
}
console.log(`unknown=${unknown} no-op=${same}`);
process.exit(unknown || same ? 1 : 0);
