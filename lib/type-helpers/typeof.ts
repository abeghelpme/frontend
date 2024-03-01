export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isFormData = (value: unknown): value is FormData => value instanceof FormData;

export const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === "object" && value !== null && !isFormData(value) && !isArray(value);
};
