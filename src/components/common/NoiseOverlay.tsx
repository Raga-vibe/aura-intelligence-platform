"use client";

import { useEffect, useRef } from "react";

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 256);
    let height = (canvas.height = 256);

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    let frame = 0;
    const render = () => {
      frame++;
      // Render grain every 3 frames to keep GPU usage <0.1% while maintaining filmic organic jitter
      if (frame % 3 === 0) {
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() * 255) | 0;
          data[i] = noise;
          data[i + 1] = noise;
          data[i + 2] = noise;
          data[i + 3] = 14; // ~5.5% grain opacity
        }
        ctx.putImageData(imgData, 0, 0);
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-40 mix-blend-overlay"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
