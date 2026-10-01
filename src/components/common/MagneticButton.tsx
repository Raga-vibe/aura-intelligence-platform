"use client";

import React, { useRef, useState } from "react";
import { sound } from "@/lib/audio";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.28;
    const distanceY = (e.clientY - centerY) * 0.28;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    sound.playHoverTick();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 cursor-pointer active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-full gap-1.5 tracking-wider uppercase font-mono",
    md: "px-6 py-3 text-sm rounded-full gap-2.5 tracking-tight",
    lg: "px-8 py-4 text-base rounded-full gap-3 font-medium tracking-tight",
  };

  const variantStyles = {
    primary:
      "bg-white text-black font-semibold hover:bg-[#e6e6e8] shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-5px_rgba(0,245,155,0.4)] border border-white/20",
    secondary:
      "bg-white/[0.04] text-white/90 hover:bg-white/[0.08] border border-white/10 hover:border-white/20 backdrop-blur-md",
    ghost:
      "text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent",
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "transform 0.08s ease-out",
      }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
