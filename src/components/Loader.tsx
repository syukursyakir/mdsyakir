"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"name" | "exit">("name");
  const name = "MUHAMMAD SYAKIR";

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("exit"), 2000);
    const timer2 = setTimeout(() => onComplete(), 2600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-[var(--background)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.div className="flex gap-[0.15em]">
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground"
                  initial={{ y: 120, opacity: 0, rotateX: -80 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Animated line under name */}
          <motion.div
            className="absolute bottom-[45%] left-1/2 h-[1px] bg-accent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "200px", x: "-50%" }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Subtitle */}
          <motion.p
            className="absolute bottom-[40%] text-muted text-sm md:text-base font-mono tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            DEVELOPER & STUDENT
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
