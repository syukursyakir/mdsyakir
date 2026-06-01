"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";

const NAV_LINKS = ["About", "Services", "Projects", "Contact"];
const HEADING = "HI, I'M SYAKIR";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <nav className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        <motion.a
          href="#"
          className="text-[#D7E2EA] font-black text-xl md:text-2xl tracking-tighter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          MS<span className="text-[#C9A96E]">.</span>
        </motion.a>
        <div className="flex items-center gap-5 sm:gap-7 md:gap-10">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.05,
                duration: 0.8,
                ease: EASE,
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </nav>

      <div className="flex-1 flex flex-col relative px-6 md:px-10">
        <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            {HEADING.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.035,
                  duration: 0.9,
                  ease: EASE,
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none sm:pointer-events-auto">
          <FadeIn delay={1.2} y={30} duration={1}>
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <motion.div
                className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] aspect-square relative flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C9A96E]/20 via-[#7621B0]/15 to-[#D7E2EA]/10 blur-[100px]" />
                <div className="absolute inset-[15%] rounded-full border border-[#D7E2EA]/[0.06]" />
                <div className="absolute inset-[30%] rounded-full border border-[#C9A96E]/[0.04]" />
                <div className="absolute inset-[45%] rounded-full border border-[#D7E2EA]/[0.03]" />
              </motion.div>
            </Magnet>
          </FadeIn>
        </div>

        <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          <div>
            <FadeIn delay={1.0} y={20}>
              <p
                className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
                style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
              >
                a developer & ai student building intelligent digital
                experiences
              </p>
            </FadeIn>
            <motion.div
              className="flex items-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#D7E2EA]/60 text-xs uppercase tracking-widest font-light">
                Available for work
              </span>
            </motion.div>
          </div>

          <FadeIn delay={1.1} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
