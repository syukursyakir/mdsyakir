"use client";

/**
 * Text scramble/decode effect — characters scramble randomly
 * then resolve into the final text. Developer/hacker vibe.
 * Common on award-winning portfolio hero sections.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

interface TextScrambleProps {
  children: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TextScramble({
  children,
  className = "",
  delay = 0,
  speed = 30,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const target = children;
    let iteration = 0;
    const maxIterations = target.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        setDisplayText(target);
        clearInterval(intervalRef.current);
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [children, started, speed]);

  return (
    <motion.span
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
}
