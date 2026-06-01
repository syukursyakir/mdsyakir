/* eslint-disable @next/next/no-img-element */
"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";

const DECORATIONS = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    alt: "Moon icon",
    className:
      "w-[120px] sm:w-[160px] md:w-[210px] absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
    fadeIn: { delay: 0.1, x: -80, y: 0, duration: 0.9 },
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    alt: "3D object",
    className:
      "w-[100px] sm:w-[140px] md:w-[180px] absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
    fadeIn: { delay: 0.25, x: -80, y: 0, duration: 0.9 },
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    alt: "Lego icon",
    className:
      "w-[120px] sm:w-[160px] md:w-[210px] absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
    fadeIn: { delay: 0.15, x: 80, y: 0, duration: 0.9 },
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    alt: "3D group",
    className:
      "w-[130px] sm:w-[170px] md:w-[220px] absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
    fadeIn: { delay: 0.3, x: 80, y: 0, duration: 0.9 },
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen relative flex items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {DECORATIONS.map((dec) => (
        <FadeIn
          key={dec.alt}
          delay={dec.fadeIn.delay}
          x={dec.fadeIn.x}
          y={dec.fadeIn.y}
          duration={dec.fadeIn.duration}
          className={dec.className}
        >
          <img src={dec.src} alt={dec.alt} className="w-full" />
        </FadeIn>
      ))}

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text="Hey, i'm Muhammad Syakir — a developer and AI student from Singapore currently pursuing my Diploma in Applied AI & Analytics at Singapore Polytechnic. I dive deep into web development, Python, and AI, building things that push boundaries. Skilled with Claude Code and OpenClaw, i love exploring where AI meets development. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
        </div>

        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
