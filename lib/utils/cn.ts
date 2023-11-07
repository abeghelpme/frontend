import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));

export { cn };
