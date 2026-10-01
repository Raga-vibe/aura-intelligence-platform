"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroCanvas } from "./HeroCanvas";
import { MagneticButton } from "../common/MagneticButton";
import { Terminal, ArrowUpRight, Copy, Check, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import { sound } from "@/lib/audio";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("curl -fsSL https://get.aura.network/v3 | sh");
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToDemo = () => {
    sound.playClick();
    const demo = document.getElementById("interactive-demo");
    if (demo) {
      demo.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-4 md:px-8 overflow-hidden bg-[#030305]">
      {/* 3D WebGL Living Particle Field */}
      <HeroCanvas />

      {/* Radial specular background falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#00F59B]/[0.08] via-[#00F0FF]/[0.03] to-transparent blur-[130px] rounded-full"
      />

      {/* Hero Typography & Core Interactive Deck */}
      <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col items-center text-center mt-6 md:mt-12">
        {/* Keynote Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.09] hover:border-[#00F59B]/40 transition-colors mb-6 cursor-default group backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#00F59B] shadow-[0_0_10px_#00F59B]" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            AURA 3.0 Platform Keynote
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs text-[#00F59B] flex items-center gap-1 font-mono">
            Now Live <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-semibold tracking-[-0.045em] text-white text-5xl sm:text-7xl md:text-8xl lg:text-[108px] leading-[0.92] max-w-5xl select-none"
        >
          Intelligence at the <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/45">
            speed of light.
          </span>
        </motion.h1>

        {/* Muted Refined Body with disciplined contrast backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl px-6 py-2.5 rounded-2xl bg-[#030305]/60 backdrop-blur-md border border-white/[0.04]"
        >
          <p className="font-sans text-base sm:text-lg text-[#a1a1aa] leading-relaxed font-normal">
            A unified memory substrate that fuses petabyte-scale streaming ingest,
            sub-millisecond vector indexing, and autonomous reasoning. Turn chaotic datasets into
            live, explorable truth.
          </p>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full"
        >
          {/* Primary Magnetic CTA */}
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={scrollToDemo}
            className="group shadow-[0_0_35px_rgba(0,245,155,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>Launch Keynote Demo</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/10 text-black/70">
              Interactive
            </span>
          </MagneticButton>

          {/* Quick Terminal Copy */}
          <button
            onClick={handleCopyInstall}
            className="flex items-center gap-3 px-5 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-white/20 transition-all font-mono text-xs text-white/80 cursor-pointer group backdrop-blur-md"
            title="Click to copy install command"
          >
            <Terminal className="w-4 h-4 text-[#00F59B]" />
            <span className="text-white/40">$</span>
            <span className="text-white/90">curl -fsSL aura.sh | sh</span>
            <span className="ml-2 flex items-center justify-center w-5 h-5 rounded bg-white/[0.06] text-white/50 group-hover:text-white transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-[#00F59B]" /> : <Copy className="w-3.5 h-3.5" />}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Hardware Telemetry Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-6xl w-full mt-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] rounded-2xl overflow-hidden p-px shadow-2xl backdrop-blur-xl">
          <div className="bg-[#07070a]/92 p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
              <span>Streaming Ingest</span>
              <Activity className="w-3.5 h-3.5 text-[#00F59B]" />
            </div>
            <div className="font-sans font-medium text-2xl sm:text-3xl text-white tracking-tight">
              142.8 <span className="text-sm font-mono text-[#00F59B]">GB/s</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-mono">Zero-copy kernel bypass</div>
          </div>

          <div className="bg-[#07070a]/92 p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
              <span>Query Latency</span>
              <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
            <div className="font-sans font-medium text-2xl sm:text-3xl text-white tracking-tight">
              0.28 <span className="text-sm font-mono text-[#00F0FF]">ms</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-mono">H100 NVLink cluster mesh</div>
          </div>

          <div className="bg-[#07070a]/92 p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
              <span>Vector Compression</span>
              <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
            </div>
            <div className="font-sans font-medium text-2xl sm:text-3xl text-white tracking-tight">
              16.4<span className="text-sm font-mono text-white/60">×</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-mono">Lossless Riemannian quantization</div>
          </div>

          <div className="bg-[#07070a]/92 p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
              <span>Anomaly Precision</span>
              <div className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
            </div>
            <div className="font-sans font-medium text-2xl sm:text-3xl text-white tracking-tight">
              99.98<span className="text-sm font-mono text-[#00F59B]">%</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1 font-mono">Cross-modal zero false pos</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
