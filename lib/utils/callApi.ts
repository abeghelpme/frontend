import { createFetcherInstance } from "./create-fetcher-instance";
import { assertENV } from "./global-type-helpers";

const callApi = createFetcherInstance({
  baseURL: assertENV(process.env.NEXT_PUBLIC_BACKEND_URL),

  responseInterceptor: (response) => {
    // NOTE - remember to handle this error properly, as well as other possible errors

    if (response.status === 401) {
      window.location.replace("/login?unauthenticated=true");
    }
  },
});

export { callApi };
