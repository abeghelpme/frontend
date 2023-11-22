import { createFetcherInstance } from "./createFetcherInstance";

// Added this type guard to assert that baseURL is a string, as opposed unsafe typecasting via "as string"
const assertBaseURL = (baseURL: string | undefined) => {
  if (typeof baseURL !== "string") {
    throw new Error("baseURL must be a string");
  }

  return baseURL;
};

const fetcherFn = createFetcherInstance({
  baseURL: assertBaseURL(process.env.NEXT_PUBLIC_BACKEND_URL),
});

export { fetcherFn };
