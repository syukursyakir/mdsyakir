"use client";

/**
 * DESIGN REFERENCE: infracorp.global (Awwwards Nominee)
 * - Large planet/sphere anchored at bottom of viewport
 * - Blue atmospheric rim glow on the edge (limb)
 * - Scroll-reactive: planet shifts down as user scrolls
 * - CSS custom property --y tracks scroll for translate
 * - mix-blend-mode: screen for glow layers
 * - Background: deep navy #101b23
 *
 * Also referenced:
 * - solarsystemscope.com — planet surface texture approach
 * - gamiable.com — atmospheric glow layering
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Planet({ isDark }: { isDark: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1500], [0, 400]);
  const scale = useTransform(scrollY, [0, 1500], [1, 1.15]);
  const glowOpacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  return (
    <motion.div
      className="fixed bottom-0 left-1/2 z-[1] pointer-events-none"
      style={{
        x: "-50%",
        y,
        scale,
        // Planet sizing — very large, only top portion visible
        width: "min(140vw, 1600px)",
        height: "min(140vw, 1600px)",
        // Position so only ~25% of the planet peeks above viewport bottom
        marginBottom: "-75%",
      }}
    >
      {/* Layer 1: Outermost atmospheric haze */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          opacity: glowOpacity,
          background: isDark
            ? `
              radial-gradient(circle at 50% 20%,
                rgba(80, 140, 255, 0.06) 0%,
                rgba(60, 120, 220, 0.03) 30%,
                transparent 55%
              )
            `
            : `
              radial-gradient(circle at 50% 20%,
                rgba(99, 102, 241, 0.04) 0%,
                rgba(99, 102, 241, 0.02) 30%,
                transparent 55%
              )
            `,
          transform: "scale(1.15)",
        }}
      />

      {/* Layer 2: Atmospheric rim light (the blue glow on the edge)
          This is the KEY Infracorp effect — a bright blue line on the planet limb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          opacity: glowOpacity,
          boxShadow: isDark
            ? [
                // Inner rim — bright blue edge light
                "inset 0 80px 120px -40px rgba(80, 150, 255, 0.20)",
                // Outer glow — atmospheric spill
                "0 -40px 100px 10px rgba(60, 130, 255, 0.08)",
                "0 -20px 60px 5px rgba(80, 150, 255, 0.06)",
              ].join(", ")
            : [
                "inset 0 80px 120px -40px rgba(99, 102, 241, 0.12)",
                "0 -40px 100px 10px rgba(99, 102, 241, 0.04)",
                "0 -20px 60px 5px rgba(99, 102, 241, 0.03)",
              ].join(", "),
        }}
      />

      {/* Layer 3: Planet body — dark sphere with subtle surface */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: isDark
            ? `
              radial-gradient(circle at 50% 15%,
                #1a2a3a 0%,
                #111e2b 20%,
                #0c1620 40%,
                #080f16 60%,
                #050a0f 80%,
                #030608 100%
              )
            `
            : `
              radial-gradient(circle at 50% 15%,
                #d8dde5 0%,
                #c0c8d4 20%,
                #a8b4c4 40%,
                #8a9ab0 60%,
                #6a7a90 80%,
                #4a5a70 100%
              )
            `,
        }}
      >
        {/* Surface detail — subtle terrain-like texture via layered gradients */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            opacity: isDark ? 0.15 : 0.08,
            background: `
              radial-gradient(ellipse at 30% 25%, rgba(100, 160, 220, 0.3) 0%, transparent 25%),
              radial-gradient(ellipse at 65% 35%, rgba(80, 130, 200, 0.2) 0%, transparent 20%),
              radial-gradient(ellipse at 45% 15%, rgba(90, 150, 210, 0.25) 0%, transparent 30%),
              radial-gradient(ellipse at 70% 10%, rgba(70, 120, 180, 0.2) 0%, transparent 22%),
              radial-gradient(ellipse at 20% 10%, rgba(60, 110, 170, 0.15) 0%, transparent 18%),
              radial-gradient(ellipse at 55% 25%, rgba(80, 140, 200, 0.2) 0%, transparent 15%),
              radial-gradient(ellipse at 40% 8%, rgba(100, 160, 220, 0.2) 0%, transparent 25%)
            `,
          }}
        />

        {/* Atmospheric haze band across the top limb */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isDark
              ? `
                linear-gradient(180deg,
                  rgba(80, 150, 255, 0.08) 0%,
                  rgba(60, 130, 240, 0.04) 5%,
                  transparent 15%
                )
              `
              : `
                linear-gradient(180deg,
                  rgba(99, 102, 241, 0.06) 0%,
                  rgba(99, 102, 241, 0.03) 5%,
                  transparent 15%
                )
              `,
          }}
        />

        {/* Rim light highlight — bright blue edge (Infracorp signature) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isDark
              ? `
                radial-gradient(circle at 50% 0%,
                  rgba(100, 170, 255, 0.15) 0%,
                  rgba(80, 150, 255, 0.06) 8%,
                  transparent 20%
                )
              `
              : `
                radial-gradient(circle at 50% 0%,
                  rgba(99, 102, 241, 0.10) 0%,
                  rgba(99, 102, 241, 0.04) 8%,
                  transparent 20%
                )
              `,
          }}
        />
      </div>

      {/* Layer 4: Top-edge light line — the thin bright arc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? `
              radial-gradient(ellipse 80% 8% at 50% 0%,
                rgba(120, 180, 255, 0.25) 0%,
                rgba(100, 160, 255, 0.10) 40%,
                transparent 100%
              )
            `
            : `
              radial-gradient(ellipse 80% 8% at 50% 0%,
                rgba(99, 102, 241, 0.15) 0%,
                rgba(99, 102, 241, 0.06) 40%,
                transparent 100%
              )
            `,
        }}
      />
    </motion.div>
  );
}
