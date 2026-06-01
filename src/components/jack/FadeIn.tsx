"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

type ElementType =
  | "div"
  | "section"
  | "nav"
  | "header"
  | "footer"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "li"
  | "ul"
  | "a"
  | "main"
  | "article";

interface FadeInProps {
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function FadeIn({
  as: Tag = "div",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  children,
  className,
  style,
}: FadeInProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (motion as any)[Tag] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
