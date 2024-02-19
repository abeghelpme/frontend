import twConfig from "@/tailwind.config";
import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const themeObject = twConfig.theme.extend;

const customTwMerge = extendTailwindMerge({
	extend: {
		theme: {
			spacing: Object.keys(themeObject.spacing),
		},
	},
});

const cn = (...classNames: ClassValue[]): string =>
	customTwMerge(clsx(classNames));

export { cn };
