import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		extend: {
			screens: {
				"3xl": "2000px",
			},
			backgroundImage: {
				contours: "url('/assets/images/shared/bg-contours.png')",
				authBg: "url('/assets/images/auth/auth-bg-jar.svg')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			boxShadow: {
				"auth-layout-shadow": " 0px 2px 32px 0px rgba(0, 0, 0, 0.08)",
				otpInput: "2px 4px 4px 0 rgba(139, 210, 189, 0.1)",
			},
			colors: {
				overlay: "rgba(72, 72, 72, 0.5)",
				placeholder: "#8D8B8B",
				unfocused: "#A8CCCC",
				semiWhite: "#E6EAEE",
				inputBorder: "rgba(124, 148, 107, 0.25)",
				otpBorder: "rgba(0, 128, 128, 0.5)",
				abeg: {
					primary: "#008080",
					text: "#484848",
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
				// Shadcn colors
				popover: "hsl(0 0% 100%)",
				"popover-foreground": "hsl(222.2 47.4% 11.2%)",
				accent: "hsl(210 40% 96.1%)",
				"accent-foreground": "hsl(222.2 47.4% 11.2%)",
				input: "hsl(214.3 31.8% 91.4%)",
				ring: "hsl(215 20.2% 65.1%)",
				muted: "hsl(210 40% 96.1%)",
				"muted-foreground": "hsl(215.4 16.3% 46.9%)",
				background: "hsl(0 0% 100%)",
			},

			height: {
				"23": "6rem",
				DInputField: "3.13rem",
				MInputField: "2.9rem",
			},
			width: {
				w90: "90%",
			},
			maxWidth: {
				wSignUpForm: "52.9rem",
				wAuthFlow: "32rem",
				wSuccess: "29.2rem",
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

	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		plugin(function ({ addVariant, addComponents, theme }) {
			addVariant("progress-unfilled", ["&::-webkit-progress-bar", "&"]);
			addVariant("progress-filled", [
				"&::-webkit-progress-value",
				"&::-moz-progress-bar",
				"&",
			]);

			addComponents({
				".custom-scrollbar": {
					"&::-webkit-scrollbar": {
						width: "1rem",
					},

					"&::-webkit-scrollbar-track": {
						backgroundColor: "hsl(0, 0%, 76%)",
						borderRadius: "1rem 1rem 0 0",
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: theme("colors.formBtn"),
						border: "1px solid hsl(0, 0%, 76%)",
						borderRadius: "1rem",
					},
				},
			});
		}),
	],
} satisfies Config;

export default config;
