"use client";

/**
 * KokonutUI — Beams Background, adapted for Conta Bahia.
 * Original author: Dorian Baffier / Kokonut Labs · MIT
 * https://kokonutui.com/docs/components/beams-background
 * Keeps the original canvas beams, gradient light and pulsing motion.
 * Adds section sizing, frame limiting, visibility pause and reduced motion.
 */
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string; intensity?: "subtle" | "medium" | "strong"; paused?: boolean };
type Beam = { x: number; width: number; hue: number; phase: number; angle: number };

export default function BeamsBackground({ className, intensity = "medium", paused = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const strength = { subtle: 0.18, medium: 0.32, strong: 0.48 }[intensity];
    let width = 1;
    let height = 1;
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let beams: Beam[] = [];

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      const time = elapsedRef.current;
      for (const beam of beams) {
        ctx.save();
        const x = beam.x + Math.sin(time * 0.18 + beam.phase) * 85;
        const y = -height * 0.85 + Math.cos(time * 0.21 + beam.phase) * height * 0.16;
        ctx.translate(x, y);
        ctx.rotate(beam.angle);
        const pulse = (0.64 + Math.sin(time * 0.55 + beam.phase) * 0.3) * strength;
        const length = height * 2.65;
        const glow = ctx.createLinearGradient(0, 0, 0, length);
        glow.addColorStop(0, `hsla(${beam.hue},95%,73%,0)`);
        glow.addColorStop(0.25, `hsla(${beam.hue},95%,73%,${pulse * 0.4})`);
        glow.addColorStop(0.53, `hsla(${beam.hue},95%,73%,${pulse})`);
        glow.addColorStop(0.75, `hsla(${beam.hue},95%,73%,${pulse * 0.55})`);
        glow.addColorStop(1, `hsla(${beam.hue},95%,73%,0)`);
        ctx.fillStyle = glow;
        ctx.filter = "blur(22px)";
        ctx.fillRect(-beam.width / 2, 0, beam.width, length);
        ctx.restore();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function resize() {
      if (!canvas || !ctx || !host) return;
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: width < 600 ? 5 : 9 }, (_, i) => ({
        x: width * (i / 8 - 0.2),
        width: 58 + (i % 4) * 30,
        hue: 204 + (i % 3) * 9,
        phase: i * 1.12,
        angle: -0.43 - (i % 3) * 0.025,
      }));
      draw();
    }

    function animate(now: number) {
      if (!visible || document.hidden || preference.matches || paused) return;
      if (now - lastTime >= 32) {
        elapsedRef.current += Math.min((now - lastTime) / 1000, 0.08);
        lastTime = now;
        draw();
      }
      frame = requestAnimationFrame(animate);
    }

    function sync() {
      cancelAnimationFrame(frame);
      draw();
      if (visible && !document.hidden && !preference.matches && !paused) {
        lastTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resizeObserver.observe(host);
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    resize();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
    };
  }, [intensity, paused]);

  return <canvas ref={canvasRef} data-kokonut="beams-background" data-paused={paused} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
