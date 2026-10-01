"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DATASETS, DataPoint } from "@/lib/datasets";
import { sound } from "@/lib/audio";
import {
  Activity,
  ShieldAlert,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  Terminal,
  Zap,
  CheckCircle2,
  ChevronRight,
  Flame,
  Sliders,
} from "lucide-react";
import confetti from "canvas-confetti";

export function InteractiveDemo() {
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<string>("fintech");
  const dataset = DATASETS[selectedDatasetKey];

  const [hoveredPointIndex, setHoveredPointIndex] = useState<number>(dataset.anomalyIndex);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [streamTicks, setStreamTicks] = useState<number>(0);
  const [streamingTokens, setStreamingTokens] = useState<string[]>([]);
  const [isMitigating, setIsMitigating] = useState<boolean>(false);
  const [mitigated, setMitigated] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(dataset.points);

  useEffect(() => {
    setDataPoints(dataset.points);
    setHoveredPointIndex(dataset.anomalyIndex);
    setMitigated(false);
    setIsMitigating(false);

    let tokenIdx = 0;
    setStreamingTokens([dataset.aiInsightTokens[0]]);
    const interval = setInterval(() => {
      tokenIdx++;
      if (tokenIdx < dataset.aiInsightTokens.length) {
        setStreamingTokens((prev) => [...prev, dataset.aiInsightTokens[tokenIdx]]);
        sound.playHoverTick();
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [selectedDatasetKey, dataset]);

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setStreamTicks((t) => t + 1);
      setDataPoints((prev) => {
        const next = [...prev];
        const lastIdx = next.length - 1;
        const drift = (Math.random() - 0.5) * 0.8;
        next[lastIdx] = {
          ...next[lastIdx],
          value: +(next[lastIdx].value + drift).toFixed(2),
        };
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleSelectDataset = (key: string) => {
    if (key === selectedDatasetKey) return;
    sound.playPulse();
    setSelectedDatasetKey(key);
  };

  const handleDispatchMitigation = () => {
    sound.playClick();
    setIsMitigating(true);
    setTimeout(() => {
      setIsMitigating(false);
      setMitigated(true);
      sound.playPulse();
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.7 },
          colors: ["#00F59B", "#00F0FF", "#FFFFFF"],
        });
      } catch {
        // Fallback
      }
    }, 900);
  };

  const handleInjectAnomaly = () => {
    sound.playPulse();
    setMitigated(false);
    setDataPoints((prev) => {
      const copy = [...prev];
      const targetIdx = Math.min(dataset.anomalyIndex + 2, copy.length - 2);
      copy[targetIdx] = {
        ...copy[targetIdx],
        value: +(copy[targetIdx].baseline * 2.2).toFixed(1),
        isAnomaly: true,
        anomalyLabel: "SYNTHETIC ANOMALY INJECTED (+220%)",
      };
      setHoveredPointIndex(targetIdx);
      return copy;
    });

    setStreamingTokens([
      "CRITICAL: User injected synthetic anomaly vector.",
      "AURA high-frequency neural filter isolated divergence within 180µs.",
      "Causal trajectory mapped to root hardware buffer.",
      "Autonomous failover circuit verified safe.",
    ]);
  };

  const activePoint = dataPoints[hoveredPointIndex] || dataPoints[dataset.anomalyIndex];

  // SVG Chart Dimensions
  const chartHeight = 220;
  const chartWidth = 720;
  const paddingY = 24;
  const values = dataPoints.map((d) => d.value);
  const minVal = Math.min(...values) * 0.85;
  const maxVal = Math.max(...values) * 1.08;

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minVal) / (maxVal - minVal || 1)) * (chartHeight - paddingY * 2);
  };

  const getX = (idx: number) => {
    return (idx / (dataPoints.length - 1)) * chartWidth;
  };

  const linePoints = dataPoints.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" L ");
  const baselinePoints = dataPoints.map((d, i) => `${getX(i)},${getY(d.baseline)}`).join(" L ");
  const areaPath = `M ${getX(0)},${chartHeight} L ${linePoints} L ${getX(dataPoints.length - 1)},${chartHeight} Z`;

  return (
    <section
      id="interactive-demo"
      className="relative w-full py-28 px-4 md:px-8 bg-[#030305] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00F59B]/[0.025] blur-[160px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F59B] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Keynote Interactive Experience
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] text-white">
            The Living Intelligence Console.
          </h2>
          <p className="mt-3 max-w-2xl text-white/50 text-base sm:text-lg">
            Switch real-world streaming datasets, scrub the telemetry timeline, and watch AURA's
            neural filter synthesize root-cause insights with zero latency.
          </p>
        </div>

        {/* Console Workspace Box */}
        <div className="rounded-2xl glass-panel border border-white/[0.1] shadow-2xl overflow-hidden bg-[#07070b]">
          {/* Top Console Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-white/[0.02] gap-4">
            {/* Dataset Switcher Tabs */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-mono text-xs text-white/40 uppercase tracking-wider mr-2">
                DATASET:
              </span>
              {Object.keys(DATASETS).map((key) => {
                const ds = DATASETS[key];
                const isSelected = key === selectedDatasetKey;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectDataset(key)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#00F59B] text-black font-semibold shadow-[0_0_15px_rgba(0,245,155,0.4)]"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
                    <span>{ds.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Stream Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsStreaming(!isStreaming);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-white/70 hover:text-white cursor-pointer transition-colors"
                title={isStreaming ? "Pause real-time stream" : "Resume stream"}
              >
                {isStreaming ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#00F59B]" />
                    <span>STREAMING</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-white/40" />
                    <span>PAUSED</span>
                  </>
                )}
              </button>

              <button
                onClick={handleInjectAnomaly}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono text-rose-300 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(255,51,102,0.3)]"
                title="Simulate sudden anomaly spike"
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>INJECT SPIKE</span>
              </button>
            </div>
          </div>

          {/* Dataset Title & Telemetry Header */}
          <div className="px-6 py-4 bg-[#09090e]/60 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {dataset.name}
                </h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.06] text-white/50 border border-white/[0.08]">
                  {dataset.domain}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/40 mt-1 font-mono">
                {dataset.tagline} • Ingest rate: {dataset.streamRate}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-white/40">p99:</span>
                <span className="text-[#00F59B] font-semibold">{dataset.p99Latency}</span>
              </div>
              <div className="text-white/20">|</div>
              <div className="flex items-center gap-1.5">
                <span className="text-white/40">NODES:</span>
                <span className="text-white">{dataset.clusterNodes}</span>
              </div>
              <div className="text-white/20">|</div>
              <div className="flex items-center gap-1.5">
                <span className="text-white/40">CONFIDENCE:</span>
                <span className="text-[#00F59B] font-semibold">{dataset.confidenceScore}%</span>
              </div>
            </div>
          </div>

          {/* Main Visualizer Deck */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Interactive SVG Telemetry Timeline */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/40">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#00F59B]" />
                  <span>HIGH-FREQUENCY VOLATILITY TRAJECTORY (HOVER/DRAG TO SCRUB)</span>
                </span>
                <span>T-24 INTERVALS</span>
              </div>

              {/* Responsive SVG Chart Container */}
              <div className="relative w-full rounded-xl bg-[#040407] border border-white/[0.08] p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_30px] pointer-events-none" />

                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F59B" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00F59B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path d={areaPath} fill="url(#chartGradient)" />

                  <path
                    d={`M ${baselinePoints}`}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  <path
                    d={`M ${linePoints}`}
                    fill="none"
                    stroke="#00F59B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {dataPoints.map((point, idx) => {
                    const cx = getX(idx);
                    const cy = getY(point.value);
                    const isHovered = hoveredPointIndex === idx;

                    return (
                      <g
                        key={idx}
                        className="cursor-pointer"
                        onMouseEnter={() => {
                          setHoveredPointIndex(idx);
                          sound.playHoverTick();
                        }}
                      >
                        <circle cx={cx} cy={cy} r="14" fill="transparent" />

                        {point.isAnomaly && (
                          <g>
                            <circle
                              cx={cx}
                              cy={cy}
                              r={isHovered ? "11" : "8"}
                              fill="none"
                              stroke="#FF3366"
                              strokeWidth="2"
                              className="animate-ping"
                              style={{ transformOrigin: `${cx}px ${cy}px` }}
                            />
                            <circle
                              cx={cx}
                              cy={cy}
                              r="6"
                              fill="#FF3366"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                            />
                          </g>
                        )}

                        {!point.isAnomaly && isHovered && (
                          <circle cx={cx} cy={cy} r="5" fill="#FFFFFF" stroke="#00F59B" strokeWidth="2" />
                        )}
                      </g>
                    );
                  })}

                  {hoveredPointIndex !== null && (
                    <g>
                      <line
                        x1={getX(hoveredPointIndex)}
                        y1={0}
                        x2={getX(hoveredPointIndex)}
                        y2={chartHeight}
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    </g>
                  )}
                </svg>

                {/* Range Scrubber Bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/40 uppercase">Timeline:</span>
                  <input
                    type="range"
                    min={0}
                    max={dataPoints.length - 1}
                    value={hoveredPointIndex}
                    onChange={(e) => {
                      setHoveredPointIndex(Number(e.target.value));
                      sound.playHoverTick();
                    }}
                    className="flex-1 accent-[#00F59B] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono text-xs text-white/70 min-w-16 text-right">
                    {activePoint?.time}
                  </span>
                </div>

                {/* Scrubber Tooltip Details */}
                {activePoint && (
                  <div className="mt-3 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40">VALUE:</span>
                      <span
                        className={`font-semibold ${
                          activePoint.isAnomaly ? "text-rose-400" : "text-[#00F59B]"
                        }`}
                      >
                        {activePoint.value}
                      </span>
                      <span className="text-white/40 ml-2">BASELINE:</span>
                      <span className="text-white/70">{activePoint.baseline}</span>
                    </div>

                    {activePoint.isAnomaly && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-medium animate-pulse">
                        <ShieldAlert className="w-3 h-3 text-rose-400" />
                        {activePoint.anomalyLabel || "ANOMALY CONFIRMED"}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Anomaly Inspection Telemetry Drawer */}
              <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div>
                  <div className="text-white/40 uppercase">Anomaly Metric</div>
                  <div className="text-white font-medium mt-1 truncate">
                    {dataset.anomalyDetails.metric}
                  </div>
                </div>
                <div>
                  <div className="text-white/40 uppercase">Observed Variance</div>
                  <div className="text-rose-400 font-semibold mt-1">
                    {dataset.anomalyDetails.variance}
                  </div>
                </div>
                <div>
                  <div className="text-white/40 uppercase">Z-Score Deviation</div>
                  <div className="text-amber-400 font-semibold mt-1">
                    +{dataset.anomalyDetails.zScore}σ
                  </div>
                </div>
                <div>
                  <div className="text-white/40 uppercase">Signature Hash</div>
                  <div className="text-white/70 mt-1 truncate font-mono">
                    {dataset.anomalyDetails.signature}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Live AI Insight Stream (Terminal) */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-xl bg-[#040407] border border-white/[0.08] p-5 shadow-inner">
              <div>
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00F59B]" />
                    <span className="font-mono text-xs text-white/70">AURA_SYNAPSE_AI</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#00F59B] px-1.5 py-0.5 rounded bg-[#00F59B]/10 border border-[#00F59B]/20">
                    REASONING ACTIVE
                  </span>
                </div>

                {/* Tokenized AI Insight Stream */}
                <div className="space-y-3 font-mono text-xs leading-relaxed text-white/80 min-h-[160px]">
                  {streamingTokens.map((token, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#00F59B] shrink-0 mt-0.5" />
                      <span>{token}</span>
                    </motion.div>
                  ))}
                  {streamingTokens.length < dataset.aiInsightTokens.length && (
                    <div className="flex items-center gap-1 text-[#00F59B]">
                      <span className="inline-block w-2 h-4 bg-[#00F59B] animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Recommended Mitigation Action Box */}
                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <div className="text-[11px] font-mono text-white/40 uppercase mb-1">
                    AUTONOMOUS REMEDIATION POLICY:
                  </div>
                  <p className="text-xs text-white/90 font-mono bg-white/[0.04] p-3 rounded-lg border border-white/[0.06] leading-relaxed">
                    {dataset.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  onClick={handleDispatchMitigation}
                  disabled={isMitigating || mitigated}
                  className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    mitigated
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : isMitigating
                      ? "bg-white/20 text-white cursor-wait"
                      : "bg-[#00F59B] text-black hover:bg-[#00f59be0] shadow-[0_0_20px_rgba(0,245,155,0.3)]"
                  }`}
                >
                  {mitigated ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>MITIGATION EXECUTED (0 DOWNTIME)</span>
                    </>
                  ) : isMitigating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>DISPATCHING RDMA RE-ROUTE...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>DISPATCH AUTONOMOUS ACTION</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
