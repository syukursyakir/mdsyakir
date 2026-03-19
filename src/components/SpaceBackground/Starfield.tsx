"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  layer: number; // 0=far, 1=mid, 2=near
  color: string;
}

const STAR_COLORS = [
  "255, 255, 255", // white
  "200, 220, 255", // blue-white
  "255, 240, 220", // warm yellow
  "255, 200, 200", // faint red
  "180, 200, 255", // cool blue
];

export default function Starfield({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      generateStars();
    };

    const generateStars = () => {
      const stars: Star[] = [];
      const counts = [350, 150, 50]; // far, mid, near
      const sizes = [
        [0.3, 0.8],
        [0.8, 1.5],
        [1.5, 2.8],
      ];

      for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < counts[layer]; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius:
              Math.random() * (sizes[layer][1] - sizes[layer][0]) +
              sizes[layer][0],
            baseOpacity:
              layer === 0
                ? Math.random() * 0.4 + 0.2
                : layer === 1
                  ? Math.random() * 0.3 + 0.5
                  : Math.random() * 0.2 + 0.8,
            twinkleSpeed: Math.random() * 0.003 + 0.001,
            phase: Math.random() * Math.PI * 2,
            layer,
            color:
              STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          });
        }
      }
      starsRef.current = stars;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / width;
      mouseRef.current.y = e.clientY / height;
    };

    const layerSpeeds = [8, 16, 28];

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      for (const star of starsRef.current) {
        const parallaxX = mx * layerSpeeds[star.layer];
        const parallaxY = my * layerSpeeds[star.layer];

        const flicker =
          Math.sin(time * star.twinkleSpeed + star.phase) * 0.4 + 0.6;
        const opacity = star.baseOpacity * flicker;

        const drawX =
          ((star.x + parallaxX + width) % width + width) % width;
        const drawY =
          ((star.y + parallaxY + height) % height + height) % height;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();

        // Glow for larger stars
        if (star.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.radius * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            star.radius * 3
          );
          gradient.addColorStop(0, `rgba(${star.color}, ${opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: isDark ? 1 : 0.15 }}
    />
  );
}
