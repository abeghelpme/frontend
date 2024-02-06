import clsx, {type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...classNames: ClassValue[]): string =>
	twMerge(clsx(classNames))
