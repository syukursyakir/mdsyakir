"use client";

/**
 * DESIGN REFERENCE: infracorp.global (Awwwards Nominee)
 *
 * Key observations from the actual site:
 * - Planet is positioned bottom-right, NOT centered
 * - Only the top-left arc/curve is visible
 * - Surface is almost pure black with very subtle blue-grey
 * - Thin, bright blue-white atmospheric rim along the curved edge (backlit)
 * - Soft blue glow bleeding above the edge into space
 * - The light source is BEHIND the planet (backlighting effect)
 * - Very large radius — gentle curvature suggests massive scale
 *
 * Rendered on Canvas 2D for realistic sphere shading
 */

import { useEffect, useRef } from "react";

export default function Planet({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const scroll = scrollRef.current;

      // Planet parameters
      // Huge radius — gentle curve like Infracorp
      const radius = Math.max(width, height) * 1.2;

      // Position: bottom-right, shifted down so only top-left arc shows
      // Scrolls down gently as user scrolls
      const cx = width * 0.75;
      const cy = height + radius * 0.72 + scroll * 0.15;

      // Only draw if planet is at least partially visible
      if (cy - radius > height + 200) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // === LAYER 1: Wide atmospheric glow above the planet edge ===
      // Soft blue haze that fades into space
      const glowRadius = radius + 80;
      const atmosGlow = ctx.createRadialGradient(cx, cy, radius - 20, cx, cy, glowRadius);

      if (isDark) {
        atmosGlow.addColorStop(0, "rgba(60, 140, 255, 0.00)");
        atmosGlow.addColorStop(0.3, "rgba(60, 140, 255, 0.06)");
        atmosGlow.addColorStop(0.6, "rgba(50, 120, 240, 0.03)");
        atmosGlow.addColorStop(1, "rgba(40, 100, 220, 0.00)");
      } else {
        atmosGlow.addColorStop(0, "rgba(99, 102, 241, 0.00)");
        atmosGlow.addColorStop(0.3, "rgba(99, 102, 241, 0.03)");
        atmosGlow.addColorStop(0.6, "rgba(99, 102, 241, 0.015)");
        atmosGlow.addColorStop(1, "rgba(99, 102, 241, 0.00)");
      }

      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = atmosGlow;
      ctx.fill();

      // === LAYER 2: Bright atmospheric rim (the thin blue edge) ===
      // This is THE key Infracorp effect
      const rimWidth = 3;
      const rimGlow = ctx.createRadialGradient(
        cx, cy, radius - rimWidth,
        cx, cy, radius + 40
      );

      if (isDark) {
        rimGlow.addColorStop(0, "rgba(100, 180, 255, 0.0)");
        rimGlow.addColorStop(0.05, "rgba(130, 195, 255, 0.5)");
        rimGlow.addColorStop(0.1, "rgba(100, 175, 255, 0.35)");
        rimGlow.addColorStop(0.25, "rgba(70, 150, 255, 0.12)");
        rimGlow.addColorStop(0.5, "rgba(50, 120, 240, 0.04)");
        rimGlow.addColorStop(1, "rgba(40, 100, 220, 0.0)");
      } else {
        rimGlow.addColorStop(0, "rgba(99, 102, 241, 0.0)");
        rimGlow.addColorStop(0.05, "rgba(120, 130, 255, 0.25)");
        rimGlow.addColorStop(0.1, "rgba(99, 102, 241, 0.15)");
        rimGlow.addColorStop(0.25, "rgba(99, 102, 241, 0.05)");
        rimGlow.addColorStop(1, "rgba(99, 102, 241, 0.0)");
      }

      ctx.beginPath();
      ctx.arc(cx, cy, radius + 40, 0, Math.PI * 2);
      ctx.fillStyle = rimGlow;
      ctx.fill();

      // === LAYER 3: Planet surface ===
      // Near-black sphere with subtle gradient for depth
      const surfaceGrad = ctx.createRadialGradient(
        cx - radius * 0.3, cy - radius * 0.3, 0,
        cx, cy, radius
      );

      if (isDark) {
        surfaceGrad.addColorStop(0, "#0f1a24");
        surfaceGrad.addColorStop(0.4, "#0b1219");
        surfaceGrad.addColorStop(0.7, "#080e14");
        surfaceGrad.addColorStop(0.9, "#050a0e");
        surfaceGrad.addColorStop(1, "#030608");
      } else {
        surfaceGrad.addColorStop(0, "#c8d0dc");
        surfaceGrad.addColorStop(0.4, "#b0b8c8");
        surfaceGrad.addColorStop(0.7, "#8a95a8");
        surfaceGrad.addColorStop(0.9, "#6a7588");
        surfaceGrad.addColorStop(1, "#4a5568");
      }

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = surfaceGrad;
      ctx.fill();

      // === LAYER 4: Thin bright rim line on the edge ===
      // Simulates the bright atmospheric shell at the planet limb
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = isDark
        ? "rgba(120, 190, 255, 0.20)"
        : "rgba(99, 102, 241, 0.10)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second, softer wider line
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = isDark
        ? "rgba(80, 160, 255, 0.08)"
        : "rgba(99, 102, 241, 0.04)";
      ctx.lineWidth = 4;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
