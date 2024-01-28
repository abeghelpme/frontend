import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
      },
      backgroundImage: {
        contours: "url('/assets/images/shared/bg-contours.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "auth-layout-shadow": " 0px 2px 32px 0px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        text: "#1B1818",
        successText: "#484848",
        formBtn: "#008080",
        validationMsg: "#268384",
        abeg: {
          button: {
            10: "#1C8384",
            20: "#005E5F",
          },
          teal: {
            DEFAULT: "#268384",
            10: "#2B908E",
          },
          green: {
            DEFAULT: "#324823",
            20: "#7C946B",
            30: "#C9DDBB",
            40: "#F4FAF0",
            50: "#007004",
            60: "#006004",
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
      height: {
        '23': '6rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    {
      pattern: /text-(sm|base|lg|xl|2xl)/,
    },
  ],
  plugins: [
    require("tailwindcss-animate"),
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
