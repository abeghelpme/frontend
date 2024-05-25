export const isArray = (value: unknown): value is unknown[] =>
	Array.isArray(value);

export const isFormData = (value: unknown): value is FormData =>
	value instanceof FormData;

export const isObject = (value: unknown): value is Record<string, unknown> => {
	const isArray = Array.isArray(value);
	const isFormData = value instanceof FormData;
	const isObject = typeof value === "object" && value !== null;

	return !isArray && !isFormData && isObject;
};
