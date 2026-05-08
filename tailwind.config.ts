import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        accent: "#00ff88",

        surface: "#111111",

        surface2: "#1a1a1a",

        border: "#2a2a2a",

        muted: "#888888",

        background: "#0a0a0a",
      },

      fontFamily: {
        display: ["Syne", "sans-serif"],

        sans: [
          "Inter",
          "sans-serif",
        ],

        mono: [
          "JetBrains Mono",
          "monospace",
        ],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        accent:
          "0 0 40px rgba(0,255,136,0.12)",
      },

      animation: {
        shimmer:
          "shimmer 1.5s infinite",

        fadeIn:
          "fadeIn 0.4s ease forwards",

        pulseAccent:
          "pulseAccent 2s ease infinite",
      },

      keyframes: {
        shimmer: {
          "0%": {
            backgroundPosition:
              "200% 0",
          },

          "100%": {
            backgroundPosition:
              "-200% 0",
          },
        },

        fadeIn: {
          from: {
            opacity: "0",
            transform:
              "translateY(12px)",
          },

          to: {
            opacity: "1",
            transform:
              "translateY(0)",
          },
        },

        pulseAccent: {
          "0%, 100%": {
            opacity: "1",
          },

          "50%": {
            opacity: "0.6",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;