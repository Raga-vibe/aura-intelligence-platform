import React from "react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Scale, ArrowLeft, ShieldAlert, Zap, Cpu, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AURA Intelligence Platform",
  description:
    "Enterprise master service terms, acceptable use policies, and SLA commitments for the AURA platform.",
};

export default function TermsPage() {
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
          <Scale className="w-3.5 h-3.5" />
          Master Service Agreement
        </div>

        <h1 className="font-sans font-semibold text-4xl sm:text-6xl tracking-[-0.04em] text-white leading-[1.05]">
          Terms of Service & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            Enterprise Operating Conditions.
          </span>
        </h1>

        <p className="mt-4 text-xs font-mono text-white/40">
          LAST MODIFIED: OCTOBER 2026 • KEYNOTE & COMMERCIAL GA EDITION
        </p>

        <div className="mt-12 space-y-12 text-sm sm:text-base text-white/70 leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <FileText className="w-5 h-5 text-[#00F59B]" />
              <span>1. Agreement & Platform Scope</span>
            </div>
            <p>
              By accessing, deploying, or subscribing to the AURA Autonomous Neural Data Intelligence
              Platform (including our zero-copy streaming bus, Riemannian manifold vector indexer,
              and interactive keynote console), you agree to be bound by these Enterprise Master
              Service Terms. If you are entering into this agreement on behalf of an enterprise or
              institution, you represent that you possess legal authority to bind such entity.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <Cpu className="w-5 h-5 text-[#00F0FF]" />
              <span>2. Intellectual Property & Custom CUDA Kernels</span>
            </div>
            <p>
              AURA, its proprietary direct-to-VRAM memory management algorithms, non-Euclidean
              manifold projection code, and associated developer interfaces are the exclusive
              intellectual property of AURA Technologies Inc. and architect Raga Crypt. Customers
              retain 100% unencumbered ownership of all input datasets, custom schema definitions,
              and downstream derived inferences.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <Zap className="w-5 h-5 text-[#00F59B]" />
              <span>3. Service Level Agreement (99.999% Availability)</span>
            </div>
            <p>
              Production enterprise clusters are governed by a strict 99.999% uptime commitment.
              AURA guarantees deterministic sub-millisecond p99 execution bounds for real-time
              streaming anomaly detection. In the event of hardware failover, AURA's autonomous
              RDMA bypass guarantees seamless migration across redundant edge nodes with zero packet
              loss.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl glass-panel border border-white/[0.08]">
            <div className="flex items-center gap-3 text-white font-semibold text-lg mb-3">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>4. Acceptable Use & Security Bounds</span>
            </div>
            <p>
              You agree not to reverse engineer, decompile, or attempt to extract cryptographic private
              keys from the hardware confidential computing enclaves. You may not use AURA to conduct
              unauthorized denial-of-service simulations or inject malicious adversarial vector
              poisoning attacks across federated cluster participants.
            </p>
          </section>

          {/* Contact */}
          <div className="pt-6 border-t border-white/[0.08] text-xs font-mono text-white/50">
            Questions regarding licensing, commercial pilot SLAs, or legal terms:{" "}
            <span className="text-[#00F59B]">legal@aura.network</span> • Architected by Raga Crypt.
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
