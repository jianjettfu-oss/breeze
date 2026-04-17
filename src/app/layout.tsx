import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breeze — Your Shenzhen Engineering Partner for AI Hardware",
  description:
    "From concept to production — BOM optimization, DFM, prototyping, and manufacturing for AI wearables and devices. No equity. No MOQ surprises. Just engineering.",
  openGraph: {
    title: "Breeze — AI Hardware Manufacturing Partner",
    description:
      "From concept to production — BOM optimization, DFM, prototyping, and manufacturing for AI wearables and devices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
