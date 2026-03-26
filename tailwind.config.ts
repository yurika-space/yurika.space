import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Yurika Terminal Palette
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        surface: "var(--color-bg-secondary)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        primary: "var(--color-interactive-primary)",       // #CCFF00 Yurika Lime
        secondary: "var(--color-interactive-secondary)",   // #9D00FF Data Purple
        destructive: "var(--color-feedback-error)",        // #FF3131 Glitch Red
        "feedback-success": "var(--color-feedback-success)",
        "feedback-warning": "var(--color-feedback-warning)",
        "feedback-error": "var(--color-feedback-error)",
        // Alias shorthands
        lime: "#CCFF00",
        purple: "#9D00FF",
        "glitch-red": "#FF3131",
        void: "#0D0D0D",
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],   // Press Start 2P
        heading: ["var(--font-heading)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],        // Inter
        mono: ["var(--font-mono)", "monospace"],         // JetBrains Mono
      },
      boxShadow: {
        "neon-lime": "0 0 8px #CCFF00, 0 0 20px #CCFF0066",
        "neon-purple": "0 0 8px #9D00FF, 0 0 20px #9D00FF66",
        "neon-red": "0 0 8px #FF3131, 0 0 20px #FF313166",
        "terminal": "inset 0 0 30px rgba(0,0,0,0.5)",
      },
      animation: {
        "scanline": "scanline 8s linear infinite",
        "glitch": "glitch 0.3s steps(2) infinite",
        "pulse-lime": "pulse-lime 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "type": "typewriter 2s steps(40) forwards",
        "cursor-blink": "blink 1s step-end infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px) skewX(-1deg)" },
          "50%": { transform: "translateX(2px) skewX(1deg)" },
          "75%": { transform: "translateX(-1px)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-lime": {
          "0%, 100%": { boxShadow: "0 0 8px #CCFF00" },
          "50%": { boxShadow: "0 0 20px #CCFF00, 0 0 40px #CCFF0066" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "grid-terminal": "linear-gradient(rgba(204,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
