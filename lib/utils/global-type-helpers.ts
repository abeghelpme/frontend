// Added this type guard to assert that envVariable is a string, as opposed unsafe typecasting via "as string"
export const assertENV = (
  variable: string | undefined,
  options?: { message: string },
) => {
  const { message = "Required Environment variable is missing or undefined" } =
    options ?? {};

  if (variable === undefined) {
    throw new Error(message);
  }

  return variable;
};

// typeof assertions
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
