"use client";

/**
 * DESIGN REFERENCES:
 *
 * Moon:
 *   - solarsystemscope.com — NASA-grade moon textures, realistic lighting
 *   - stars.chromeexperiments.com (100,000 Stars) — stellar color temperature rendering
 *   - dev.to/freakyspeedster — rotating texture with inset box-shadow for 3D depth
 *   - desarrollolibre.net — crater elements with inset shadows + pulsing glow
 *
 * Sun:
 *   - solarsystemscope.com — radial gradient sun rendering with corona layers
 *   - gamiable.com — additive blending glow, particle-based corona
 *   - css-irl.info/heatwave — conic-gradient rotating rays with radial mask
 *   - stars.chromeexperiments.com — B-V color index (3840K-42000K temperature palette)
 *   - byhook.com/activity/exploring-the-cosmos-with-webgl — layered glow + diffraction
 *
 * Toggle concept:
 *   - toggles.dev — smooth celestial body transitions
 */

import { motion, AnimatePresence } from "framer-motion";

export default function CelestialBody({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed top-16 right-8 md:top-24 md:right-20 lg:top-28 lg:right-28 z-[1] pointer-events-none">
      <AnimatePresence mode="wait">
        {isDark ? <Moon key="moon" /> : <Sun key="sun" />}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   MOON
   Ref: solarsystemscope.com texture + 100,000 Stars color science
   Technique: Real 2K NASA texture with background-position animation
   for slow rotation, multi-layer inset box-shadows for spherical
   lighting, separate crater elements, and pulsing atmospheric glow.
   ================================================================ */
function Moon() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0, y: 40, rotate: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, y: -40, rotate: 20 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Layer 1: Wide atmospheric glow (solarsystemscope lighting ref) */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "-80px",
          background: `
            radial-gradient(circle,
              rgba(180, 200, 255, 0.07) 0%,
              rgba(160, 185, 255, 0.03) 35%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Layer 2: Close atmospheric ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-30px",
          background: `
            radial-gradient(circle,
              transparent 55%,
              rgba(200, 215, 255, 0.04) 65%,
              rgba(180, 200, 255, 0.02) 80%,
              transparent 90%
            )
          `,
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moon body — real NASA texture from solarsystemscope.com */}
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')",
          backgroundSize: "220% 100%",
          /* Multi-layer inset shadows (ref: dev.to/freakyspeedster)
             Creates spherical 3D lighting with a top-left light source */
          boxShadow: [
            // Bright highlight — light source top-left
            "inset -12px 10px 8px -6px rgba(255, 255, 255, 0.35)",
            // Deep shadow — opposite side darkness
            "inset 24px -24px 60px 20px rgba(0, 0, 0, 0.88)",
            // Rim light — thin bright edge
            "inset -3px 2px 3px -2px rgba(255, 255, 255, 0.15)",
            // Outer glow — moonlight spill (cool blue)
            "0 0 30px 6px rgba(180, 200, 255, 0.10)",
            "0 0 60px 15px rgba(160, 185, 255, 0.05)",
          ].join(", "),
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Crater overlay (ref: desarrollolibre.net technique)
            Individual divs with inset box-shadow for depth */}
        <div
          className="absolute rounded-full"
          style={{
            top: "12%", left: "18%",
            width: "20%", height: "24%",
            background: "rgba(80, 80, 80, 0.12)",
            boxShadow: "inset 2px -2px 4px rgba(40, 40, 40, 0.2)",
            transform: "rotate(35deg)",
            borderRadius: "60% 40% 50% 50%",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%", right: "12%",
            width: "14%", height: "16%",
            background: "rgba(90, 90, 90, 0.10)",
            boxShadow: "inset 1px -1px 3px rgba(40, 40, 40, 0.15)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "35%", left: "42%",
            width: "9%", height: "9%",
            background: "rgba(70, 70, 70, 0.08)",
            boxShadow: "inset 1px -1px 2px rgba(30, 30, 30, 0.12)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "15%", left: "25%",
            width: "17%", height: "17%",
            background: "rgba(85, 85, 85, 0.11)",
            boxShadow: "inset 2px -1px 4px rgba(45, 45, 45, 0.18)",
            borderRadius: "50% 50% 45% 55%",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "22%", right: "22%",
            width: "7%", height: "7%",
            background: "rgba(75, 75, 75, 0.08)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "30%", right: "35%",
            width: "5%", height: "5%",
            background: "rgba(70, 70, 70, 0.06)",
          }}
        />
      </motion.div>

      {/* Pulsing glow (ref: desarrollolibre moonPulse keyframe) */}
      <motion.div
        className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 50px 8px rgba(180, 200, 255, 0.06), 0 0 100px 25px rgba(160, 185, 255, 0.03)",
            "0 0 70px 15px rgba(180, 200, 255, 0.10), 0 0 140px 40px rgba(160, 185, 255, 0.05)",
            "0 0 50px 8px rgba(180, 200, 255, 0.06), 0 0 100px 25px rgba(160, 185, 255, 0.03)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ================================================================
   SUN
   Ref: solarsystemscope.com radial rendering + gamiable.com
   additive glow + css-irl.info conic-gradient rays +
   stars.chromeexperiments.com B-V color temperature science
   (white-hot core ~6000K, amber limb ~4000K, deep red edge ~3500K)

   Technique: Multi-stop radial gradient for the photosphere,
   dual counter-rotating conic-gradient ray rings masked with
   radial-gradient holes, 5-layer box-shadow for corona + bloom,
   and pulsing animation for breathing life.
   ================================================================ */
function Sun() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0, y: -40, rotate: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, y: 40, rotate: -20 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Layer 1: Ultra-wide warm haze (ref: gamiable.com atmospheric glow) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-100px",
          background: `
            radial-gradient(circle,
              rgba(255, 200, 60, 0.08) 0%,
              rgba(255, 160, 20, 0.04) 30%,
              rgba(255, 120, 0, 0.015) 50%,
              transparent 70%
            )
          `,
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 2: Ray ring 1 — conic-gradient (ref: css-irl.info heatwave)
          16 rays with radial mask to cut out center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-55px",
          background: `repeating-conic-gradient(
            from 0deg,
            rgba(255, 200, 60, 0.10) 0deg 3deg,
            transparent 3deg 22.5deg
          )`,
          maskImage:
            "radial-gradient(circle, transparent 32%, black 42%, black 68%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 32%, black 42%, black 68%, transparent 78%)",
          filter: "blur(1px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 3: Ray ring 2 — counter-rotating, offset phase */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-45px",
          background: `repeating-conic-gradient(
            from 11.25deg,
            rgba(255, 220, 80, 0.06) 0deg 2deg,
            transparent 2deg 22.5deg
          )`,
          maskImage:
            "radial-gradient(circle, transparent 38%, black 48%, black 62%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 38%, black 48%, black 62%, transparent 72%)",
          filter: "blur(0.5px)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 4: Inner corona glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-20px",
          background: `
            radial-gradient(circle,
              transparent 50%,
              rgba(255, 200, 80, 0.08) 60%,
              rgba(255, 160, 40, 0.04) 75%,
              transparent 85%
            )
          `,
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sun photosphere (ref: solarsystemscope.com + B-V color index)
          White-hot center (~6500K) -> yellow (~5800K) -> amber (~4500K) -> deep orange edge */}
      <div
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full relative overflow-hidden"
        style={{
          background: `
            radial-gradient(
              circle at 36% 36%,
              #fffff0 0%,
              #fffde0 8%,
              #fff9c4 18%,
              #ffee58 30%,
              #fdd835 42%,
              #ffca28 55%,
              #ffb300 68%,
              #ff8f00 80%,
              #ef6c00 92%,
              #e65100 100%
            )
          `,
          boxShadow: [
            // Tight core glow
            "0 0 15px 4px rgba(255, 220, 80, 0.6)",
            // Inner corona
            "0 0 35px 10px rgba(255, 180, 40, 0.4)",
            // Mid corona
            "0 0 70px 25px rgba(255, 150, 0, 0.2)",
            // Outer corona
            "0 0 120px 45px rgba(255, 120, 0, 0.10)",
            // Atmospheric bloom
            "0 0 200px 80px rgba(255, 100, 0, 0.04)",
          ].join(", "),
        }}
      >
        {/* Hot spot — specular highlight (ref: solarsystemscope.com sun rendering) */}
        <div
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "10%",
            width: "40%",
            height: "40%",
            background: `
              radial-gradient(circle at 45% 45%,
                rgba(255, 255, 250, 0.8) 0%,
                rgba(255, 255, 230, 0.4) 30%,
                rgba(255, 255, 200, 0.1) 60%,
                transparent 80%
              )
            `,
          }}
        />

        {/* Surface granulation — subtle noise texture (ref: solarsystemscope.com) */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-[0.06]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 35%, rgba(200, 100, 0, 0.4) 0%, transparent 3%),
              radial-gradient(circle at 60% 25%, rgba(180, 80, 0, 0.3) 0%, transparent 2%),
              radial-gradient(circle at 45% 60%, rgba(190, 90, 0, 0.35) 0%, transparent 4%),
              radial-gradient(circle at 75% 55%, rgba(200, 100, 0, 0.3) 0%, transparent 2%),
              radial-gradient(circle at 30% 70%, rgba(170, 80, 0, 0.25) 0%, transparent 3%),
              radial-gradient(circle at 55% 80%, rgba(185, 85, 0, 0.3) 0%, transparent 2%),
              radial-gradient(circle at 80% 35%, rgba(195, 95, 0, 0.3) 0%, transparent 3%),
              radial-gradient(circle at 15% 55%, rgba(175, 75, 0, 0.25) 0%, transparent 2%)
            `,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        />

        {/* Limb darkening overlay — darker edges for realism */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 40% 40%,
                transparent 0%,
                transparent 40%,
                rgba(180, 80, 0, 0.08) 65%,
                rgba(120, 40, 0, 0.15) 85%,
                rgba(80, 20, 0, 0.2) 100%
              )
            `,
          }}
        />
      </div>

      {/* Pulsing corona (ref: desarrollolibre adapted for sun) */}
      <motion.div
        className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 30px 8px rgba(255, 200, 60, 0.3), 0 0 60px 20px rgba(255, 150, 0, 0.15), 0 0 100px 40px rgba(255, 120, 0, 0.06)",
            "0 0 45px 14px rgba(255, 200, 60, 0.4), 0 0 90px 35px rgba(255, 150, 0, 0.2), 0 0 150px 60px rgba(255, 120, 0, 0.08)",
            "0 0 30px 8px rgba(255, 200, 60, 0.3), 0 0 60px 20px rgba(255, 150, 0, 0.15), 0 0 100px 40px rgba(255, 120, 0, 0.06)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
