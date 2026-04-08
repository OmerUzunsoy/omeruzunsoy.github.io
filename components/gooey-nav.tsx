"use client";

import { useEffect, useRef, useState } from "react";

type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onItemClick?: (href: string, index: number) => void;
};

export default function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onItemClick,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLUListElement | null>(null);
  const filterRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (value = 1) => value / 2 - Math.random() * value;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle =
      (((360 + noise(8)) / totalPoints) * pointIndex * Math.PI) / 180;
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (
    index: number,
    time: number,
    distances: [number, number],
    radius: number,
  ) => {
    const rotate = noise(radius / 10);

    return {
      start: getXY(distances[0], particleCount - index, particleCount),
      end: getXY(
        distances[1] + noise(7),
        particleCount - index,
        particleCount,
      ),
      time,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate:
        rotate > 0
          ? (rotate + radius / 20) * 10
          : (rotate - radius / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLSpanElement) => {
    const distances = particleDistances;
    const radius = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let index = 0; index < particleCount; index += 1) {
      const time = animationTime * 2 + noise(timeVariance * 2);
      const particleData = createParticle(index, time, distances, radius);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");

        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${particleData.start[0]}px`);
        particle.style.setProperty("--start-y", `${particleData.start[1]}px`);
        particle.style.setProperty("--end-x", `${particleData.end[0]}px`);
        particle.style.setProperty("--end-y", `${particleData.end[1]}px`);
        particle.style.setProperty("--time", `${particleData.time}ms`);
        particle.style.setProperty("--scale", `${particleData.scale}`);
        particle.style.setProperty(
          "--color",
          `var(--color-${particleData.color}, white)`,
        );
        particle.style.setProperty("--rotate", `${particleData.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => {
          element.classList.add("active");
        });

        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // do nothing
          }
        }, time);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const position = element.getBoundingClientRect();
    const styles = {
      left: `${position.x - containerRect.x}px`,
      top: `${position.y - containerRect.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const triggerActivation = (
    listItem: HTMLElement,
    index: number,
    href: string,
  ) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      updateEffectPosition(listItem);

      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll(".particle");
        particles.forEach((particle) => filterRef.current?.removeChild(particle));
      }

      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }

      if (filterRef.current) {
        makeParticles(filterRef.current);
      }
    }

    onItemClick?.(href, index);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
    href: string,
  ) => {
    const listItem = event.currentTarget.parentElement as HTMLElement | null;
    if (!listItem) return;

    event.preventDefault();
    triggerActivation(listItem, index, href);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
    href: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const listItem = event.currentTarget.parentElement as HTMLElement | null;
      if (!listItem) return;
      triggerActivation(listItem, index, href);
    }
  };

  useEffect(() => {
    if (typeof controlledActiveIndex === "number") {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;

    const activeItem = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeItem) {
      updateEffectPosition(activeItem as HTMLElement);
      textRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveItem = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveItem) {
        updateEffectPosition(currentActiveItem as HTMLElement);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          .gooey-nav-root {
            --color-1: #ffffff;
            --color-2: #ff4d6d;
            --color-3: #975984;
            --color-4: #4f7cff;
          }
          .gooey-nav-root .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .gooey-nav-root .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          .gooey-nav-root .effect.text.active {
            color: black;
          }
          .gooey-nav-root .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .gooey-nav-root .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .gooey-nav-root .effect.active::after {
            animation: gooey-pill 0.3s ease both;
          }
          @keyframes gooey-pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .gooey-nav-root .particle,
          .gooey-nav-root .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .gooey-nav-root .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: gooey-particle calc(var(--time)) ease 1 -350ms;
          }
          .gooey-nav-root .point {
            background: var(--color);
            opacity: 1;
            animation: gooey-point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes gooey-particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes gooey-point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .gooey-nav-root li.active {
            color: black;
            text-shadow: none;
          }
          .gooey-nav-root li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .gooey-nav-root li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
        `}
      </style>
      <div ref={containerRef} className="gooey-nav-root relative">
        <nav
          className="relative flex rounded-full border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        >
          <ul
            ref={navRef}
            className="relative z-[3] m-0 flex list-none gap-8 p-0"
            style={{
              color: "white",
              textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={item.label}
                className={`relative cursor-pointer rounded-full text-white transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <a
                  href={item.href}
                  onClick={(event) => handleClick(event, index, item.href)}
                  onKeyDown={(event) => handleKeyDown(event, index, item.href)}
                  className="inline-block px-[1em] py-[0.6em] outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span ref={filterRef} className="effect filter" />
        <span ref={textRef} className="effect text" />
      </div>
    </>
  );
}
