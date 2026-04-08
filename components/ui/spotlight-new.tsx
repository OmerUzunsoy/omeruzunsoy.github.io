"use client";

import { motion } from "framer-motion";

type SpotlightProps = {
  className?: string;
};

export function Spotlight({ className = "" }: SpotlightProps) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0.55, scale: 0.92 }}
      animate={{ opacity: 0.9, scale: 1 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute left-1/2 top-[-18%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(255,255,255,0.02)_44%,transparent_72%)] blur-3xl" />
      <div className="absolute left-[12%] top-[18%] h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.14),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[4%] right-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,77,109,0.18),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%,transparent_76%,rgba(255,77,109,0.08))]" />
    </motion.div>
  );
}
