import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // near-white base
        paper: "#FBFAF8",
        // charcoal / asphalt text + dark sections
        ink: {
          DEFAULT: "#23272C",
          700: "#1a1d21",
          500: "#565b62",
          400: "#7b8088",
        },
        // primary accent — blueprint blue
        blueprint: {
          DEFAULT: "#1B5390",
          light: "#2f6aa8",
          dark: "#143E6E",
          600: "#174a82",
          100: "#d6e3f0",
          50: "#eef4fa",
        },
        // secondary accent — light amber
        amber: {
          DEFAULT: "#E7AE4B",
          dark: "#cf9530",
          text: "#5c3d00",
          100: "#f8e6bf",
          50: "#fdf6e8",
        },
        // warm concrete / sand neutrals
        sand: {
          DEFAULT: "#E3DACA",
          light: "#F1ECE3",
          dark: "#D3C8B2",
        },
        // retained for the logo
        maroon: {
          DEFAULT: "#651212",
          light: "#7a2020",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        // very subtle full-bleed blueprint wash
        "blueprint-grid":
          "repeating-linear-gradient(0deg, rgba(27,83,144,0.05) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(27,83,144,0.05) 0 1px, transparent 1px 40px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
