"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Linkedin, Github } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/syukur-syakir-098728360/",
    icon: Linkedin,
  },
  {
    name: "Twitter / X",
    url: "https://x.com/syaks155439",
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/syukursyakir",
    icon: Github,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-mono text-sm">05</span>
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-sm text-muted font-mono tracking-wider uppercase">
            Get In Touch
          </span>
        </motion.div>

        <TextReveal className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8 justify-center">
          Let&apos;s work together.
        </TextReveal>

        <motion.p
          className="text-muted text-base md:text-lg max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Have a project in mind, want to collaborate, or just want to say
          hello? I&apos;d love to hear from you.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="mailto:hello@mdsyakir.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 group"
              data-cursor-text="Email"
            >
              <Mail className="w-5 h-5" />
              Say Hello
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <MagneticButton key={social.name} strength={0.4}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                  data-cursor-hover
                >
                  <Icon />
                </motion.a>
              </MagneticButton>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
