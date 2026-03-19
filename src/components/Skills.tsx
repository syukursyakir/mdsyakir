"use client";

import { motion } from "framer-motion";
import { Zap, Bot, Globe, BookOpen } from "lucide-react";
import TextReveal from "./TextReveal";

const skills = [
  {
    category: "Languages",
    items: ["Python", "HTML", "CSS", "JavaScript"],
    icon: Zap,
    span: "col-span-1 row-span-1",
  },
  {
    category: "AI & Tools",
    items: ["Claude Code", "OpenClaw", "AI/ML"],
    icon: Bot,
    span: "col-span-1 row-span-1 md:col-span-1",
  },
  {
    category: "Web Dev",
    items: ["React", "Next.js", "Tailwind CSS"],
    icon: Globe,
    span: "col-span-1 row-span-1",
  },
  {
    category: "Currently Learning",
    items: ["Applied AI", "Data Analytics", "Machine Learning"],
    icon: BookOpen,
    span: "col-span-1 row-span-1 md:col-span-1",
  },
];

const techMarquee = [
  "Python",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Claude Code",
  "OpenClaw",
  "Tailwind CSS",
  "AI/ML",
  "Data Analytics",
  "Git",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">02</span>
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-sm text-muted font-mono tracking-wider uppercase">
            Skills & Tools
          </span>
        </motion.div>

        <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-16">
          Technologies I work with and love.
        </TextReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                className={`bento-item ${skill.span} p-6 rounded-2xl border border-border bg-card group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-mono rounded-full border border-border text-muted group-hover:border-accent/50 group-hover:text-foreground transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee */}
        <div className="mt-16 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={i}
                className="mx-8 text-6xl md:text-8xl font-bold text-foreground/[0.03] select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
