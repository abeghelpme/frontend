// Added this type guard to assert that envVariable is a string, as opposed unsafe typecasting via "as string"
const assertENV = (envVariable: string | undefined) => {
  if (typeof envVariable !== "string") {
    throw new Error("Environment variable must be a string");
  }

  return envVariable;
};

export { assertENV };
