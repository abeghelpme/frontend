import { createFetcherInstance } from "./create-fetcher-instance/create-fetcher-instance";
import { assertENV } from "./global-type-helpers";

const fetcher = createFetcherInstance({
  baseURL: assertENV(process.env.NEXT_PUBLIC_BACKEND_URL),
});

export { fetcher };
