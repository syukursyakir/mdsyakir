"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

const projects = [
  {
    title: "Personal Portfolio",
    description:
      "This very website — built with Next.js, Framer Motion, and Tailwind CSS. Featuring smooth animations and a clean design.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    color: "#6366f1",
    link: "#",
  },
  {
    title: "AI Projects",
    description:
      "Various AI and machine learning projects built during my diploma studies at Singapore Polytechnic.",
    tags: ["Python", "AI/ML", "Data Analytics"],
    color: "#22d3ee",
    link: "#",
  },
  {
    title: "Claude Code Workflows",
    description:
      "Expert-level workflows and tools built with Claude Code, pushing the boundaries of AI-assisted development.",
    tags: ["Claude Code", "OpenClaw", "Automation"],
    color: "#f59e0b",
    link: "#",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor-text="View"
    >
      {/* Gradient accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}88)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}08, transparent 40%)`,
        }}
      />

      <div className="p-8 md:p-10">
        {/* Number */}
        <span
          className="text-7xl md:text-8xl font-bold leading-none mb-6 block"
          style={{ color: `${project.color}15` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>

        <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono rounded-full border border-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <MagneticButton>
          <a
            href={project.link}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground group/link"
          >
            <span>View Project</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              whileHover={{ x: 4 }}
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </motion.svg>
          </a>
        </MagneticButton>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
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
          <span className="text-accent font-mono text-sm">04</span>
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-sm text-muted font-mono tracking-wider uppercase">
            Selected Work
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Projects I have built and am proud of.
          </TextReveal>

          <motion.a
            href="https://github.com/syukursyakir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors font-mono flex items-center gap-2 shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            View all on GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
