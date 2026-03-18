import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "Space Mono", "monospace"],
        sans: ["var(--font-sans)", "IBM Plex Sans", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        brand: {
          red: "#d42b2b",
          amber: "#e8a020",
          green: "#1a7a3a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
