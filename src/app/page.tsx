"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SpaceBackground from "@/components/SpaceBackground";
import ScrollVelocityText from "@/components/ScrollVelocityText";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="noise-overlay">
          <CustomCursor />
          <SpaceBackground />
          <Loader onComplete={handleLoadComplete} />

          {!loading && (
            <>
              <Navbar />
              <main className="relative z-[2]">
                <Hero />
                <div className="section-divider" />
                <About />

                {/* Scroll-velocity marquee — speeds up as you scroll */}
                <div className="py-8 overflow-hidden">
                  <ScrollVelocityText baseVelocity={-2}>
                    DEVELOPER &mdash; AI STUDENT &mdash; SINGAPORE &mdash; CLAUDE CODE &mdash; OPENCLAW &mdash;&nbsp;
                  </ScrollVelocityText>
                  <ScrollVelocityText baseVelocity={2}>
                    PYTHON &mdash; REACT &mdash; NEXT.JS &mdash; TAILWIND &mdash; FRAMER MOTION &mdash;&nbsp;
                  </ScrollVelocityText>
                </div>

                <Skills />
                <div className="section-divider" />
                <Journey />
                <div className="section-divider" />
                <Projects />
                <div className="section-divider" />
                <Contact />
              </main>
              <Footer />
            </>
          )}
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
