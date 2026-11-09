# brand/ — vendored, do not edit

The Breeze brand gate for this site. CI runs it (`.github/workflows/brand.yml`); run it locally with `npm run check:brand`.

- `brand-check.mjs` fails any colour or font that is not a Breeze token. `--selftest` proves it can fail.
- `site-class-audit.mjs` runs after `next build`: every colour class in `src/` must compile to CSS, and no
  `hover:`/`focus:` state may repeat its base class.
- `tokens.json` is a public projection of the owner file (values only, no design notes).

These files are generated from the owner repo by `sync-breeze-ci.mjs`. A change made here is overwritten on the
next sync. To change a colour or a font, change the owner and re-sync.
