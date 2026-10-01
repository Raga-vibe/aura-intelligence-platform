"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 195;
    camera.position.y = 8;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030305, 0);
    container.appendChild(renderer.domElement);

    // Particle Parameters
    const particleCount = prefersReducedMotion ? 4000 : 18000;
    const geometry = new THREE.BufferGeometry();

    const cloudPositions = new Float32Array(particleCount * 3);
    const matrixPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Color definitions
    const colorA = new THREE.Color(0x00f59b); // Photonic Mint
    const colorB = new THREE.Color(0x00d2ff); // Electric Cyan
    const colorC = new THREE.Color(0x3b82f6); // Cobalt Vector

    const gridSize = Math.cbrt(particleCount) | 0;
    const gridSpacing = 9.0;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // 1. Wide Cosmic Nebula Spiral (framing horizontal display)
      const u = Math.random();
      const spiralArm = (i % 4) * ((2 * Math.PI) / 4);
      const spiralR = 30 + Math.pow(Math.random(), 0.7) * 95;
      const spiralTheta = spiralR * 0.06 + spiralArm + (Math.random() - 0.5) * 0.6;

      // Anamorphic horizontal stretching: wider in X, compressed in Y
      cloudPositions[i3] = Math.cos(spiralTheta) * spiralR * 1.5 + (Math.random() - 0.5) * 20;
      cloudPositions[i3 + 1] = (Math.random() - 0.5) * 32 + Math.sin(spiralR * 0.08) * 8;
      cloudPositions[i3 + 2] = Math.sin(spiralTheta) * spiralR * 0.8 + (Math.random() - 0.5) * 20;

      // 2. High-Dimensional Matrix / Crystalline Lattice
      const gx = (i % gridSize) - gridSize / 2;
      const gy = (Math.floor(i / gridSize) % gridSize) - gridSize / 2;
      const gz = Math.floor(i / (gridSize * gridSize)) - gridSize / 2;

      matrixPositions[i3] = gx * gridSpacing * 1.6;
      matrixPositions[i3 + 1] = gy * gridSpacing * 0.5;
      matrixPositions[i3 + 2] = gz * gridSpacing * 0.8;

      currentPositions[i3] = cloudPositions[i3];
      currentPositions[i3 + 1] = cloudPositions[i3 + 1];
      currentPositions[i3 + 2] = cloudPositions[i3 + 2];

      const mixedColor = new THREE.Color();
      const blend = Math.random();
      if (blend < 0.5) {
        mixedColor.copy(colorA).lerp(colorB, Math.random());
      } else {
        mixedColor.copy(colorB).lerp(colorC, Math.random());
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 2.0 + 0.6;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom Particle Radial Dot Texture
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(0.55, "rgba(0, 245, 155, 0.35)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Initial render
    renderer.render(scene, camera);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) * 0.0005;
      targetMouseY = (e.clientY - halfH) * 0.0005;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let scrollProgress = 0;
    const onScroll = () => {
      const maxScroll = window.innerHeight * 1.5;
      scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      particleSystem.rotation.y = elapsed * 0.04 + mouseX * 2.2;
      particleSystem.rotation.x = mouseY * 1.2 + Math.sin(elapsed * 0.08) * 0.04;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const morphT = scrollProgress;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const cx = cloudPositions[i3];
        const cy = cloudPositions[i3 + 1];
        const cz = cloudPositions[i3 + 2];

        const mx = matrixPositions[i3];
        const my = matrixPositions[i3 + 1];
        const mz = matrixPositions[i3 + 2];

        const wave = Math.sin(elapsed * 1.2 + cx * 0.02 + cz * 0.02) * 2.0 * (1 - morphT * 0.7);

        posArray[i3] = THREE.MathUtils.lerp(cx, mx, morphT);
        posArray[i3 + 1] = THREE.MathUtils.lerp(cy + wave, my, morphT);
        posArray[i3 + 2] = THREE.MathUtils.lerp(cz, mz, morphT);
      }

      posAttr.needsUpdate = true;
      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      particleTexture?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none"
    />
  );
}
