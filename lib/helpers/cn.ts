import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classNames: ClassValue[]): string => twMerge(clsx(classNames));

export { cn };
