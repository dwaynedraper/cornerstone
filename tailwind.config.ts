import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a2332",
          50: "#f0f2f5",
          100: "#d4d9e2",
          200: "#a9b3c5",
          300: "#7e8da8",
          400: "#53678b",
          500: "#2d3f5e",
          600: "#1a2332",
          700: "#141b27",
          800: "#0e131c",
          900: "#080b11",
        },
        gold: {
          DEFAULT: "#c8913a",
          50: "#fdf8f0",
          100: "#f9edd6",
          200: "#f0d5a3",
          300: "#e4b96a",
          400: "#d4a24e",
          500: "#c8913a",
          600: "#b07e2e",
          700: "#8f6624",
          800: "#6e4f1c",
          900: "#4d3714",
        },
        heritage: {
          DEFAULT: "#651212",
          light: "#7a2020",
          dark: "#4d0e0e",
        },
        surface: {
          DEFAULT: "#f7f5f0",
          warm: "#faf8f4",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
});
export default config;
