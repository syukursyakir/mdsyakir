/* eslint-disable @next/next/no-img-element */
"use client";

import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";

const NAV_LINKS = ["About", "Services", "Projects", "Contact"];

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-between relative px-6 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m syakir
            </h1>
          </div>
        </FadeIn>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none sm:pointer-events-auto">
          <FadeIn delay={0.6} y={30}>
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] aspect-[3/4] relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7621B0]/30 via-[#B600A8]/15 to-[#BE4C00]/20 blur-[80px]" />
                <span className="text-[40vw] sm:text-[30vw] md:text-[25vw] lg:text-[20vw] font-black text-[#D7E2EA]/[0.04] select-none leading-none">
                  S
                </span>
              </div>
            </Magnet>
          </FadeIn>
        </div>

        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              a developer & ai student building intelligent digital experiences
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
