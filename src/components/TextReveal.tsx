"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  splitBy?: "chars" | "words";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef(null);

  const items =
    splitBy === "chars"
      ? children.split("")
      : children.split(" ").map((w) => w + " ");

  return (
    <motion.div
      ref={ref}
      className={`flex flex-wrap overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: delay + i * (splitBy === "chars" ? 0.02 : 0.05),
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
