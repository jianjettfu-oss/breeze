# Breeze

> Your Shenzhen engineering partner for AI hardware. Concept → production.

This repo is the source for [**breezehw.com**](https://breezehw.com) — the Breeze website plus four interactive tools that help AI-hardware founders pressure-test cost, compliance, and manufacturability before they commit a dollar.

## What's in here

The site is four calculators and a few content pages, not a product install target. Source is open so you can see how the numbers are computed and whether we're bluffing.

### Interactive tools (`/tools`)
| Tool | What it does |
|------|--------------|
| **BOM Cost Estimator** | Real component prices at 1K-volume for ESP32-S3, Rockchip (RV1103 / RK3562 / RK3588S), MediaTek Genio, and typical sensor/power/memory stacks. |
| **NRE Simulator** | Non-recurring engineering cost estimate for your first production run — molds, certifications, engineering samples, factory setup. |
| **DFM Checklist** | Design-for-manufacturing review surfacing the common first-product failures (thermal, antenna, layout, certification blockers). |
| **Cert Navigator** | FCC / CE / UKCA / RCM / CCC — what applies, typical cost, typical timeline. |

Each tool emails a PDF report when you submit an email. No login, no funnel.

### Companion resources
- **Open toolkit** (data, checklists, frameworks): [`jianjettfu-oss/ai-hardware-toolkit`](https://github.com/jianjettfu-oss/ai-hardware-toolkit)
- **Custom GPT** (conversational advisor built from the same data): *AI Hardware Manufacturing Advisor* on the OpenAI GPT Store
- **Outreach kit** (PDF, A4, 14pp): [`public/breeze-outreach-kit.pdf`](./public/breeze-outreach-kit.pdf)
- **Deck** (16:9, 14pp): [`public/breeze-deck.pdf`](./public/breeze-deck.pdf)

## Who we are

- **Jett Fu** — 10+ years of consumer hardware in Shenzhen. Founder of AirPop (respiratory wearables, global distribution).
- **Arting** — incubator and outbound. Embedded AI + deal flow.
- **Sky** — engineering delivery. Factory relationships, cost negotiation, production ramp.

We sell engineering services (NRE + per-unit). The tools and toolkit are open so you can evaluate us on the actual numbers before we ever talk.

## Stack

- **Next.js 15** / React 19 / TypeScript
- Tailwind CSS 4
- Resend (transactional email for tool reports)
- Vercel (hosting)

Deliberately boring. The interesting bits are the pricing data and the checklists, not the framework.

## Local development

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY if you want to test email capture
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Issues and contributions

Prices shift. Certification requirements change. If you spot something wrong or out of date, open an issue with a citation and we'll update it. We care more about the data being right than about keeping the façade up.

Contact: hello@breezehw.com · [breezehw.com](https://breezehw.com)

## License

Site code: MIT.
