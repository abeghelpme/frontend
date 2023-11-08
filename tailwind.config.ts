import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        abeg: {
          green: {
            DEFAULT: "#324823",
            20: "#7C946B",
            30: "#C9DDBB",
            40: "#F4FAF0",
          },
          neutral: {
            10: "#101E14",
            20: "#344639",
            30: "#4E5F53",
            40: "#748178",
            50: "#A1AAA4",
            60: "#CDD6D0",
            70: "#E3E8E5",
            80: "#F4F5F5",
          },
          error: {
            10: "#6A0101",
            20: "#FC3131",
            30: "#FEDCDC",
            40: "#FFEBEB",
          },
        },
      },
    },
  },
  safelist: [
    {
      pattern: /text-(sm|base|lg|xl|2xl)/,
    },
  ],
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("progress-unfilled", ["&::-webkit-progress-bar", "&"]);
      addVariant("progress-filled", [
        "&::-webkit-progress-value",
        "&::-moz-progress-bar",
        "&",
      ]);
    }),
  ],
};
export default config;
