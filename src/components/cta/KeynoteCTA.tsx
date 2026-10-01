"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "../common/MagneticButton";
import { sound } from "@/lib/audio";
import { Terminal, Copy, Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function KeynoteCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sound.playPulse();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#00F59B", "#00F0FF", "#FFFFFF"],
      });
    } catch {
      // Fallback
    }
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("npx @aura/engine init --production");
    sound.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="keynote-cta"
      className="relative w-full py-32 px-4 md:px-8 bg-[#030305] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Cinematic Photonic Aura Core */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-t from-[#00F59B]/[0.08] via-[#00F0FF]/[0.04] to-transparent blur-[140px] rounded-full"
      />

      <div className="relative mx-auto max-w-4xl w-full text-center flex flex-col items-center">
        {/* Keynote Pill */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          General Availability 2026
        </div>

        {/* Cinematic Headline */}
        <h2 className="font-sans font-semibold text-5xl sm:text-7xl md:text-8xl tracking-[-0.045em] text-white leading-[0.94]">
          Step into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/45">
            the stream.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 font-sans text-base sm:text-xl text-[#94949e] max-w-xl leading-relaxed">
          Deploy AURA on your own bare metal, AWS, or GCP clusters. 100M events/sec in 5 minutes.
        </p>

        {/* Email or Pilot Invite Form */}
        <div className="mt-10 w-full max-w-md">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl glass-panel border border-[#00F59B]/40 text-center flex flex-col items-center gap-2 bg-[#00F59B]/[0.04]"
            >
              <ShieldCheck className="w-6 h-6 text-[#00F59B]" />
              <div className="font-sans font-medium text-white text-base">
                Access Request Priority Staged
              </div>
              <div className="font-mono text-xs text-white/50">
                Enterprise credentials dispatched to {email}.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00F59B]/60 focus:ring-1 focus:ring-[#00F59B]/60 transition-all font-mono"
              />
              <MagneticButton
                type="submit"
                variant="primary"
                size="md"
                className="whitespace-nowrap"
              >
                Request Keynote Pilot
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </form>
          )}
        </div>

        {/* Terminal Quickstart */}
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={handleCopyCmd}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-white/60 hover:text-white transition-all cursor-pointer group backdrop-blur-md"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>npx @aura/engine init --production</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#00F59B]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
