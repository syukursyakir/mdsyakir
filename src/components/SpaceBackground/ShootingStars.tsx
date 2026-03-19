"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Meteor {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  duration: number;
}

export default function ShootingStars({ isDark }: { isDark: boolean }) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    if (!isDark) return;

    let counter = 0;
    const spawn = () => {
      const meteor: Meteor = {
        id: counter++,
        x: Math.random() * 80 + 10, // % from left
        y: Math.random() * 30, // % from top (upper part of screen)
        angle: Math.random() * 20 + 25, // 25-45 degrees
        length: Math.random() * 100 + 60,
        duration: Math.random() * 0.8 + 0.6,
      };

      setMeteors((prev) => [...prev, meteor]);

      // Remove after animation
      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== meteor.id));
      }, meteor.duration * 1000 + 500);
    };

    // Spawn at random intervals
    const scheduleNext = () => {
      const delay = Math.random() * 4000 + 2000; // 2-6 seconds
      return setTimeout(() => {
        spawn();
        timerRef = scheduleNext();
      }, delay);
    };

    // Initial spawn after a short delay
    let timerRef = setTimeout(() => {
      spawn();
      timerRef = scheduleNext();
    }, 1500);

    return () => clearTimeout(timerRef);
  }, [isDark]);

  if (!isDark) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {meteors.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="absolute"
            style={{
              left: `${meteor.x}%`,
              top: `${meteor.y}%`,
              width: `${meteor.length}px`,
              height: "1px",
              transform: `rotate(${meteor.angle}deg)`,
              transformOrigin: "left center",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scaleX: [0, 1, 1, 0.5],
              x: [0, -300],
              y: [0, 300],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: meteor.duration,
              ease: "easeIn",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(180, 200, 255, 0.6), rgba(255, 255, 255, 0.9))",
                boxShadow:
                  "0 0 6px 1px rgba(170, 200, 255, 0.4), 0 0 12px 2px rgba(120, 150, 255, 0.2)",
                borderRadius: "0 1px 1px 0",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
