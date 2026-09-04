import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07080B",
        surface: {
          50: "#1E2230",
          100: "#181B26",
          200: "#131620",
          300: "#0F1119",
          400: "#0B0D13",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          medium: "rgba(255, 255, 255, 0.12)",
          bright: "rgba(255, 255, 255, 0.22)",
        },
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1", // Primary indigo
          600: "#4F46E5",
          700: "#4338CA",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          teal: "#14B8A6",
          purple: "#8B5CF6",
        },
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)",
        "radial-glow-cyan": "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12), transparent 60%)",
        "mesh-pattern": "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "gradient-shine": "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.25) 50%, transparent 75%)",
        "card-gradient-dark": "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%)",
        "card-gradient-light": "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 0.95) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "shine": "shine 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(99, 102, 241, 0.4), 0 0 15px -3px rgba(99, 102, 241, 0.2)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        classic: "0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.05), 0 16px 32px -8px rgba(0, 0, 0, 0.06)",
        "classic-lg": "0 4px 6px rgba(0, 0, 0, 0.03), 0 12px 28px rgba(0, 0, 0, 0.06), 0 28px 56px -12px rgba(0, 0, 0, 0.09)",
        "inset-highlight": "inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
        "inset-dark": "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
