"use client";

import Image from "next/image";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/">
          <Image
            src="/breeze-logo.png"
            alt="Breeze"
            width={140}
            height={35}
            priority
            className="h-8 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-[#64748B]">
          <a href="#process" className="hover:text-[#1B3A5C] transition-colors">
            Process
          </a>
          <a href="#tools" className="hover:text-[#1B3A5C] transition-colors">
            Tools
          </a>
          <a href="#why" className="hover:text-[#1B3A5C] transition-colors">
            Why Breeze
          </a>
          <a
            href="#contact"
            className="bg-[#2DD4A8] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2DD4A8]/90 transition-colors"
          >
            Get in Touch
          </a>
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
            className="w-6 h-6 text-[#1B3A5C]"
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
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <a
            href="#process"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-[#64748B] hover:text-[#1B3A5C]"
          >
            Process
          </a>
          <a
            href="#tools"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-[#64748B] hover:text-[#1B3A5C]"
          >
            Tools
          </a>
          <a
            href="#why"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-[#64748B] hover:text-[#1B3A5C]"
          >
            Why Breeze
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block bg-[#2DD4A8] text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-[#2DD4A8]/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
