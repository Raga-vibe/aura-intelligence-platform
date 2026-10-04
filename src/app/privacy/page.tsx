import React from "react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, Server, FileCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AURA Intelligence Platform",
  description:
    "Enterprise data sovereign enclave policy and cryptographic privacy guarantees for the AURA platform.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#030305] text-[#f4f4f6] selection:bg-[#00f59b] selection:text-black">
      <Header />

      <div className="relative mx-auto max-w-4xl px-4 md:px-8 pt-36 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-[#00F59B] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO CONSOLE</span>
        </Link>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/20 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          Data Sovereignty & Cryptographic Privacy
        </div>

        <h1 className="font-sans font-semibold text-4xl sm:text-6xl tracking-[-0.04em] text-white leading-[1.05]">
          Privacy Policy & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            Sovereign Enclave Commitments.
          </span>
        </h1>

        <p className="mt-4 text-xs font-mono text-white/40">
          EFFECTIVE DATE: OCTOBER 2026 • REVISION 3.2 • ZERO-COPY SPECIFICATION
        </p>

        <div className="mt-12 space-y-12 text-sm sm:text-base text-white/70 leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <EyeOff className="w-5 h-5 text-[#00F59B]" />
              <span>1. Zero-Data Retention Architecture</span>
            </div>
            <p>
              AURA operates as a pure zero-copy memory substrate. Streaming inputs (Kafka, Apache
              Arrow IPC, WebSocket feeds) are ingested directly into volatile GPU VRAM registers for
              real-time tensor folding and anomaly detection. Raw payload bytes are{" "}
              <strong className="text-white">never written to non-volatile disk</strong>, never cached
              in intermediate database staging areas, and never retained past the duration of the
              active evaluation window.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <Lock className="w-5 h-5 text-[#00F0FF]" />
              <span>2. Hardware Confidential Computing (AMD SEV-SNP & NVIDIA CC)</span>
            </div>
            <p>
              All customer computation executes within cryptographically isolated hardware enclaves.
              Memory encryption keys are held exclusively within hardware security modules (HSM) and
              rotate every 60 seconds. Neither AURA system operators, cloud service providers, nor
              third-party processes possess the mathematical ability to inspect unencrypted memory
              tensors during runtime.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <Server className="w-5 h-5 text-white/80" />
              <span>3. Telemetry & Anonymous Cluster Metrics</span>
            </div>
            <p>
              We collect strictly non-identifiable system health metrics (such as aggregate edge
              latency, PCIe bandwidth saturation, and GPU core temperatures) to maintain operational
              resilience across our 32 global edge nodes. No customer query payloads, vector values,
              or proprietary dataset signatures are transmitted to telemetry collectors.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <FileCheck className="w-5 h-5 text-[#00F59B]" />
              <span>4. Regulatory Compliance & Enterprise Rights</span>
            </div>
            <p>
              AURA adheres strictly to the General Data Protection Regulation (GDPR), the California
              Consumer Privacy Act (CCPA), and maintains SOC 2 Type II audit readiness. Enterprise
              administrators retain full sovereign custody over regional data locality boundaries (e.g.
              restricting execution entirely to SFO, FRA, or LHR datacenters).
            </p>
          </section>

          {/* Contact */}
          <div className="pt-6 border-t border-white/[0.08] text-xs font-mono text-white/50">
            For cryptographic audit verification inquiries, contact:{" "}
            <span className="text-[#00F59B]">security@aura.network</span> • Architected by Raga Crypt.
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
