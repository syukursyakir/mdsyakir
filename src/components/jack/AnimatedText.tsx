"use client";

import { useRef, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function CharSpan({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.2, 1]
  );

  if (char === " ") {
    return <span> </span>;
  }

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <CharSpan
          key={i}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
