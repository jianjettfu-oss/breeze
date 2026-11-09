"use client";

import { useState } from "react";

interface EmailCaptureProps {
  tool: string;
  buildData: () => Record<string, unknown>;
}

export default function EmailCapture({ tool, buildData }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, email, data: buildData() }),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(result.error || "Failed to send. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-hw/10 border border-hw/30 rounded-lg p-4 text-center">
        <p className="text-ink font-semibold text-sm">Report sent!</p>
        <p className="text-sub text-xs mt-1">
          Check your inbox at {email}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
          className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-sub rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-hw focus:ring-1 focus:ring-hw transition-colors"
        />
        <button
          type="submit"
          disabled={status === "sending" || !email}
          className="bg-hw text-ink px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-hw/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "sending" ? "Sending..." : "Send Report"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-danger text-xs">{errorMsg}</p>
      )}
    </form>
  );
}
