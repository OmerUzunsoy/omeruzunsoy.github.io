import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0c0c0c",
        line: "#171717",
        foreground: "#f5f5f5",
        muted: "#a1a1aa",
        accent: "#ED1C24",
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        display: ["var(--font-oswald)"],
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.4)",
        glow: "0 0 40px rgba(237, 28, 36, 0.2)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top, rgba(255,255,255,0.1), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.03), transparent 55%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseLine: "pulseLine 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.95" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
