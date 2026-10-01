"use client";

import React from "react";
import { sound } from "@/lib/audio";
import { Cpu, Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  const handleLinkHover = () => {
    sound.playHoverTick();
  };

  const handleLinkClick = () => {
    sound.playClick();
  };

  return (
    <footer className="w-full bg-[#030305] border-t border-white/[0.08] text-white/50 font-sans text-xs pt-16 pb-12 px-4 md:px-8">
      <div className="mx-auto max-w-6xl w-full">
        {/* Top Status & Edge Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-12 border-b border-white/[0.06] gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#00F59B] shadow-[0_0_8px_#00F59B]" />
            <span className="font-mono text-xs text-white/80">
              ALL 32 GLOBAL CLUSTER EDGES OPERATIONAL
            </span>
            <span className="text-white/20">•</span>
            <span className="font-mono text-xs text-[#00F59B]">0.38ms AVG LATENCY</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-white/40">
            <span>SFO-1</span>
            <span>•</span>
            <span>LHR-2</span>
            <span>•</span>
            <span>HND-1</span>
            <span>•</span>
            <span>FRA-4</span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F59B]" />
              <span className="font-sans font-semibold tracking-tight text-white text-base">
                AURA
              </span>
            </div>
            <p className="text-white/40 max-w-xs leading-relaxed text-xs">
              Autonomous neural data intelligence. Turning petabyte-scale raw streams into live,
              explorable truth with zero-copy hardware acceleration.
            </p>
            <div className="font-mono text-[11px] text-white/30">
              BUILD: v3.2.4-RELEASE-PROD (CUDA 12.8 / ARROW IPC)
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/70">
              Platform
            </div>
            <ul className="space-y-2 text-white/50">
              <li>
                <a
                  href="#scroll-story"
                  onMouseEnter={handleLinkHover}
                  onClick={handleLinkClick}
                  className="hover:text-white transition-colors"
                >
                  Architecture Story
                </a>
              </li>
              <li>
                <a
                  href="#interactive-demo"
                  onMouseEnter={handleLinkHover}
                  onClick={handleLinkClick}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Live Demo
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#00F59B]/20 text-[#00F59B]">
                    LIVE
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#bento-features"
                  onMouseEnter={handleLinkHover}
                  onClick={handleLinkClick}
                  className="hover:text-white transition-colors"
                >
                  Core Matrix
                </a>
              </li>
              <li>
                <a
                  href="#performance"
                  onMouseEnter={handleLinkHover}
                  onClick={handleLinkClick}
                  className="hover:text-white transition-colors"
                >
                  Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/70">
              Developers
            </div>
            <ul className="space-y-2 text-white/50">
              <li>
                <a
                  href="#"
                  onMouseEnter={handleLinkHover}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Rust / CUDA SDK <ArrowUpRight className="w-3 h-3 text-white/30" />
                </a>
              </li>
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  Apache Arrow IPC
                </a>
              </li>
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  Python / PyTorch API
                </a>
              </li>
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  CLI Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/70">
              Security & Legal
            </div>
            <ul className="space-y-2 text-white/50">
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  SOC 2 Type II
                </a>
              </li>
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  NVIDIA CC Enclave
                </a>
              </li>
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" onMouseEnter={handleLinkHover} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/30 gap-4">
          <div>
            © 2026 AURA TECHNOLOGIES INC. ALL RIGHTS RESERVED. DESIGNED FOR EXPONENTIALLY LARGE WORLDS.
          </div>
          <div className="flex items-center gap-3">
            <span>KEYNOTE EDITION</span>
            <span>•</span>
            <span className="text-[#00F59B]">SYSTEM INTEGRITY: 100%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
