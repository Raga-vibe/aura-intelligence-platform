"use client";

import { Header } from "@/components/common/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { ScrollStory } from "@/components/scroll-story/ScrollStory";
import { InteractiveDemo } from "@/components/interactive-demo/InteractiveDemo";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { PerformanceSpec } from "@/components/specs/PerformanceSpec";
import { KeynoteCTA } from "@/components/cta/KeynoteCTA";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#030305] text-[#f4f4f6] selection:bg-[#00f59b] selection:text-black">
      <Header />
      <HeroSection />
      <ScrollStory />
      <InteractiveDemo />
      <BentoGrid />
      <PerformanceSpec />
      <KeynoteCTA />
      <Footer />
    </main>
  );
}
