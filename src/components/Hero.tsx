"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center"
      >
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs md:text-sm text-muted font-mono">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name - first line */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[12vw] md:text-[9vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tighter text-foreground"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 2.7,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            MUHAMMAD
          </motion.h1>
        </div>

        {/* Name - second line with gradient */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="text-[12vw] md:text-[9vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tighter"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 2.85,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="text-gradient">SYAKIR</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-xl text-muted max-w-lg mx-auto mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          Developer & AI Student building the future,{" "}
          <span className="text-foreground">one line of code at a time.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
        >
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity duration-300"
              data-cursor-text="View"
            >
              View My Work
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-full text-sm font-medium text-foreground hover:border-accent transition-colors duration-300"
              data-cursor-text="Say Hi"
            >
              Get In Touch
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.6 }}
      >
        <span className="text-xs text-muted font-mono tracking-widest">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
