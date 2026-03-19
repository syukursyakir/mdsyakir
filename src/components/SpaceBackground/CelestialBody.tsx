"use client";

/**
 * Moon inspired by:
 *   - https://dev.to/freakyspeedster/created-a-realistic-moon-using-just-css-38c5
 *     (rotating moon texture from solarsystemscope.com + inset box-shadow for 3D)
 *   - https://www.desarrollolibre.net/blog/css/animating-things-with-css-creating-a-moon
 *     (individual crater elements with inset shadows + pulsing glow)
 *
 * Sun inspired by:
 *   - https://css-irl.info/heatwave-animated-sun-illustration/
 *     (conic-gradient rays on pseudo-elements + radial-gradient glow)
 *   - https://codepen.io/Laurie_Lou/pen/QGBpjM
 *     (rotating ray ring with gradient strips)
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

/* ============================
   MOON
   Technique: real NASA texture on a sphere with inset box-shadows
   for 3D lighting + individual crater divs + pulsing glow
   ============================ */
function Moon() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: -30 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Atmospheric glow — outermost ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "-60px",
          background:
            "radial-gradient(circle, rgba(200, 210, 255, 0.06) 0%, rgba(200, 210, 255, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* Main moon body — texture-based with rotating background-position */}
      {/* Ref: dev.to/freakyspeedster — 2k_moon.jpg from solarsystemscope.com */}
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')",
          backgroundSize: "200% 100%",
          boxShadow: [
            // Inner highlight — top-left light source
            "inset -10px 8px 6px -5px rgba(255, 255, 255, 0.4)",
            // Dark shadow — bottom-right depth
            "inset 20px -20px 50px 15px rgba(0, 0, 0, 0.85)",
            // Outer glow — moonlight spill
            "0 0 40px 8px rgba(200, 210, 255, 0.12)",
            "0 0 80px 20px rgba(180, 200, 255, 0.06)",
          ].join(", "),
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Crater overlay — ref: desarrollolibre.net crater technique */}
      <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden">
        {/* Crater 1 — large, top-left */}
        <div
          className="absolute rounded-full"
          style={{
            top: "15%",
            left: "20%",
            width: "18%",
            height: "22%",
            background: "rgba(80, 80, 80, 0.15)",
            boxShadow: "inset 2px -1px 0 0px rgba(60, 60, 60, 0.2)",
            transform: "rotate(40deg)",
          }}
        />
        {/* Crater 2 — medium, center-right */}
        <div
          className="absolute rounded-full"
          style={{
            top: "55%",
            right: "15%",
            width: "12%",
            height: "14%",
            background: "rgba(90, 90, 90, 0.12)",
            boxShadow: "inset 1px -1px 0 0px rgba(50, 50, 50, 0.15)",
            transform: "rotate(-30deg)",
          }}
        />
        {/* Crater 3 — small, center */}
        <div
          className="absolute rounded-full"
          style={{
            top: "40%",
            left: "45%",
            width: "8%",
            height: "8%",
            background: "rgba(70, 70, 70, 0.1)",
            boxShadow: "inset 1px -1px 0 0px rgba(50, 50, 50, 0.12)",
          }}
        />
        {/* Crater 4 — large, bottom-left */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "18%",
            left: "30%",
            width: "15%",
            height: "15%",
            background: "rgba(85, 85, 85, 0.13)",
            boxShadow: "inset 2px -1px 0 0px rgba(55, 55, 55, 0.18)",
          }}
        />
        {/* Crater 5 — tiny, top-right */}
        <div
          className="absolute rounded-full"
          style={{
            top: "25%",
            right: "25%",
            width: "6%",
            height: "6%",
            background: "rgba(75, 75, 75, 0.1)",
          }}
        />
      </div>

      {/* Pulsing glow animation — ref: desarrollolibre moonPulse keyframes */}
      <motion.div
        className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full"
        animate={{
          boxShadow: [
            "0 0 60px 10px rgba(200, 210, 255, 0.08)",
            "0 0 90px 20px rgba(200, 210, 255, 0.14)",
            "0 0 60px 10px rgba(200, 210, 255, 0.08)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

/* ============================
   SUN
   Technique: radial-gradient core + conic-gradient ray ring
   + layered box-shadow glow + pulsing animation
   Ref: css-irl.info/heatwave + codepen.io/Laurie_Lou/pen/QGBpjM
   ============================ */
function Sun() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0, y: -30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 30 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outermost warm atmospheric haze */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-80px",
          background:
            "radial-gradient(circle, rgba(255, 200, 50, 0.06) 0%, rgba(255, 160, 0, 0.02) 40%, transparent 65%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating conic-gradient ray ring */}
      {/* Ref: css-irl.info — conic-gradient on pseudo-element with rotation */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-50px",
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 200, 60, 0.12) 4deg,
            transparent 8deg,
            transparent 22deg,
            rgba(255, 180, 40, 0.08) 26deg,
            transparent 30deg,
            transparent 44deg,
            rgba(255, 200, 60, 0.10) 48deg,
            transparent 52deg,
            transparent 66deg,
            rgba(255, 180, 40, 0.08) 70deg,
            transparent 74deg,
            transparent 88deg,
            rgba(255, 200, 60, 0.12) 92deg,
            transparent 96deg,
            transparent 110deg,
            rgba(255, 180, 40, 0.08) 114deg,
            transparent 118deg,
            transparent 132deg,
            rgba(255, 200, 60, 0.10) 136deg,
            transparent 140deg,
            transparent 154deg,
            rgba(255, 180, 40, 0.08) 158deg,
            transparent 162deg,
            transparent 176deg,
            rgba(255, 200, 60, 0.12) 180deg,
            transparent 184deg,
            transparent 198deg,
            rgba(255, 180, 40, 0.08) 202deg,
            transparent 206deg,
            transparent 220deg,
            rgba(255, 200, 60, 0.10) 224deg,
            transparent 228deg,
            transparent 242deg,
            rgba(255, 180, 40, 0.08) 246deg,
            transparent 250deg,
            transparent 264deg,
            rgba(255, 200, 60, 0.12) 268deg,
            transparent 272deg,
            transparent 286deg,
            rgba(255, 180, 40, 0.08) 290deg,
            transparent 294deg,
            transparent 308deg,
            rgba(255, 200, 60, 0.10) 312deg,
            transparent 316deg,
            transparent 330deg,
            rgba(255, 180, 40, 0.08) 334deg,
            transparent 338deg,
            transparent 352deg,
            rgba(255, 200, 60, 0.12) 356deg,
            transparent 360deg
          )`,
          maskImage: "radial-gradient(circle, transparent 35%, black 45%, black 70%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 35%, black 45%, black 70%, transparent 80%)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Second ray ring — counter-rotating, different phase */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "-40px",
          background: `conic-gradient(
            from 15deg,
            transparent 0deg,
            rgba(255, 220, 80, 0.06) 6deg,
            transparent 12deg,
            transparent 36deg,
            rgba(255, 200, 60, 0.05) 42deg,
            transparent 48deg,
            transparent 72deg,
            rgba(255, 220, 80, 0.06) 78deg,
            transparent 84deg,
            transparent 108deg,
            rgba(255, 200, 60, 0.05) 114deg,
            transparent 120deg,
            transparent 144deg,
            rgba(255, 220, 80, 0.06) 150deg,
            transparent 156deg,
            transparent 180deg,
            rgba(255, 200, 60, 0.05) 186deg,
            transparent 192deg,
            transparent 216deg,
            rgba(255, 220, 80, 0.06) 222deg,
            transparent 228deg,
            transparent 252deg,
            rgba(255, 200, 60, 0.05) 258deg,
            transparent 264deg,
            transparent 288deg,
            rgba(255, 220, 80, 0.06) 294deg,
            transparent 300deg,
            transparent 324deg,
            rgba(255, 200, 60, 0.05) 330deg,
            transparent 336deg,
            transparent 360deg
          )`,
          maskImage: "radial-gradient(circle, transparent 40%, black 50%, black 65%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 40%, black 50%, black 65%, transparent 75%)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Sun core — radial gradient from white-hot center to amber edge */}
      <div
        className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full relative"
        style={{
          background: `radial-gradient(
            circle at 38% 38%,
            #fffde7 0%,
            #fff9c4 15%,
            #ffee58 30%,
            #ffca28 50%,
            #ffb300 70%,
            #ff8f00 90%,
            #e65100 100%
          )`,
          boxShadow: [
            // Core glow — tight, intense
            "0 0 20px 5px rgba(255, 200, 50, 0.5)",
            // Mid glow — warm spread
            "0 0 50px 15px rgba(255, 170, 0, 0.3)",
            // Wide glow — atmospheric
            "0 0 100px 35px rgba(255, 140, 0, 0.15)",
            // Ultra-wide — faint ambient
            "0 0 160px 60px rgba(255, 120, 0, 0.06)",
          ].join(", "),
        }}
      >
        {/* Hot spot — white-hot highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "15%",
            left: "15%",
            width: "35%",
            height: "35%",
            background:
              "radial-gradient(circle, rgba(255, 255, 240, 0.7) 0%, rgba(255, 255, 200, 0.2) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Pulsing glow — ref: desarrollolibre moonPulse adapted for sun */}
      <motion.div
        className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full"
        animate={{
          boxShadow: [
            "0 0 40px 10px rgba(255, 180, 0, 0.25), 0 0 80px 30px rgba(255, 150, 0, 0.12)",
            "0 0 60px 18px rgba(255, 180, 0, 0.35), 0 0 120px 50px rgba(255, 150, 0, 0.18)",
            "0 0 40px 10px rgba(255, 180, 0, 0.25), 0 0 80px 30px rgba(255, 150, 0, 0.12)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
