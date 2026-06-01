"use client";

import FadeIn from "./FadeIn";

const SERVICES = [
  {
    number: "01",
    name: "Web Development",
    description:
      "Building modern, responsive web applications with React, Next.js, and Tailwind CSS — from concept to deployment with clean code and smooth animations.",
  },
  {
    number: "02",
    name: "AI & Machine Learning",
    description:
      "Developing intelligent solutions using Python, machine learning models, and data analytics to solve real-world problems and automate workflows.",
  },
  {
    number: "03",
    name: "UI/UX Design",
    description:
      "Designing intuitive, visually striking interfaces that balance aesthetics with usability — creating digital experiences users remember.",
  },
  {
    number: "04",
    name: "Automation & Tools",
    description:
      "Building custom workflows, CLI tools, and automation pipelines with Claude Code and OpenClaw to supercharge development productivity.",
  },
  {
    number: "05",
    name: "Data Analytics",
    description:
      "Transforming raw data into actionable insights through analysis, visualization, and machine learning — helping make smarter, data-driven decisions.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom:
                  i < SERVICES.length - 1
                    ? "1px solid rgba(12, 12, 12, 0.15)"
                    : undefined,
                borderTop:
                  i === 0 ? "1px solid rgba(12, 12, 12, 0.15)" : undefined,
              }}
            >
              <span
                className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 pt-2 sm:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
