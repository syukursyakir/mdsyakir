"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Code2 } from "lucide-react";
import TextReveal from "./TextReveal";

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={sectionRef}
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
          <span className="text-accent font-mono text-sm">01</span>
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-sm text-muted font-mono tracking-wider uppercase">
            About Me
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8">
              I craft digital experiences that merge creativity with technology.
            </TextReveal>

            <motion.div
              className="space-y-6 text-muted text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p>
                Hey there! I&apos;m <span className="text-foreground font-medium">Muhammad Syakir</span>,
                a developer and student from Singapore currently pursuing my{" "}
                <span className="text-foreground font-medium">
                  Diploma in Applied AI &amp; Analytics
                </span>{" "}
                at Singapore Polytechnic.
              </p>
              <p>
                My journey started at Bukit Panjang Government High School, where I discovered
                my passion for code. Since then, I&apos;ve been diving deep into web development,
                Python, and AI — building things that make a difference.
              </p>
              <p>
                I&apos;m particularly skilled with{" "}
                <span className="text-foreground font-medium">Claude Code</span> and{" "}
                <span className="text-foreground font-medium">OpenClaw</span>, and
                I love exploring the intersection of AI and development.
              </p>
            </motion.div>
          </div>

          {/* Visual element */}
          <motion.div
            className="relative aspect-square max-w-md mx-auto lg:mx-0"
            style={{ y: imgY }}
          >
            <div className="absolute inset-0 rounded-3xl border border-border overflow-hidden bg-card">
              {/* Decorative pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-[200px] md:text-[280px] font-bold text-foreground/[0.03] select-none leading-none"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  S
                </motion.div>
              </div>

              {/* Info cards inside */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 gap-3">
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-mono">LOCATION</p>
                    <p className="text-sm font-medium text-foreground">
                      Singapore
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-mono">STUDYING</p>
                    <p className="text-sm font-medium text-foreground">
                      Applied AI &amp; Analytics
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-mono">FOCUS</p>
                    <p className="text-sm font-medium text-foreground">
                      AI + Web Development
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating accent dots */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-accent/20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-accent/30"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
