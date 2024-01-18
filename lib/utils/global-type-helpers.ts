// Added this type guard to assert that envVariable is a string, as opposed unsafe typecasting via "as string"
export const assertENV = (
  envVariable: string | undefined,
  options?: { message: string },
) => {
  if (typeof envVariable !== "string") {
    throw new Error(
      options?.message ?? "Environment variable must be a string",
    );
  }

  return envVariable;
};

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

export const isFormData = (value: unknown): value is FormData =>
  value instanceof FormData;

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !isFormData(value) &&
    !isArray(value)
  );
};
