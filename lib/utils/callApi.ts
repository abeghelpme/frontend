import { createFetcher } from "./create-fetcher";
import { assertENV } from "./global-type-helpers";

const callApi = createFetcher({
  baseURL: assertENV(process.env.NEXT_PUBLIC_BACKEND_URL),

  responseInterceptor: (response) => {
    // NOTE - remember to handle this error properly, as well as other possible errors
    // handle email not verified here
    if (response.status === 401) {
      // window.location.replace("/signin?unauthenticated=true");
    }
  },
});

export { callApi };
