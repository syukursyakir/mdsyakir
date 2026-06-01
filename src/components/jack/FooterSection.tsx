"use client";

import { Github, Linkedin } from "lucide-react";
import FadeIn from "./FadeIn";

const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/syukursyakir",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/syukur-syakir-098728360/",
    icon: Linkedin,
  },
  {
    name: "X",
    url: "https://x.com/syaks155439",
    icon: null,
  },
];

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-6 md:px-10 pb-8 pt-16"
    >
      <div className="gradient-line mb-12" />
      <FadeIn y={20}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#D7E2EA]/40 text-sm font-light tracking-wide">
            &copy; 2026 Muhammad Syakir
          </p>

          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-[#D7E2EA]/10 flex items-center justify-center text-[#D7E2EA]/40 hover:text-[#C9A96E] hover:border-[#C9A96E]/30 transition-all duration-300"
                >
                  {Icon ? <Icon className="w-5 h-5" /> : <XIcon />}
                </a>
              );
            })}
          </div>

          <p className="text-[#D7E2EA]/40 text-sm font-light tracking-wide">
            Singapore
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
