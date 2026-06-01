"use client";

import HeroSection from "@/components/jack/HeroSection";
import MarqueeSection from "@/components/jack/MarqueeSection";
import AboutSection from "@/components/jack/AboutSection";
import ServicesSection from "@/components/jack/ServicesSection";
import ProjectsSection from "@/components/jack/ProjectsSection";

export default function JackPage() {
  return (
    <div style={{ background: "#0C0C0C", overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
