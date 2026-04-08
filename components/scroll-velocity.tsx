"use client";

import { useMemo } from "react";

type VelocityMapping = {
  input: [number, number];
  output: [number, number];
};

type ScrollVelocityProps = {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts?: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
};

type MarqueeRowProps = {
  text: string;
  direction: "normal" | "reverse";
  duration: number;
  className: string;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  copies: number;
};

function MarqueeRow({
  text,
  direction,
  duration,
  className,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  copies,
}: MarqueeRowProps) {
  const repeatedItems = useMemo(
    () =>
      Array.from({ length: copies }, (_, index) => (
        <span
          key={`${text}-${index}`}
          className={`inline-flex shrink-0 items-center ${className}`}
        >
          {text}
        </span>
      )),
    [className, copies, text],
  );

  return (
    <div
      className={`${parallaxClassName ?? ""} relative overflow-hidden`}
      style={parallaxStyle}
    >
      <div
        className={`${scrollerClassName ?? ""} flex min-w-max whitespace-nowrap will-change-transform motion-reduce:animate-none`}
        style={{
          animationName: direction === "reverse" ? "marquee-reverse" : "marquee",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          ...scrollerStyle,
        }}
      >
        {repeatedItems}
        {repeatedItems}
      </div>
    </div>
  );
}

export default function ScrollVelocity({
  texts = [],
  velocity = 100,
  className = "",
  numCopies = 4,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}: ScrollVelocityProps) {
  const safeVelocity = Math.max(Math.abs(velocity), 20);
  const duration = Math.max(22, 140 / safeVelocity);

  return (
    <section aria-label="Teknoloji başlıkları">
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marquee-reverse {
          from {
            transform: translate3d(-50%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      {texts.map((text, index) => (
        <MarqueeRow
          key={`${text}-${index}`}
          text={text}
          direction={index % 2 === 0 ? "normal" : "reverse"}
          duration={duration + index * 2}
          className={className}
          copies={Math.max(2, numCopies)}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        />
      ))}
    </section>
  );
}
