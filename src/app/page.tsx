"use client";

import SmoothScroll from "@/components/jack/SmoothScroll";
import CustomCursor from "@/components/jack/CustomCursor";
import HeroSection from "@/components/jack/HeroSection";
import MarqueeSection from "@/components/jack/MarqueeSection";
import AboutSection from "@/components/jack/AboutSection";
import ServicesSection from "@/components/jack/ServicesSection";
import ProjectsSection from "@/components/jack/ProjectsSection";
import FooterSection from "@/components/jack/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div
        className="noise-overlay"
        style={{ background: "#0C0C0C", overflowX: "clip" }}
      >
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
