"use client";

/**
 * DESIGN REFERENCES:
 *   - stars.chromeexperiments.com (100,000 Stars) — B-V color temperature
 *     palette, varied star sizes by layer, glow halos on bright stars
 *   - gamiable.com — additive-feel rendering, parallax depth via
 *     3 speed layers, mouse-reactive offset
 *   - byhook.com/activity/exploring-the-cosmos-with-webgl — rejection
 *     sampling distribution, diffraction spikes on bright stars,
 *     custom star texture approach
 *   - stephentrieu.com — procedurally generated star clusters + nebula
 */

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  layer: number;
  r: number;
  g: number;
  b: number;
}

// B-V stellar color index temperatures (ref: 100,000 Stars)
// Cool red (3500K) -> warm yellow (5000K) -> white (6500K) -> blue-white (10000K+)
const STAR_PALETTE: [number, number, number][] = [
  [255, 204, 170], // M-class warm red
  [255, 220, 190], // K-class warm yellow-white
  [255, 240, 230], // G-class (sun-like) pale yellow
  [255, 250, 250], // F-class white
  [235, 240, 255], // A-class blue-white
  [200, 215, 255], // B-class blue
  [170, 190, 255], // O-class deep blue
];

export default function Starfield({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateStars();
    };

    const generateStars = () => {
      const stars: Star[] = [];
      // 3 layers: far (many, small, slow), mid, near (few, large, fast)
      // ref: gamiable.com layered parallax
      const configs = [
        { count: 400, sizeMin: 0.2, sizeMax: 0.7, opMin: 0.15, opMax: 0.5 },
        { count: 180, sizeMin: 0.6, sizeMax: 1.4, opMin: 0.4, opMax: 0.75 },
        { count: 40, sizeMin: 1.2, sizeMax: 2.5, opMin: 0.7, opMax: 1.0 },
      ];

      for (let layer = 0; layer < 3; layer++) {
        const c = configs[layer];
        for (let i = 0; i < c.count; i++) {
          // Weighted color selection — more cool/white stars, fewer red/blue
          const colorWeights = [0.08, 0.12, 0.25, 0.25, 0.15, 0.10, 0.05];
          let roll = Math.random();
          let colorIdx = 0;
          for (let j = 0; j < colorWeights.length; j++) {
            roll -= colorWeights[j];
            if (roll <= 0) {
              colorIdx = j;
              break;
            }
          }
          const [r, g, b] = STAR_PALETTE[colorIdx];

          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius:
              Math.random() * (c.sizeMax - c.sizeMin) + c.sizeMin,
            baseOpacity:
              Math.random() * (c.opMax - c.opMin) + c.opMin,
            twinkleSpeed: Math.random() * 0.003 + 0.0008,
            phase: Math.random() * Math.PI * 2,
            layer,
            r, g, b,
          });
        }
      }
      starsRef.current = stars;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX / width;
      targetMouse.current.y = e.clientY / height;
    };

    // Parallax speed per layer (ref: gamiable.com)
    const layerSpeeds = [6, 14, 26];

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse position (ref: byhook.com dampened movement)
      mouseRef.current.x += (targetMouse.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouse.current.y - mouseRef.current.y) * 0.05;

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      for (const star of starsRef.current) {
        const parallaxX = mx * layerSpeeds[star.layer];
        const parallaxY = my * layerSpeeds[star.layer];

        // Sinusoidal twinkle
        const flicker =
          Math.sin(time * star.twinkleSpeed + star.phase) * 0.35 + 0.65;
        const opacity = star.baseOpacity * flicker;

        const drawX =
          ((star.x + parallaxX + width) % width + width) % width;
        const drawY =
          ((star.y + parallaxY + height) % height + height) % height;

        // Star core
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity})`;
        ctx.fill();

        // Glow halo for larger stars (ref: 100,000 Stars + byhook diffraction)
        if (star.radius > 1.0) {
          const glowRadius = star.radius * 4;
          const gradient = ctx.createRadialGradient(
            drawX, drawY, star.radius * 0.5,
            drawX, drawY, glowRadius
          );
          gradient.addColorStop(0, `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity * 0.25})`);
          gradient.addColorStop(0.5, `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity * 0.08})`);
          gradient.addColorStop(1, `rgba(${star.r}, ${star.g}, ${star.b}, 0)`);
          ctx.beginPath();
          ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Diffraction cross on the brightest stars (ref: byhook.com)
        if (star.radius > 2.0) {
          ctx.strokeStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity * 0.12})`;
          ctx.lineWidth = 0.5;
          const spikeLen = star.radius * 6;
          ctx.beginPath();
          ctx.moveTo(drawX - spikeLen, drawY);
          ctx.lineTo(drawX + spikeLen, drawY);
          ctx.moveTo(drawX, drawY - spikeLen);
          ctx.lineTo(drawX, drawY + spikeLen);
          ctx.stroke();
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
      style={{ opacity: isDark ? 1 : 0.12 }}
    />
  );
}
