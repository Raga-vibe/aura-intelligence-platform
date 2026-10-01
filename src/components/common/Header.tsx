"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import { MagneticButton } from "./MagneticButton";
import { Volume2, VolumeX, Terminal, Cpu } from "lucide-react";

export function Header() {
  const [isMuted, setIsMuted] = useState(true);
  const [edgeLatency, setEdgeLatency] = useState(0.38);

  useEffect(() => {
    // Subtle jitter on latency to reflect live telemetry
    const interval = setInterval(() => {
      setEdgeLatency(+(0.35 + Math.random() * 0.08).toFixed(2));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 md:px-6 py-2.5 rounded-full glass-pill border border-white/[0.09] shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-[#00F59B]/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#00F59B] shadow-[0_0_12px_#00F59B]" />
          </div>
          <span className="font-sans font-semibold tracking-tighter text-base text-white group-hover:text-white/90">
            AURA
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50 border border-white/[0.08]">
            v3.2
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] text-white/40 border-l border-white/10 pl-2">
            by Raga Crypt
          </span>
        </button>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1 font-sans text-xs tracking-tight text-white/60">
          <button
            onClick={() => scrollTo("scroll-story")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            Story
          </button>
          <button
            onClick={() => scrollTo("interactive-demo")}
            className="px-3.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
            Live Demo
          </button>
          <button
            onClick={() => scrollTo("bento-features")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo("performance")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            Specs
          </button>
        </nav>

        {/* Right Telemetry & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Edge Telemetry */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-white/50">
            <Cpu className="w-3 h-3 text-[#00F59B]" />
            <span>{edgeLatency}ms EDGE</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label={isMuted ? "Enable sound effects" : "Mute sound effects"}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Unmute audio micro-interactions" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00F59B]" />}
          </button>

          {/* Magnetic CTA */}
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => scrollTo("interactive-demo")}
            className="hidden sm:inline-flex"
          >
            <Terminal className="w-3.5 h-3.5 mr-1" />
            Launch Demo
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
