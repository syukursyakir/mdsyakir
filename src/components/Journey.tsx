"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./TextReveal";

const timeline = [
  {
    year: "2025 — Present",
    title: "Diploma in Applied AI & Analytics",
    place: "Singapore Polytechnic",
    description:
      "Currently pursuing my diploma, diving deep into artificial intelligence, machine learning, and data analytics.",
    type: "education",
  },
  {
    year: "2022 — 2025",
    title: "Secondary Education (Sec 1-4)",
    place: "Bukit Panjang Government High School",
    description:
      "Where it all started. Discovered my passion for programming and technology. Built my first projects and learned the foundations.",
    type: "education",
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">03</span>
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-sm text-muted font-mono tracking-wider uppercase">
            My Journey
          </span>
        </motion.div>

        <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-20">
          The path that shaped who I am today.
        </TextReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-border">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col md:flex-row items-start mb-20 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Dot on the line */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-background z-10">
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
              </div>

              {/* Content card */}
              <div
                className={`ml-8 md:ml-0 md:w-[45%] ${
                  i % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:pl-16 md:text-left"
                }`}
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent border border-accent/30 mb-4">
                  {item.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-accent mb-3">
                  {item.place}
                </p>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
