import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { NoiseOverlay } from "@/components/common/NoiseOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA — Autonomous Neural Data Intelligence Platform",
  description:
    "Turn raw datasets into live, explorable insight at 100M ops/sec. Unified zero-copy memory substrate, Riemannian vector manifolds, and real-time autonomous reasoning.",
  keywords: [
    "AI",
    "Data Intelligence",
    "Vector Database",
    "Streaming Analytics",
    "GPU Acceleration",
    "Zero-Copy",
    "Keynote",
  ],
  authors: [{ name: "Raga Crypt", url: "https://github.com/Raga-vibe" }],
  creator: "Raga Crypt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark bg-[#030305] text-[#f4f4f6] selection:bg-[#00f59b] selection:text-black`}
    >
      <body className="min-h-screen bg-[#030305] antialiased overflow-x-hidden font-sans">
        <NoiseOverlay />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
