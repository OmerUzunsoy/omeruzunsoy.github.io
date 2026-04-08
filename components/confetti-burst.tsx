"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  rotation: number;
  rotationSpeed: number;
};

export type ConfettiBurstRef = {
  fire: () => void;
};

type ConfettiBurstProps = {
  className?: string;
};

const COLORS = ["#ff4d6d", "#f8d9ff", "#975984", "#4f7cff", "#ffb347"];

const ConfettiBurst = forwardRef<ConfettiBurstRef, ConfettiBurstProps>(
  function ConfettiBurst({ className = "" }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const isPageVisibleRef = useRef(true);

    useImperativeHandle(ref, () => ({
      fire() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height * 0.25;

        particlesRef.current = Array.from({ length: 140 }, () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 6;

          return {
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (2 + Math.random() * 3),
            size: 4 + Math.random() * 7,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            life: 60 + Math.random() * 40,
            rotation: Math.random() * Math.PI,
            rotationSpeed: -0.2 + Math.random() * 0.4,
          };
        });
      },
    }));

    useEffect(() => {
      const handleVisibility = () => {
        isPageVisibleRef.current = document.visibilityState === "visible";
      };

      handleVisibility();
      document.addEventListener("visibilitychange", handleVisibility);

      return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const resize = () => {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };

      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(parent);

      const context = canvas.getContext("2d");
      if (!context) return () => observer.disconnect();

      let frame = 0;

      const render = () => {
        if (!isPageVisibleRef.current || particlesRef.current.length === 0) {
          frame = requestAnimationFrame(render);
          return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current = particlesRef.current.filter((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.08;
          particle.life -= 1;
          particle.rotation += particle.rotationSpeed;

          if (particle.life <= 0) return false;

          context.save();
          context.translate(particle.x, particle.y);
          context.rotate(particle.rotation);
          context.globalAlpha = Math.max(0, particle.life / 100);
          context.fillStyle = particle.color;
          context.fillRect(
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size * 0.7,
          );
          context.restore();

          return true;
        });

        frame = requestAnimationFrame(render);
      };

      frame = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute inset-0 ${className}`}
      />
    );
  },
);

export default ConfettiBurst;
