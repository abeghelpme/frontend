export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isFormData = (value: unknown): value is FormData => value instanceof FormData;

export const isObject = (value: unknown): value is Record<string, unknown> => {
	const isRegularObject = typeof value === "object" && value !== null;

	return !isFormData(value) && !isArray(value) && isRegularObject;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// == `Any` is required here so that one can pass custom function type without type errors
export const isFunction = <TFunction extends (...args: any) => any>(
	value: unknown
): value is TFunction => {
	return typeof value === "function";
};
