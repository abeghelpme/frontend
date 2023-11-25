import type { BaseFetchConfig, FetchConfig } from "./create-fetcher.types";

const createFetcherInstance = <TBaseResponseData>(
  baseConfig: BaseFetchConfig,
) => {
  const {
    baseURL,
    timeout: baseTimeout = 10000,
    defaultErrorMessage = "Failed to fetch data from server",
    ...restOfBaseConfig
  } = baseConfig;

  const fetcherInstance = async <TResponseData = TBaseResponseData>(
    url: `/${string}`,
    config: FetchConfig = {},
  ) => {
    const {
      timeout = baseTimeout,
      requestInterceptor = (requestConfig: RequestInit) => requestConfig,
      responseInterceptor = (response: Response) => response,
      ...restOfFetchConfig
    } = config;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeout);

    try {
      const modifiedFetchConfig =
        (await requestInterceptor(restOfFetchConfig)) ?? restOfFetchConfig;

      const originalResponse = await fetch(`${baseURL}${url}`, {
        signal: controller.signal,
        ...restOfBaseConfig,
        ...modifiedFetchConfig,
      });

      window.clearTimeout(timeoutId);

      // prettier-ignore
      const modifiedResponse = (await responseInterceptor(originalResponse)) ?? originalResponse;

      if (!modifiedResponse.ok) {
        throw new Error(
          `${defaultErrorMessage}! Status Info: ${modifiedResponse.statusText}, Status Code: ${modifiedResponse.status}`,
        );
      }

      return modifiedResponse.json() as TResponseData;

      // Default Error handling, rethrows common errors to be handled by caller
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`Request to ${url} timed out after ${timeout}ms`);
      }

      if (error instanceof Error) {
        throw error;
      } // REVIEW - may need better error handling
    }
  };

  return fetcherInstance;
};

export { createFetcherInstance };
