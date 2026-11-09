"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-hairline">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/brand/lockup-a-hw-en-light.svg"
            alt="Breeze"
            width={165}
            height={32}
            unoptimized
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-sub">
          <Link href="/#process" className="hover:text-ink transition-colors">
            Process
          </Link>
          <Link href="/tools" className="hover:text-ink transition-colors">
            Tools
          </Link>
          <Link href="/#why" className="hover:text-ink transition-colors">
            Why Breeze
          </Link>
          <Link href="/faq" className="hover:text-ink transition-colors">
            FAQ
          </Link>
          <Link
            href="/#contact"
            className="bg-hw text-ink px-4 py-2 rounded-lg text-sm font-semibold hover:bg-hw/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-6 h-6 text-ink"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-hairline bg-white px-6 py-4 space-y-3">
          <Link
            href="/#process"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-sub hover:text-ink"
          >
            Process
          </Link>
          <Link
            href="/tools"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-sub hover:text-ink"
          >
            Tools
          </Link>
          <Link
            href="/#why"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-sub hover:text-ink"
          >
            Why Breeze
          </Link>
          <Link
            href="/faq"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-sub hover:text-ink"
          >
            FAQ
          </Link>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="block bg-hw text-ink px-4 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-hw/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      )}
    </nav>
  );
}
