"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

export function Particles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef(true);
  const isPageVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches;
      const densityDivisor = isTouchDevice ? 32000 : 18000;

      const count = Math.max(
        isTouchDevice ? 14 : 30,
        Math.floor((rect.width * rect.height) / densityDivisor),
      );
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: -0.18 + Math.random() * 0.36,
        vy: -0.12 + Math.random() * 0.24,
        size: 1 + Math.random() * 2.2,
        alpha: 0.16 + Math.random() * 0.35,
      }));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(parent);

    let frame = 0;
    let lastFrame = 0;
    const render = () => {
      if (!isPageVisibleRef.current || !isVisibleRef.current) {
        frame = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches;
      const frameInterval = isTouchDevice ? 1000 / 24 : 1000 / 40;
      if (now - lastFrame < frameInterval) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particlesRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        context.beginPath();
        context.fillStyle = `rgba(255, 240, 248, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
