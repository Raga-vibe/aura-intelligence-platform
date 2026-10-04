import React from "react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Sparkles, ArrowLeft, Cpu, ShieldCheck, Zap, Layers, Terminal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AURA Intelligence Platform",
  description:
    "Architecting the future of autonomous neural data intelligence. Founded and built by Raga Crypt.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#030305] text-[#f4f4f6] selection:bg-[#00f59b] selection:text-black">
      <Header />

      <div className="relative mx-auto max-w-4xl px-4 md:px-8 pt-36 pb-24">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-[#00F59B] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO CONSOLE</span>
        </Link>

        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Platform Vision & Origin
        </div>

        {/* Title */}
        <h1 className="font-sans font-semibold text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-white leading-[1.0]">
          Architecting the zero-copy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            intelligence substrate.
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-[#94949e] leading-relaxed">
          AURA was founded on a singular premise: the modern enterprise data stack is fundamentally
          broken. Shuttling petabytes of information between Kafka ingestion queues, batch vector
          databases, and disconnected LLM prompt loops creates unacceptable latency and cost.
        </p>

        {/* Core Pillars */}
        <div className="mt-16 space-y-8">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Foundational Engineering Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between">
              <div>
                <Cpu className="w-5 h-5 text-[#00F59B] mb-3" />
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Direct-to-VRAM
                </h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  Bypassing operating system kernels to stream raw Apache Arrow buffers straight from
                  400GbE NICs into GPU tensor cores.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#00F59B] mt-4 pt-4 border-t border-white/[0.06]">
                ZERO-COPY ARCHITECTURE
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between">
              <div>
                <Layers className="w-5 h-5 text-[#00F0FF] mb-3" />
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Riemannian Topology
                </h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  Compressing 128,000-dimensional vectors losslessly by 16:1, preserving semantic
                  geodesic distance with sub-millisecond p99 traversals.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#00F0FF] mt-4 pt-4 border-t border-white/[0.06]">
                16:1 QUANTIZATION
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between">
              <div>
                <ShieldCheck className="w-5 h-5 text-white/80 mb-3" />
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Deterministic Bounds
                </h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  Replacing speculative LLM hallucination with formal mathematical evaluation circuits
                  and verifiable hardware enclave proofs.
                </p>
              </div>
              <div className="font-mono text-[10px] text-white/60 mt-4 pt-4 border-t border-white/[0.06]">
                FORMAL PROOF ENGINE
              </div>
            </div>
          </div>
        </div>

        {/* Creator & Leadership Section */}
        <div className="mt-20 p-8 rounded-2xl glass-panel border border-white/[0.1] bg-[#07070b]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="font-mono text-xs text-[#00F59B] uppercase tracking-wider mb-1">
                ENGINEERING LEADERSHIP
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                Raga Crypt
              </h3>
              <p className="text-xs text-white/50 font-mono mt-1">
                Principal Architect & Creative Technologist
              </p>
            </div>
            <a
              href="https://github.com/Raga-vibe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] font-mono text-xs text-white transition-all self-start sm:self-center"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00F59B]" />
              <span>github.com/Raga-vibe</span>
            </a>
          </div>

          <p className="mt-6 text-sm text-white/60 leading-relaxed font-sans">
            AURA is architected with a relentless commitment to extreme computational efficiency,
            hardware-level performance, and cinematic interface design. We reject generic SaaS
            abstractions in favor of clean mathematical discipline, tactile precision, and zero
            unnecessary dependencies.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
