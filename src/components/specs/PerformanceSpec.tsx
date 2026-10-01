"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/audio";
import { Zap, Award } from "lucide-react";

interface Benchmark {
  name: string;
  auraScore: number;
  competitors: { name: string; score: number; isAura?: boolean }[];
  unit: string;
  direction: "higher" | "lower";
  summary: string;
}

const BENCHMARKS: Benchmark[] = [
  {
    name: "Continuous Ingestion Throughput",
    auraScore: 142.8,
    unit: "GB/s",
    direction: "higher",
    summary: "AURA saturates direct PCIe 5.0 NIC channels, achieving 4.4x higher sustained ingest than ClickHouse and 17x vs Snowflake.",
    competitors: [
      { name: "AURA (Direct VRAM)", score: 142.8, isAura: true },
      { name: "ClickHouse Cluster", score: 32.4 },
      { name: "Snowflake (Snowpipe)", score: 8.2 },
      { name: "Google BigQuery", score: 6.5 },
    ],
  },
  {
    name: "Vector Nearest Neighbor Latency (p99)",
    auraScore: 0.28,
    unit: "ms",
    direction: "lower",
    summary: "Riemannian manifold index traverses 100M vectors in sub-millisecond time. Standard IVFFlat and HNSW lag by up to two orders of magnitude.",
    competitors: [
      { name: "AURA (Manifold)", score: 0.28, isAura: true },
      { name: "HNSW Dedicated", score: 5.4 },
      { name: "Pinecone / Milvus", score: 18.2 },
      { name: "Pgvector (PostgreSQL)", score: 44.0 },
    ],
  },
  {
    name: "Compute Cost per Billion Vector Ops",
    auraScore: 1.84,
    unit: "$/Billion",
    direction: "lower",
    summary: "By replacing 60-node distributed CPU clusters with a compact 4-GPU H100 enclave, energy and licensing TCO drops by 93%.",
    competitors: [
      { name: "AURA Enclave", score: 1.84, isAura: true },
      { name: "Elasticsearch / OpenSearch", score: 14.2 },
      { name: "Snowflake Enterprise", score: 27.6 },
      { name: "Databricks Photon", score: 32.8 },
    ],
  },
];

export function PerformanceSpec() {
  const [selectedBenchmarkIdx, setSelectedBenchmarkIdx] = useState<number>(0);
  const benchmark = BENCHMARKS[selectedBenchmarkIdx];

  const handleTabChange = (idx: number) => {
    setSelectedBenchmarkIdx(idx);
    sound.playClick();
  };

  const maxScore = Math.max(...benchmark.competitors.map((c) => c.score));

  return (
    <section
      id="performance"
      className="relative w-full py-28 px-4 md:px-8 bg-[#030305] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background NVIDIA-style green photonic wash */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-[#00F59B]/[0.035] blur-[180px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/20 mb-3">
            <Zap className="w-3.5 h-3.5" />
            Hardware-Validated Benchmarks
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] text-white">
            Raw, unadulterated power.
          </h2>
          <p className="mt-3 max-w-2xl text-white/50 text-base sm:text-lg">
            Tested on identical standard hardware setups (NVIDIA H100 80GB SXM5, PCIe Gen 5.0, 400GbE RoCE).
            Validated across 100 Billion events.
          </p>
        </div>

        {/* Big Keynote Spec Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between">
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
              Peak Sustained Throughput
            </div>
            <div className="font-sans text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.05em] text-white">
              100<span className="text-[#00F59B]">M+</span>
            </div>
            <div className="font-mono text-xs text-white/50 mt-4 pt-4 border-t border-white/[0.08]">
              Events / second / 4U Server Node
            </div>
          </div>

          <div className="p-8 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between">
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
              Deterministic Query Latency
            </div>
            <div className="font-sans text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.05em] text-white">
              0.28<span className="text-[#00F0FF] text-4xl sm:text-5xl">ms</span>
            </div>
            <div className="font-mono text-xs text-white/50 mt-4 pt-4 border-t border-white/[0.08]">
              p99 vector search across 100M entities
            </div>
          </div>

          <div className="p-8 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between">
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
              TCO Infrastructure Reduction
            </div>
            <div className="font-sans text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.05em] text-white">
              14.8<span className="text-white/40">×</span>
            </div>
            <div className="font-mono text-xs text-white/50 mt-4 pt-4 border-t border-white/[0.08]">
              Less compute spend than Snowflake
            </div>
          </div>
        </div>

        {/* Benchmark Comparisons Panel */}
        <div className="rounded-2xl glass-panel border border-white/[0.09] p-6 sm:p-8 shadow-2xl bg-[#07070b]">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/[0.08] mb-6">
            {BENCHMARKS.map((b, idx) => (
              <button
                key={idx}
                onClick={() => handleTabChange(idx)}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  selectedBenchmarkIdx === idx
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          {/* Benchmark Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Summary */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#00F59B] uppercase tracking-wider mb-2">
                  BENCHMARK HIGHLIGHT
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {benchmark.name}
                </h3>
                <p className="text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
                  {benchmark.summary}
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-xs text-white/50">
                <div className="flex items-center gap-2 text-white">
                  <Award className="w-4 h-4 text-[#00F59B]" />
                  <span>INDEPENDENT MLPERF AUDIT READY</span>
                </div>
                <div className="mt-1 text-[11px] text-white/40">
                  Standardized on 1 Billion 768-dim embeddings dataset.
                </div>
              </div>
            </div>

            {/* Right: Comparative Horizontal Bars */}
            <div className="lg:col-span-7 space-y-4">
              {benchmark.competitors.map((comp, idx) => {
                const isAura = comp.isAura;
                const widthPct =
                  benchmark.direction === "higher"
                    ? (comp.score / maxScore) * 100
                    : Math.max(12, (1 - comp.score / (maxScore * 1.1)) * 100);

                return (
                  <div key={idx} className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-white/80">
                      <span className={isAura ? "text-[#00F59B] font-semibold" : "text-white/60"}>
                        {comp.name}
                      </span>
                      <span className={isAura ? "text-white font-bold" : "text-white/40"}>
                        {comp.score} {benchmark.unit}
                      </span>
                    </div>

                    <div className="w-full bg-white/[0.05] rounded-full h-3 overflow-hidden p-0.5">
                      <motion.div
                        key={`${selectedBenchmarkIdx}-${idx}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPct}%` }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${
                          isAura
                            ? "bg-gradient-to-r from-[#00F59B] to-[#00F0FF] shadow-[0_0_15px_rgba(0,245,155,0.5)]"
                            : "bg-white/20"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
