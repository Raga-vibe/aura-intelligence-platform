"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/audio";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Code2,
  Workflow,
  Compass,
  ArrowUpRight,
  Database,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  badge?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function SpotlightCard({ children, className = "", badge, title, description, icon }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -4;
    const ry = ((x - centerX) / centerX) * 4;
    setTilt({ rx, ry });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative rounded-2xl glass-panel p-6 sm:p-8 border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-300 overflow-hidden flex flex-col justify-between group ${className}`}
    >
      {/* Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 155, 0.1), transparent 80%)`,
        }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/80 group-hover:text-[#00F59B] group-hover:border-[#00F59B]/40 transition-colors">
              {icon}
            </div>
            {badge && (
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.04] text-white/40 border border-white/[0.06]">
                {badge}
              </span>
            )}
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/50 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Embedded Micro-Interaction / Visualizer */}
      <div className="mt-6 pt-4 border-t border-white/[0.06]">{children}</div>
    </div>
  );
}

export function BentoGrid() {
  const [activePrompt, setActivePrompt] = useState<number>(0);

  const samplePrompts = [
    {
      q: "Cluster 50M single-cell expression vectors by cell-cycle phase",
      ast: `EXPR_MANIFOLD.PROJECT(dim: 128k -> 3)
  .QUANTIZE(mode: 'riemannian_fp8')
  .CLUSTER_BY(target: 'G2M_CHECKPOINT')
  // Exec: 0.28ms • GPU Cores: 4,096`,
    },
    {
      q: "Detect cross-venue arbitrage anomaly between CME & NYSE",
      ast: `ORDER_FLOW.MONITOR(spread: 'SPY_ES_FUTURES')
  .ANALYZE_LATENCY(window: '50us')
  .ISOLATE_SPIKE(z_score > 4.5)
  // Exec: 0.12ms • RDMA Direct Bypass`,
    },
    {
      q: "Autonomous sensor mesh consensus across 12,000 edge vehicles",
      ast: `FLEET_MESH.KALMAN_FILTER(sensor: 'LIDAR_1550NM')
  .CROSS_VALIDATE(radar: 'UWB_ARRAY')
  .PUBLISH_DELTA(jitter_tol: '2.5mm')
  // Exec: 0.34ms • Edge Consumed`,
    },
  ];

  return (
    <section
      id="bento-features"
      className="relative w-full py-32 px-4 md:px-8 bg-[#030305] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            Core Architecture Matrix
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] text-white">
            Engineered with zero compromises.
          </h2>
          <p className="mt-4 max-w-2xl text-white/50 text-base sm:text-lg">
            Every layer of AURA has been re-architected from the silicon substrate up to replace
            fragmented big data stacks with a single unified intelligence engine.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 8 Cols - Zero Copy Memory Bus */}
          <SpotlightCard
            className="md:col-span-8"
            badge="HARDWARE DIRECT"
            title="The Unified Zero-Copy Memory Bus"
            description="Traditional architectures copy data 4 to 7 times across disk, user space, and GPU VRAM. AURA streams straight from NIC buffers directly into tensor memory registers."
            icon={<Cpu className="w-4 h-4 text-[#00F59B]" />}
          >
            <div className="rounded-xl bg-[#050508] border border-white/[0.06] p-4 font-mono text-xs text-white/70">
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-3">
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
                  <div className="text-white/40">NETWORK NIC</div>
                  <div className="text-[#00F59B] font-semibold mt-0.5">PCIe Gen 5.0</div>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <div className="text-emerald-400/60">AURA BUS</div>
                  <div className="font-semibold mt-0.5">DIRECT-TO-VRAM</div>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
                  <div className="text-white/40">GPU CORES</div>
                  <div className="text-[#00F0FF] font-semibold mt-0.5">NVLink 900 GB/s</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/[0.06]">
                <span>KERNEL CONTEXT SWITCHES: 0</span>
                <span className="text-[#00F59B]">BANDWIDTH: 142.8 GB/s SATURATED</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: 4 Cols - Sub-millisecond Latency */}
          <SpotlightCard
            className="md:col-span-4"
            badge="0.28ms p99"
            title="Deterministic Latency"
            description="Strict hardware bounds ensure p99 query latency never degrades under extreme multi-petabyte loads."
            icon={<Zap className="w-4 h-4 text-[#00F0FF]" />}
          >
            <div className="rounded-xl bg-[#050508] border border-white/[0.06] p-4 flex flex-col justify-between h-28">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">p99 JITTER:</span>
                <span className="text-[#00F0FF] font-semibold">&lt; 0.04 ms</span>
              </div>
              {/* Dynamic Sparkline bars */}
              <div className="flex items-end gap-1 h-12 pt-2">
                {[40, 42, 38, 41, 39, 44, 40, 39, 42, 40, 41, 38, 43, 40, 42].map(
                  (val, i) => (
                    <div
                      key={i}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-white/20 rounded-t hover:bg-[#00F0FF] transition-colors"
                    />
                  )
                )}
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: 4 Cols - Riemannian Vector Manifold */}
          <SpotlightCard
            className="md:col-span-4"
            badge="16:1 QUANTIZATION"
            title="Riemannian Vector Space"
            description="Continuous topological folding compresses vectors losslessly while preserving semantic distance."
            icon={<Compass className="w-4 h-4 text-[#00F59B]" />}
          >
            <div className="rounded-xl bg-[#050508] border border-white/[0.06] p-4 text-xs font-mono">
              <div className="flex justify-between text-white/40 mb-2">
                <span>INDEX SIZE:</span>
                <span className="text-white">4.2 GB / 100M</span>
              </div>
              <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden mb-2">
                <div className="bg-[#00F59B] h-full w-[94%]" />
              </div>
              <div className="flex justify-between text-[11px] text-white/40">
                <span>RECALL FIDELITY</span>
                <span className="text-[#00F59B]">99.94%</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 4: 4 Cols - Autonomous Agent Swarm */}
          <SpotlightCard
            className="md:col-span-4"
            badge="MULTI-AGENT"
            title="Autonomous Swarm"
            description="Specialized evaluation circuits communicate over lock-free ring buffers to isolate anomalies in parallel."
            icon={<Workflow className="w-4 h-4 text-[#00F59B]" />}
          >
            <div className="rounded-xl bg-[#050508] border border-white/[0.06] p-4 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-white/60">
                <span>INGEST_AGENT</span>
                <span className="text-[#00F59B]">ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>TOPOLOGY_SYNAPSE</span>
                <span className="text-[#00F59B]">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>AUTO_REMEDIATION</span>
                <span className="text-white">STANDBY</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 5: 4 Cols - Cryptographic Hardware Enclave */}
          <SpotlightCard
            className="md:col-span-4"
            badge="SOVEREIGN ENCLAVE"
            title="Zero-Trust HSM Enclave"
            description="Direct support for AMD SEV-SNP and NVIDIA Confidential Computing. Your raw datasets never leak."
            icon={<Lock className="w-4 h-4 text-white/80" />}
          >
            <div className="rounded-xl bg-[#050508] border border-white/[0.06] p-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#00F59B]" />
                <span>NVIDIA H100 CC VERIFIED</span>
              </div>
              <div className="text-[11px] text-white/40 truncate">
                ATTESTATION: 0x94F2...3C1B
              </div>
              <div className="text-[11px] text-[#00F59B] mt-1">
                HARDWARE KEYS ROTATING EVERY 60S
              </div>
            </div>
          </SpotlightCard>

          {/* Card 6: 8 Cols - Natural Language to Neural Kernel Compiler */}
          <SpotlightCard
            className="md:col-span-8"
            badge="NEURAL COMPILER"
            title="Natural Language to Vector Kernel"
            description="Type inquiries in human language or SQL. AURA compiles them instantly into vectorized CUDA execution ASTs."
            icon={<Code2 className="w-4 h-4 text-[#00F59B]" />}
          >
            <div className="space-y-3">
              {/* Prompt selection pills */}
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActivePrompt(idx);
                      sound.playHoverTick();
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono text-left transition-colors cursor-pointer ${
                      activePrompt === idx
                        ? "bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/40"
                        : "bg-white/[0.04] text-white/50 hover:text-white border border-white/[0.06]"
                    }`}
                  >
                    Query #{idx + 1}
                  </button>
                ))}
              </div>

              {/* Generated AST Code Box */}
              <div className="rounded-xl bg-[#050508] border border-white/[0.08] p-4 font-mono text-xs text-white/80 overflow-x-auto">
                <div className="text-white/40 text-[11px] mb-1">
                  QUERY: "{samplePrompts[activePrompt].q}"
                </div>
                <pre className="text-[#00F59B] mt-2 text-[12px] leading-relaxed">
                  <code>{samplePrompts[activePrompt].ast}</code>
                </pre>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
