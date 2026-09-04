import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
          cyan: "#06B6D4",
          blue: "#3B82F6",
        },
        surface: {
          50: "#1A1D27",
          100: "#141722",
          200: "#0F121C",
          300: "#0B0D15",
          400: "#07080D",
          base: "#07080B",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          medium: "rgba(255, 255, 255, 0.15)",
          strong: "rgba(255, 255, 255, 0.25)",
        }
      },
      boxShadow: {
        "glow": "0 0 40px -10px rgba(99, 102, 241, 0.5)",
        "glow-cyan": "0 0 40px -10px rgba(6, 182, 212, 0.5)",
        "glow-sm": "0 0 20px -5px rgba(99, 102, 241, 0.4)",
        "classic": "0 2px 4px rgba(0,0,0,0.02), 0 10px 20px -5px rgba(0,0,0,0.04), inset 0 1px 0 0 rgba(255,255,255,0.95)",
        "classic-dark": "0 10px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
