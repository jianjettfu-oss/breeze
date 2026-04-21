# Breeze Launch Drafts — 2026-04-22 Wed

> Post manually at scheduled times below. Email reminders will fire at each slot.

---

## Slot 1 — HN @ Wed 00:00 CST (Tue 09:00 PT)

**Submit:** https://news.ycombinator.com/submitlink

**Title**:
```
Show HN: Open data for AI-hardware manufacturing (Shenzhen pricing, real numbers)
```

**URL**:
```
https://breezehw.com
```

**Body**:
```
I've spent the last 10+ years doing consumer hardware out of Shenzhen (AirPop — respiratory wearables, global distribution). Most "what will my first hardware run cost?" conversations with founders go the same way: they've got a product idea, maybe a prototype, and no real number for BOM, NRE, or certification.

I built Breeze to replace those conversations with four calculators anyone can run on their own — no form gate, no sales funnel, no login:

- BOM Cost Estimator — real 1K-volume component prices for ESP32-S3, Rockchip (RV1103 / RK3562 / RK3588S), MediaTek Genio, plus typical sensor / power / memory stacks.
- NRE Simulator — non-recurring engineering estimate for your first run: molds, certifications, engineering samples, factory setup.
- DFM Checklist — thermal, antenna, layout, cert-blocker failures we see most often on first products.
- Cert Navigator — FCC / CE / UKCA / RCM / CCC — what applies, typical cost, typical timeline.

Each tool emails a PDF summary if you want one.

The underlying data (component tables, DFM rules, cert matrices) is in an open-source toolkit: github.com/jianjettfu-oss/ai-hardware-toolkit — MIT. We'd rather you audit our numbers than take our word for it.

Team: Arting (embedded / deal flow), Sky (factory relationships, cost negotiation, production ramp), and me. We sell engineering services (NRE + per-unit) — the tools are our "how accurate are these guys actually" sample before any conversation.

Prices shift. Cert requirements change. If you spot something off, open an issue with a citation and we'll update. Roast it.
```

---

## Slot 2 — r/embedded @ Wed 00:15 CST

**Submit:** https://www.reddit.com/r/embedded/submit

**Title**:
```
Free BOM/NRE/DFM/cert tools for first hardware runs (open-source data)
```

**Body**:
```
I've been doing consumer hardware manufacturing in Shenzhen for ~10 years and kept getting the same "what will this cost?" question from founders with half-baked specs. So I put together 4 free calculators:

- BOM cost estimator — 1K-volume pricing for ESP32-S3, Rockchip RV1103/RK3562/RK3588S, MTK Genio, plus common sensors/power/memory
- NRE simulator — molds, samples, factory setup
- DFM checklist — the common first-product failure modes (thermal, antenna, layout, cert blockers)
- Cert navigator — FCC/CE/UKCA/RCM/CCC: what applies, typical cost, typical timeline

No login, no sales gate: breezehw.com

Data is in an open toolkit (MIT): github.com/jianjettfu-oss/ai-hardware-toolkit

Disclosure: I run a hardware engineering services shop (Breeze) — the tools are the "check our numbers before you talk to us" surface. Free regardless of whether we ever work together.

Feedback I'm looking for: if you've shipped Rockchip or Genio products in 2025-2026, do the pricing ranges and DFM patterns match what you've seen? PRs and issues on the toolkit repo welcome.
```

---

## Slot 3 — r/electronics @ Wed 01:00 CST

**Submit:** https://www.reddit.com/r/electronics/submit

**Title**:
```
Free BOM/cert/NRE calculators for first hardware runs (MIT-licensed data)
```

**Body**:
```
After years of doing hardware manufacturing in Shenzhen and answering the same "what will this cost?" questions, I put together 4 calculators:

- BOM cost estimator — volume-scaled pricing for common AI/IoT SoCs
- NRE simulator — molds, certs, factory setup
- DFM checklist — thermal/antenna/layout/cert-blocker failure modes
- Cert navigator — FCC/CE/UKCA/RCM/CCC cost + timeline

breezehw.com — no login required. Email only if you want the PDF summary.

The data (component tables, DFM rules, cert matrices) is open-source: github.com/jianjettfu-oss/ai-hardware-toolkit (MIT)

Hoping for feedback on whether the cost ranges and DFM rules match what folks on the engineering side are seeing in 2025-2026. If something's off, the repo is open — PR or issue welcomed.

Disclosure: I run a hardware engineering services shop. Tools are free regardless.
```

---

## Slot 4 — r/AI_Agents @ Wed 02:00 CST

**Submit:** https://www.reddit.com/r/AI_Agents/submit

**Title**:
```
4 free tools for AI agent builders thinking about shipping physical devices
```

**Body**:
```
Seeing a lot of software agents here. At some point the question shows up: "what if this lived on a dedicated device instead of a phone app?"

Having spent 10+ years on the hardware side in Shenzhen, the jump from "software product" to "physical product" is where most projects burn money. The usual surprises: NRE bigger than expected, certs blocking launch, component BOM drifting 2-3x above what the team guessed.

I built 4 free calculators to take the guesswork out:

- BOM cost estimator — real 1K-volume pricing for ESP32-S3, Rockchip AI SoCs (RV1103/RK3562/RK3588S), MTK Genio
- NRE simulator — the non-recurring stuff (molds, certs, samples, factory setup)
- DFM checklist — common first-product failures
- Cert navigator — US/EU/UK regulations: what applies, typical cost, typical timeline

breezehw.com — no login, no funnel.

Plug the numbers into a financial model before you commit. The data is open source (MIT): github.com/jianjettfu-oss/ai-hardware-toolkit

Disclosure: I run a hardware engineering services shop (Breeze). Tools free forever either way.
```

---

## Post-launch engagement discipline

- **HN**: Reply to top 3 comments within 30 min. First-hour engagement = front-page lift. Stay at keyboard Wed 00:00–02:00 CST.
- **Reddit**: Reply to any comment within 15 min for first hour. Mods flag "post & ghost" behavior.
- Don't cross-link Reddit ↔ HN in comments (looks coordinated).
- If HN drops off page 1 within 2h, don't panic — organic trickle continues for 24h.
