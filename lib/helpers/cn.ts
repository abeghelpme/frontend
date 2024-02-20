import twConfig from "@/tailwind.config";
import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge, twMerge } from "tailwind-merge";

// const themeObject = twConfig.theme.extend;

// const customTwMerge = extendTailwindMerge({
// 	extend: {
// 		theme: {
// 			spacing: Object.keys(themeObject.spacing),
// 		},
// 	},
// });

const cn = (...classNames: ClassValue[]): string => twMerge(clsx(classNames));

export { cn };
