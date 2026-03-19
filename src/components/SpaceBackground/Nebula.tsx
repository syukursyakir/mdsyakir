"use client";

import { motion } from "framer-motion";

export default function Nebula({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Nebula layer 1 - purple */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.1, 1.05, 1],
          x: ["0%", "-2%", "1%", "0%"],
          y: ["0%", "1%", "-1%", "0%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 20% 50%, rgba(100, 40, 200, 0.06) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 20% 50%, rgba(100, 100, 241, 0.03) 0%, transparent 50%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Nebula layer 2 - blue */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1.05, 1, 1.1, 1.05],
          x: ["1%", "0%", "-1%", "1%"],
          y: ["-1%", "0%", "1%", "-1%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 75% 25%, rgba(30, 60, 200, 0.05) 0%, transparent 45%)"
            : "radial-gradient(ellipse at 75% 25%, rgba(99, 102, 241, 0.02) 0%, transparent 45%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Nebula layer 3 - pink/warm */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.08, 1, 1.05],
          x: ["-1%", "1%", "0%", "-1%"],
          y: ["0%", "-1%", "1%", "0%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 55% 75%, rgba(180, 50, 120, 0.04) 0%, transparent 40%)"
            : "radial-gradient(ellipse at 55% 75%, rgba(200, 100, 150, 0.015) 0%, transparent 40%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
