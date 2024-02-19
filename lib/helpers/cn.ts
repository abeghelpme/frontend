import twConfig from "@/tailwind.config";
import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge, twMerge } from "tailwind-merge";

const themeObject = twConfig.theme.extend;

// const customTwMerge = extendTailwindMerge({
// 	extend: {
// 		classGroups: {
// 			"font-size": Object.keys(themeObject.fontSize).map(
// 				(key) => `text-${key}`
// 			),

// 			rounded: Object.keys(themeObject.borderRadius).map(
// 				(key) => `rounded-${key}`
// 			),
// 		},
// 	},
// });

const cn = (...classNames: ClassValue[]): string => twMerge(clsx(classNames));

export { cn };
