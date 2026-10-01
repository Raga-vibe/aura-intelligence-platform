"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/audio";
import { ShieldCheck, Activity, Cpu, ArrowRight } from "lucide-react";

interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string; change: string }[];
  codeSnippet: string[];
  badge: string;
}

const STEPS: PipelineStep[] = [
  {
    id: "ingest",
    stepNumber: "01",
    category: "Ingestion Core",
    title: "Zero-Copy Ingestion Bus",
    subtitle: "100 Million records per second. Direct into GPU VRAM.",
    description:
      "Bypasses traditional TCP bottlenecks and operating system kernels via direct PCIe/NVLink memory mapping. Data lands in Apache Arrow columnar format without serializing or buffering.",
    stats: [
      { label: "Throughput", value: "142.8 GB/s", change: "+320% vs Kafka" },
      { label: "Memory Copies", value: "0", change: "Pure Zero-Copy" },
      { label: "Kernel Overhead", value: "<0.01%", change: "DPDK Bypass" },
    ],
    codeSnippet: [
      "// AURA Ingest Kernel (Rust / CUDA Direct-to-VRAM)",
      "let stream = AuraStream::bind_nic(\"0000:01:00.0\")",
      "    .with_direct_vram(H100_BUFFER_POOL)",
      "    .subscribe_arrow_ipc(\"market.feed.l3\")",
      "    .await?;",
      "",
      "// Zero-copy stream active: 100,000,000 events/sec",
    ],
    badge: "STAGE 1 • HARDWARE DIRECT",
  },
  {
    id: "manifold",
    stepNumber: "02",
    category: "Vector Substrate",
    title: "Riemannian Manifold Reduction",
    subtitle: "128,000 dimensions compressed losslessly into 0.28ms search index.",
    description:
      "High-dimensional vectors fold dynamically across non-Euclidean manifolds. AURA preserves semantic topological distance while dropping query execution times from seconds to sub-microsecond scales.",
    stats: [
      { label: "Recall Rate", value: "99.94%", change: "@ 1M Neighbors" },
      { label: "Index Latency", value: "0.19 ms", change: "18x faster than HNSW" },
      { label: "RAM Footprint", value: "4.2 GB / 100M", change: "16:1 Compression" },
    ],
    codeSnippet: [
      "// Autonomous Manifold Engine",
      "const manifold = await aura.topology.project({",
      "  inputTensor: stream.embeddings,",
      "  metric: \"riemannian-geodesic\",",
      "  quantization: \"fp8-lossless\",",
      "});",
      "",
      "// Clusters synchronized across 16k GPU cores",
    ],
    badge: "STAGE 2 • TENSOR FOLDING",
  },
  {
    id: "reasoning",
    stepNumber: "03",
    category: "Autonomous Inference",
    title: "Continuous Neural Reasoning",
    subtitle: "Hypothesis generation with mathematical certainty, zero hallucination.",
    description:
      "Rather than querying static snapshots, AURA executes continuous evaluation circuits. Anomalies, drift, and systemic causal chains are flagged before downstream systems register impact.",
    stats: [
      { label: "Time-to-Insight", value: "0.34 ms", change: "Sub-millisecond" },
      { label: "False Positive", value: "<0.001%", change: "Strict Formal Bounds" },
      { label: "Auto-Mitigation", value: "Autonomous", change: "Sub-microsecond" },
    ],
    codeSnippet: [
      "// Autonomous Causal Chain Resolution",
      "manifold.onAnomaly(async (event) => {",
      "  const rootCause = await aura.reasoning.isolateCausalPath(event);",
      "  await aura.actions.dispatchMitigation({",
      "    target: rootCause.subsystem,",
      "    action: \"reroute_rdma_secaucus_ny4\"",
      "  });",
      "});",
    ],
    badge: "STAGE 3 • AUTONOMOUS SYNAPSE",
  },
];

export function ScrollStory() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const step = STEPS[activeStep];

  const handleStepSelect = (index: number) => {
    setActiveStep(index);
    sound.playClick();
  };

  return (
    <section
      id="scroll-story"
      ref={containerRef}
      className="relative w-full py-28 px-4 md:px-8 bg-[#030305] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[#00F59B]/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[#00F0FF]/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B]" />
              The Architecture Story
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] text-white">
              From raw chaos to <br />
              <span className="text-white/40">structured enlightenment.</span>
            </h2>
          </div>

          <p className="max-w-md text-white/50 text-base leading-relaxed">
            Legacy data warehouses require ETL pipelines, batch embeddings, and human query loops.
            AURA collapses the entire pipeline into three unified micro-stages.
          </p>
        </div>

        {/* Step Selector Tab Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {STEPS.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => handleStepSelect(idx)}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] border-[#00F59B]/60 shadow-[0_0_25px_-5px_rgba(0,245,155,0.2)]"
                    : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/20 text-white/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs px-2.5 py-1 rounded ${
                      isActive ? "bg-[#00F59B] text-black font-semibold" : "bg-white/[0.06] text-white/60"
                    }`}
                  >
                    {s.stepNumber}
                  </span>
                  <div>
                    <div className={`text-sm font-medium ${isActive ? "text-white" : "text-white/70"}`}>
                      {s.category}
                    </div>
                    <div className="text-[11px] text-white/40">{s.title}</div>
                  </div>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Assembly Deck */}
        <div className="relative rounded-2xl glass-panel p-6 sm:p-8 border border-white/[0.09] shadow-2xl overflow-hidden min-h-[480px]">
          {/* Top Hairline Indicator */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] pb-4 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                {step.badge}
              </span>
              <span className="text-white/40 text-xs font-mono">PCIe Gen 5.0 Bus • NVLink 900 GB/s</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-white/50">
              <span>ACTIVE CLUSTER:</span>
              <span className="text-white font-semibold">ONLINE (0.00% DRIFT)</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Text & Deep Insights */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#00F59B] font-medium mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.08]">
                  {step.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-xl sm:text-2xl font-sans font-semibold text-white tracking-tight mt-1">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-mono text-[#00F59B] mt-0.5">
                        {stat.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Tech Code/Pipeline Inspector */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="rounded-xl bg-[#060609] border border-white/[0.08] overflow-hidden shadow-2xl">
                  {/* Console Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="ml-2 font-mono text-xs text-white/40">aura-runtime.engine</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#00F59B]">COMPILED • 0-COPY</span>
                  </div>

                  {/* Code snippet with syntax styling */}
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-white/80 overflow-x-auto bg-[#040407]">
                    <pre className="space-y-1">
                      {step.codeSnippet.map((line, lIdx) => {
                        const isComment = line.trim().startsWith("//");
                        const isKeyword = line.includes("let ") || line.includes("const ") || line.includes("await ");
                        return (
                          <div
                            key={lIdx}
                            className={
                              isComment
                                ? "text-white/40 italic"
                                : isKeyword
                                ? "text-[#00F59B]"
                                : "text-white/90"
                            }
                          >
                            {line || " "}
                          </div>
                        );
                      })}
                    </pre>
                  </div>

                  {/* Micro Visual Pipeline Wire */}
                  <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/50">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#00F59B]" />
                      <span>Pipeline execution: 14.2 µs</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#00F59B]">
                      <span>VERIFIED PROOF</span>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between mt-3 px-1 text-xs font-mono text-white/40">
                  <span>STAGE {activeStep + 1} OF 3</span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeStep === idx ? "w-8 bg-[#00F59B]" : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
