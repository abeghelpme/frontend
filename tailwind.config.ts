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
			spacing: {
				0.3: "0.3rem",
				0.4: "0.4rem",
				0.8: "0.8rem",
				1: "1rem",
				1.2: "1.2rem",
				1.3: "1.3rem",
				1.4: "1.4rem",
				1.5: "1.5rem",
				1.6: "1.6rem",
				1.8: "1.8rem",
				1.9: "1.9rem",
				2: "2rem",
				2.2: "2.2rem",
				2.3: "2.3rem",
				2.4: "2.4rem",
				2.6: "2.6rem",
				2.8: "2.8rem",
				3: "3rem",
				3.2: "3.2rem",
				3.4: "3.4rem",
				4.8: "4.8rem",
				5.5: "5.5rem",
				6.2: "6.2rem",
				7: "7rem",
				10: "10rem",
				20: "20rem",
				21.3: "21.3rem",
				25: "25rem",
				32.4: "32.4rem",
				50.5: "50.5rem",
			},

			borderRadius: {
				6: "6px",
				8: "8px",
				10: "10px",
			},

			fontSize: {
				1: "1rem",
				1.2: "1.2rem",
				1.4: "1.4rem",
				1.6: "1.6rem",
				2: "2rem",
				2.4: "2.4rem",
				3.2: "3.2rem",
			},

			screens: {
				"3xl": "2000px",
			},

			backgroundImage: {
				contours: "url('/assets/images/shared/bg-contours.png')",
				"contours-old": "url('/assets/images/shared/contours-old.png')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			boxShadow: {
				"auth-layout-shadow": "0px 2px 32px 0px rgba(0, 0, 0, 0.08)",
			},

			colors: {
				text: "#1B1818",
				successText: "#484848",
				placeholder: "#8D8B8B",
				unfocused: "#A8CCCC",
				formBtn: "#008080",
				semiWhite: "#E6EAEE",
				validationMsg: "#268384",
				popover: "hsl(0 0% 100%)",
				"popover-foreground": "hsl(222.2 47.4% 11.2%)",
				accent: "hsl(210 40% 96.1%)",
				"accent-foreground": "hsl(222.2 47.4% 11.2%)",
				input: "hsl(214.3 31.8% 91.4%)",
				ring: "hsl(215 20.2% 65.1%)",
				muted: "hsl(210 40% 96.1%)",
				"muted-foreground": "hsl(215.4 16.3% 46.9%)",
				background: "hsl(0 0% 100%)",

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

			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				shake: {
					"0%, 100%": { transform: "translateX(0rem)" },
					"25%": { transform: "translateX(0.6rem)" },
					"75%": { transform: "translateX(-0.6rem)" },
				},
			},

			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shake: "shake 0.2s ease-in-out 0s 3",
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
