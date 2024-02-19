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
				DAuthFlowPadding: "1.5rem",
				DOverlayPadding: "2rem 1.5rem",
				MOverlayPadding: "1.5rem",
				MAuthFlowPadding: "1rem",
				DOtpContainerPadding: "2.5rem 3.13rem",
				MOtpContainerPadding: "1.5rem 1rem",
				MLogoBannerPadding: "0.25rem",
				DLogoBannerPadding: "1rem",
				DBtnPadding: "1rem 1.5rem",
				MBtnPadding: "0.75rem 1rem",
				DInputPadding: "1rem",
				MInputPadding: "1rem 0.5rem",
				// GAP (X & Y)
				DSignupFormGap: "1.5rem",
				MSignupFormGap: "1rem",
				AuthFlowGap: "1.5rem",
			},
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
				otpInput: "2px 4px 4px 0 rgba(139, 210, 189, 0.1)",
			},

			colors: {
				overlay: "rgba(72, 72, 72, 0.5)",
				abeg: {
					primary: "#008080",
					text: "#484848",
					formLabel: "#1B1818",
					inputBorder: "rgba(124, 148, 107, 0.25)",
					otpBorder: "rgba(0, 128, 128, 0.5)",

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
				DInputField: "3.13rem",
				MInputField: "2.9rem",
			},
			width: {
				w80: "80%",
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
