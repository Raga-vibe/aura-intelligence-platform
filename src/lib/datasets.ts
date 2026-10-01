export interface DataPoint {
  time: string;
  value: number;
  baseline: number;
  isAnomaly?: boolean;
  anomalyLabel?: string;
  metricB: number;
}

export interface Dataset {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  domain: string;
  streamRate: string;
  p99Latency: string;
  clusterNodes: string;
  confidenceScore: number;
  anomalyIndex: number;
  anomalySummary: string;
  anomalyDetails: {
    timestamp: string;
    metric: string;
    variance: string;
    zScore: number;
    signature: string;
  };
  aiInsightTokens: string[];
  recommendedAction: string;
  points: DataPoint[];
}

export const DATASETS: Record<string, Dataset> = {
  fintech: {
    id: "fintech",
    name: "Ultra-HFT Market Ingestion & Dark Pool Arbitrage",
    shortName: "Equities HFT L3",
    tagline: "NYSE / NASDAQ Direct Kernel Feed",
    domain: "Quantitative Finance",
    streamRate: "142.8 GB/s",
    p99Latency: "0.24 ms",
    clusterNodes: "4,096 H100 Nodes",
    confidenceScore: 99.84,
    anomalyIndex: 16,
    anomalySummary: "Sub-microsecond cross-venue order book divergence detected on SPY/ES futures spread.",
    anomalyDetails: {
      timestamp: "14:22:08.4912",
      metric: "Spread Divergence (bps)",
      variance: "+412% over 60s EWMA",
      zScore: 4.87,
      signature: "0x89F1_ARBITRAGE_SPIKE",
    },
    aiInsightTokens: [
      "Analyzing order-flow matrix...",
      "Detected asymmetric liquidity withdrawal across Chicago CME matching engine.",
      "Root cause: Stale resting order book propagation in secondary dark pool cross-connect.",
      "Autonomous hedging model converged within 320 microseconds.",
      "Zero execution slip recorded.",
    ],
    recommendedAction: "Reroute execution path via direct RDMA bypass to Secaucus NY4 datacenter.",
    points: [
      { time: "14:20:00", value: 42.1, baseline: 41.5, metricB: 88 },
      { time: "14:20:15", value: 43.4, baseline: 42.0, metricB: 91 },
      { time: "14:20:30", value: 41.8, baseline: 42.2, metricB: 87 },
      { time: "14:20:45", value: 44.2, baseline: 42.5, metricB: 94 },
      { time: "14:21:00", value: 43.8, baseline: 42.8, metricB: 92 },
      { time: "14:21:15", value: 45.1, baseline: 43.1, metricB: 96 },
      { time: "14:21:30", value: 44.5, baseline: 43.0, metricB: 95 },
      { time: "14:21:45", value: 46.2, baseline: 43.4, metricB: 98 },
      { time: "14:22:00", value: 45.9, baseline: 43.6, metricB: 97 },
      { time: "14:22:15", value: 47.0, baseline: 43.8, metricB: 99 },
      { time: "14:22:30", value: 46.5, baseline: 44.0, metricB: 98 },
      { time: "14:22:45", value: 48.2, baseline: 44.2, metricB: 102 },
      { time: "14:23:00", value: 47.9, baseline: 44.5, metricB: 101 },
      { time: "14:23:15", value: 49.3, baseline: 44.8, metricB: 104 },
      { time: "14:23:30", value: 50.1, baseline: 45.0, metricB: 106 },
      { time: "14:23:45", value: 51.4, baseline: 45.2, metricB: 109 },
      { time: "14:24:00", value: 94.8, baseline: 45.5, isAnomaly: true, anomalyLabel: "SPREAD DIVERGENCE +412%", metricB: 240 },
      { time: "14:24:15", value: 72.3, baseline: 45.7, isAnomaly: true, anomalyLabel: "AUTO-HEDGE ENGAGED", metricB: 180 },
      { time: "14:24:30", value: 58.1, baseline: 45.9, metricB: 125 },
      { time: "14:24:45", value: 48.9, baseline: 46.0, metricB: 103 },
      { time: "14:25:00", value: 46.7, baseline: 46.2, metricB: 98 },
      { time: "14:25:15", value: 46.2, baseline: 46.3, metricB: 97 },
      { time: "14:25:30", value: 45.8, baseline: 46.4, metricB: 95 },
      { time: "14:25:45", value: 45.5, baseline: 46.5, metricB: 94 },
    ],
  },

  autonomous: {
    id: "autonomous",
    name: "Autonomous Fleet Telemetry & LiDAR SLAM Mesh",
    shortName: "Fleet Telemetry",
    tagline: "12,000 Edge Vehicles Real-time Kinematics",
    domain: "Robotics & AVs",
    streamRate: "89.4 GB/s",
    p99Latency: "0.38 ms",
    clusterNodes: "2,048 Edge Nodes",
    confidenceScore: 99.65,
    anomalyIndex: 14,
    anomalySummary: "Phase-shift anomaly in multi-vehicle LiDAR point cloud registration under dense fog condition.",
    anomalyDetails: {
      timestamp: "03:14:22.018",
      metric: "Point Cloud Jitter (mm)",
      variance: "+580% point divergence",
      zScore: 5.12,
      signature: "0x3C02_SLAM_DECORRELATION",
    },
    aiInsightTokens: [
      "Ingesting multi-spectral LiDAR tensor streams from Sector 7.",
      "Identified localized atmospheric scattering distorting 1550nm photon return curves.",
      "AURA synthetic Kalman filter isolated optical noise without losing pedestrian trajectory tracks.",
      "Fleet consensus re-anchored on ultra-wideband radar telemetry in 1.4 milliseconds.",
    ],
    recommendedAction: "Transmit dynamic sensor weighting coefficients to edge TPU units across Sector 7.",
    points: [
      { time: "03:10", value: 12.4, baseline: 12.1, metricB: 99.8 },
      { time: "03:11", value: 12.8, baseline: 12.2, metricB: 99.9 },
      { time: "03:12", value: 12.2, baseline: 12.2, metricB: 99.7 },
      { time: "03:13", value: 13.1, baseline: 12.3, metricB: 99.6 },
      { time: "03:14", value: 12.9, baseline: 12.3, metricB: 99.8 },
      { time: "03:15", value: 13.5, baseline: 12.4, metricB: 99.5 },
      { time: "03:16", value: 13.2, baseline: 12.4, metricB: 99.6 },
      { time: "03:17", value: 13.9, baseline: 12.5, metricB: 99.4 },
      { time: "03:18", value: 13.6, baseline: 12.5, metricB: 99.5 },
      { time: "03:19", value: 14.1, baseline: 12.6, metricB: 99.3 },
      { time: "03:20", value: 13.8, baseline: 12.6, metricB: 99.4 },
      { time: "03:21", value: 14.5, baseline: 12.7, metricB: 99.2 },
      { time: "03:22", value: 14.2, baseline: 12.7, metricB: 99.3 },
      { time: "03:23", value: 15.0, baseline: 12.8, metricB: 99.1 },
      { time: "03:24", value: 82.6, baseline: 12.8, isAnomaly: true, anomalyLabel: "SLAM POINT-DRIFT 82.6mm", metricB: 88.2 },
      { time: "03:25", value: 48.1, baseline: 12.9, isAnomaly: true, anomalyLabel: "RADAR CONSENSUS LOCKED", metricB: 97.4 },
      { time: "03:26", value: 24.3, baseline: 12.9, metricB: 99.1 },
      { time: "03:27", value: 16.2, baseline: 13.0, metricB: 99.5 },
      { time: "03:28", value: 14.1, baseline: 13.0, metricB: 99.6 },
      { time: "03:29", value: 13.5, baseline: 13.1, metricB: 99.7 },
      { time: "03:30", value: 13.2, baseline: 13.1, metricB: 99.8 },
      { time: "03:31", value: 13.0, baseline: 13.2, metricB: 99.8 },
      { time: "03:32", value: 12.8, baseline: 13.2, metricB: 99.9 },
      { time: "03:33", value: 12.7, baseline: 13.3, metricB: 99.9 },
    ],
  },

  genomics: {
    id: "genomics",
    name: "Ultra-Deep Single-Cell RNA Sequencing & Variant Discovery",
    shortName: "Single-Cell RNA",
    tagline: "50 Million Cells Real-Time Embedding",
    domain: "Computational Biology",
    streamRate: "210.4 GB/s",
    p99Latency: "0.42 ms",
    clusterNodes: "8,192 Tensor Cores",
    confidenceScore: 99.92,
    anomalyIndex: 11,
    anomalySummary: "Rare pathogenic exon-skipping transcription variant identified in chromosome 17q21.31.",
    anomalyDetails: {
      timestamp: "18:45:11.902",
      metric: "Isoform Splice Divergence",
      variance: "+920% transcript enrichment",
      zScore: 6.24,
      signature: "0x7E19_SPLICE_TRANSITION",
    },
    aiInsightTokens: [
      "Projecting 128,000-dimensional gene expression vectors into Riemannian manifold...",
      "Detected hyper-clustered cellular state in previously uncharacterized T-cell subset.",
      "Splice junction read mapping reveals cryptic 5' donor site activation.",
      "AlphaFold 3 structural correlation confirms functional ligand-binding pocket preservation.",
    ],
    recommendedAction: "Synthesize targeted antisense oligonucleotide sequence candidate for wet-lab validation.",
    points: [
      { time: "00:00", value: 28.2, baseline: 27.8, metricB: 1400 },
      { time: "01:00", value: 29.1, baseline: 28.0, metricB: 1420 },
      { time: "02:00", value: 27.9, baseline: 28.2, metricB: 1410 },
      { time: "03:00", value: 30.2, baseline: 28.4, metricB: 1450 },
      { time: "04:00", value: 29.8, baseline: 28.6, metricB: 1440 },
      { time: "05:00", value: 31.0, baseline: 28.8, metricB: 1480 },
      { time: "06:00", value: 30.5, baseline: 29.0, metricB: 1470 },
      { time: "07:00", value: 32.1, baseline: 29.2, metricB: 1510 },
      { time: "08:00", value: 31.7, baseline: 29.4, metricB: 1500 },
      { time: "09:00", value: 33.0, baseline: 29.6, metricB: 1530 },
      { time: "10:00", value: 32.4, baseline: 29.8, metricB: 1520 },
      { time: "11:00", value: 98.4, baseline: 30.0, isAnomaly: true, anomalyLabel: "EXON SKIP VARIANT +920%", metricB: 3890 },
      { time: "12:00", value: 68.2, baseline: 30.2, isAnomaly: true, anomalyLabel: "CONFIRMATION MAPPING", metricB: 2450 },
      { time: "13:00", value: 41.5, baseline: 30.4, metricB: 1720 },
      { time: "14:00", value: 34.2, baseline: 30.6, metricB: 1550 },
      { time: "15:00", value: 32.8, baseline: 30.8, metricB: 1530 },
      { time: "16:00", value: 32.1, baseline: 31.0, metricB: 1510 },
      { time: "17:00", value: 31.6, baseline: 31.2, metricB: 1490 },
      { time: "18:00", value: 31.2, baseline: 31.4, metricB: 1480 },
      { time: "19:00", value: 30.9, baseline: 31.6, metricB: 1470 },
      { time: "20:00", value: 30.5, baseline: 31.8, metricB: 1460 },
      { time: "21:00", value: 30.2, baseline: 32.0, metricB: 1450 },
      { time: "22:00", value: 30.0, baseline: 32.2, metricB: 1440 },
      { time: "23:00", value: 29.8, baseline: 32.4, metricB: 1430 },
    ],
  },
};
