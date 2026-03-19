"use client";

/**
 * Scroll-velocity marquee — text speeds up when scrolling fast,
 * slows to a crawl when idle. Direction flips based on scroll direction.
 * Common on awwwards-winning sites for section dividers.
 */

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValue, useTransform, useSpring, useAnimationFrame } from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface ScrollVelocityTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

export default function ScrollVelocityText({
  children,
  baseVelocity = 2,
  className = "",
}: ScrollVelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef(1);
  const prevScrollY = useRef(0);

  useAnimationFrame((_, delta) => {
    // Calculate scroll velocity
    const currentScrollY = scrollY.get();
    const diff = currentScrollY - prevScrollY.current;
    scrollVelocity.set(Math.abs(diff));
    prevScrollY.current = currentScrollY;

    // Direction based on scroll
    if (diff < 0) {
      directionFactor.current = -1;
    } else if (diff > 0) {
      directionFactor.current = 1;
    }

    let moveBy =
      directionFactor.current * baseVelocity + directionFactor.current * velocityFactor.get();

    baseX.set(baseX.get() + moveBy * (delta / 1000) * 30);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const repeats = 4;

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div className={`flex whitespace-nowrap gap-8 ${className}`} style={{ x }}>
        {Array.from({ length: repeats }).map((_, i) => (
          <span
            key={i}
            className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground/[0.03] select-none"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
