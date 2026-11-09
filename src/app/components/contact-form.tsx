"use client";

import { useState, type FormEvent } from "react";

const field =
  "w-full border border-hairline rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hw/40 focus:border-hw transition-colors";
const label = "block text-sm font-medium text-ink mb-1.5";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ kind: "error", message: json.error || "Could not send. Please email hello@breezehw.com." });
        return;
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: "Could not send. Please email hello@breezehw.com." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="mt-12 max-w-lg mx-auto rounded-lg border border-hw/40 bg-hw/5 px-6 py-8 text-center" role="status">
        <p className="text-lg font-semibold text-ink">Thanks. We have your project.</p>
        <p className="mt-2 text-sm text-sub">We&apos;ll reply within 24 hours with a preliminary assessment.</p>
      </div>
    );
  }

  return (
    <form className="mt-12 max-w-lg mx-auto space-y-5" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name" className={label}>Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" className={field} placeholder="Jane Smith" />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="jane@company.com" />
      </div>
      <div>
        <label htmlFor="product" className={label}>One-line product description</label>
        <input id="product" name="product" type="text" className={field} placeholder="AI-powered wearable for real-time translation" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="volume" className={label}>Estimated volume</label>
          <select id="volume" name="volume" className={`${field} bg-white`} defaultValue="">
            <option value="">Select</option>
            <option value="100">~100 units</option>
            <option value="1000">~1,000 units</option>
            <option value="10000">~10,000 units</option>
            <option value="100000">100,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="stage" className={label}>Current stage</label>
          <select id="stage" name="stage" className={`${field} bg-white`} defaultValue="">
            <option value="">Select</option>
            <option value="idea">Idea</option>
            <option value="design">Design</option>
            <option value="prototype">Prototype</option>
            <option value="production">Production</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="aiStage" className={label}>How far have AI tools taken the hardware? (optional)</label>
        <select id="aiStage" name="aiStage" className={`${field} bg-white`} defaultValue="">
          <option value="">Select</option>
          <option value="none">Haven&apos;t used AI on the hardware</option>
          <option value="concept-renders">Concept renders</option>
          <option value="schematic">Schematic</option>
          <option value="pcb-layout">PCB layout</option>
          <option value="enclosure-cad">Enclosure CAD</option>
          <option value="firmware">Firmware</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes" className={label}>Anything else? Links to files are welcome (optional)</label>
        <textarea id="notes" name="notes" rows={3} className={field} placeholder="Specs, a repo, a KiCad project, your timeline" />
      </div>
      {/* Honeypot: hidden from people, filled by naive bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status.kind === "error" && (
        <p className="text-sm text-danger" role="alert">{status.message}</p>
      )}
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="w-full bg-hw text-ink px-6 py-3.5 rounded-lg font-semibold hover:bg-hw/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending…" : "Get in Touch"}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
