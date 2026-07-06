import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        comic: {
          red: "#E23636",
          blue: "#1E90FF",
          yellow: "#FFD700",
          green: "#18A558",
          paper: "#FFFEF0",
          ink: "#000000",
          graphite: "#2C2C2C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        comic: "8px 8px 0 #000",
        comicSm: "4px 4px 0 #000",
        comicBlue: "8px 8px 0 #1E90FF",
        comicRed: "8px 8px 0 #E23636",
      },
      fontFamily: {
        display: ["Bangers", "Impact", "Arial Black", "sans-serif"],
        body: ["Nunito", "Microsoft YaHei", "sans-serif"],
      },
      keyframes: {
        "panel-pop": {
          "0%": { opacity: "0", transform: "translateY(24px) rotate(-1deg) scale(.96)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0) scale(1)" },
        },
        "speed-lines": {
          "0%": { transform: "translateX(-10%)", opacity: ".45" },
          "100%": { transform: "translateX(10%)", opacity: ".9" },
        },
        "sound-bounce": {
          "0%, 100%": { transform: "rotate(-8deg) scale(1)" },
          "50%": { transform: "rotate(-4deg) scale(1.06)" },
        },
      },
      animation: {
        "panel-pop": "panel-pop .7s cubic-bezier(.2,.8,.2,1) both",
        "speed-lines": "speed-lines 2.8s ease-in-out infinite alternate",
        "sound-bounce": "sound-bounce 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
}
