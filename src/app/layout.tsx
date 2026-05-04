import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteStructuredData } from "./structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://breezehw.com"),
  title: "Breeze — Your Shenzhen Engineering Partner for AI Hardware",
  description:
    "From concept to production — BOM optimization, DFM, prototyping, and manufacturing for AI wearables and devices. No equity. No MOQ surprises. Just engineering.",
  openGraph: {
    title: "Breeze — Your Shenzhen Engineering Partner for AI Hardware",
    description:
      "Four free tools to pressure-test BOM, NRE, DFM, and certification before you commit a dollar. Open-source data, real Shenzhen pricing.",
    url: "https://breezehw.com",
    siteName: "Breeze",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breeze — Your Shenzhen Engineering Partner for AI Hardware",
    description:
      "Four free tools to pressure-test BOM, NRE, DFM, and certification before you commit a dollar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Ahrefs Web Analytics — pasted from project settings 2026-05-04 */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="L0efokUpVU4/G69KP8gXSw"
          async
        />
      </head>
      <body className="antialiased">
        <SiteStructuredData />
        {children}
      </body>
    </html>
  );
}
