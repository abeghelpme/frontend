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
				// PADDING (X & Y)
				DSignupFormPadding: "3rem",
				MSignupFormPadding: "1.5rem 1rem",
				DSigninFormPadding: "1.5rem 3rem",
				MSigninFormPadding: "1rem",
				DFPwrdPadding: "1.5rem",
				MFPwrdPadding: "1rem",
				DSuccessPadding: "1.5rem",
				MSuccessPadding: "1rem",
				MLogoBannerPadding: "0.25rem",
				DLogoBannerPadding: "1rem",
				// GAP (X & Y)
				DSignupFormGap: "1.5rem",
				MSignupFormGap: "1rem",
				SuccessGap: "1.5rem",

				// Padding, margins and gap sizes
				"@0.3": "0.1875rem",
				"@0.4": "0.25rem",
				"@0.8": "0.5rem",
				"@1": "0.625rem",
				"@1.2": "0.75rem",
				"@1.3": "0.8125rem",
				"@1.4": "0.875rem",
				"@1.5": "0.9375rem",
				"@1.6": "1rem",
				"@1.8": "1.125rem",
				"@1.9": "1.1875rem",
				"@2": "1.25rem",
				"@2.2": "1.375rem",
				"@2.3": "1.4375rem",
				"@2.4": "1.5rem",
				"@2.6": "1.625rem",
				"@2.8": "1.75rem",
				"@3": "1.875rem",
				"@3.2": "2rem",
				"@3.4": "2.125rem",
				"@4": "2.5rem",
				"@4.8": "3rem",
				"@5.5": "3.4375rem",
				"@6.2": "3.875rem",
				"@7": "4.375rem",
				"@10": "6.25rem",

				// Heights
				"@20": "12.5rem",
				"@21.3": "13.3125rem",
				"@25": "15.625rem",
				"@32.4": "20.25rem",
				"@50.5": "31.5625rem",
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

			height: {
				"23": "6rem",
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
