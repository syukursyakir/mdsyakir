"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function CelestialBody({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed top-20 right-12 md:top-28 md:right-24 lg:right-32 z-[1] pointer-events-none">
      <AnimatePresence mode="wait">
        {isDark ? (
          /* ---- MOON ---- */
          <motion.div
            key="moon"
            className="relative"
            initial={{ scale: 0.3, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: 45 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(180, 200, 255, 0.08) 0%, transparent 70%)",
              }}
            />

            {/* Moon body */}
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #e8e8e8 0%, #c8c8c8 50%, #b0b0b0 100%)",
                boxShadow:
                  "0 0 40px 8px rgba(180, 200, 255, 0.12), 0 0 80px 20px rgba(160, 180, 255, 0.06), inset -8px -4px 16px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Craters */}
              <div
                className="absolute w-5 h-5 md:w-7 md:h-7 rounded-full top-3 left-4 md:top-4 md:left-6"
                style={{
                  background:
                    "radial-gradient(circle, rgba(160,160,160,0.4) 0%, rgba(180,180,180,0.1) 70%)",
                }}
              />
              <div
                className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full top-10 left-10 md:top-14 md:left-14"
                style={{
                  background:
                    "radial-gradient(circle, rgba(150,150,150,0.3) 0%, rgba(170,170,170,0.1) 70%)",
                }}
              />
              <div
                className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full bottom-4 left-3 md:bottom-6 md:left-4"
                style={{
                  background:
                    "radial-gradient(circle, rgba(155,155,155,0.35) 0%, rgba(175,175,175,0.1) 70%)",
                }}
              />
              <div
                className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full top-6 right-4 md:top-8 md:right-5"
                style={{
                  background:
                    "radial-gradient(circle, rgba(145,145,145,0.25) 0%, rgba(165,165,165,0.1) 70%)",
                }}
              />

              {/* Subtle highlight */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Slow rotation for life */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(45deg, transparent 40%, rgba(200, 210, 255, 0.03) 50%, transparent 60%)",
              }}
            />
          </motion.div>
        ) : (
          /* ---- SUN ---- */
          <motion.div
            key="sun"
            className="relative"
            initial={{ scale: 0.3, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: -45 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer rays glow */}
            <motion.div
              className="absolute -inset-16 md:-inset-20 rounded-full"
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 200, 50, 0.12) 0%, rgba(255, 150, 0, 0.04) 40%, transparent 70%)",
              }}
            />

            {/* Sun body */}
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full relative"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, #fff7e0 0%, #ffd54f 30%, #ffb300 60%, #ff8f00 100%)",
                boxShadow:
                  "0 0 40px 10px rgba(255, 180, 0, 0.2), 0 0 80px 25px rgba(255, 150, 0, 0.1), 0 0 120px 40px rgba(255, 120, 0, 0.05)",
              }}
            >
              {/* Hot spot */}
              <div
                className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full top-3 left-3 md:top-4 md:left-4"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,240,0.6) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Rotating ray ring */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[1px] md:w-[2px] h-32 md:h-44"
                  style={{
                    background:
                      "linear-gradient(to top, transparent, rgba(255, 200, 50, 0.1), transparent)",
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "center center",
                  }}
                />
              ))}
            </motion.div>

            {/* Inner pulse */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,200,0.1) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
