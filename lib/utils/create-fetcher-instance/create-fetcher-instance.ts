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
      requestInterceptor,
      responseInterceptor,
      ...restOfFetchConfig
    } = config;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeout);

    try {
      // prettier-ignore
      const modifiedFetchConfig = (await requestInterceptor?.(restOfFetchConfig)) ?? restOfFetchConfig;

      const originalResponse = await fetch(`${baseURL}${url}`, {
        signal: controller.signal,
        ...restOfBaseConfig,
        ...modifiedFetchConfig,
      });

      window.clearTimeout(timeoutId);

      // prettier-ignore
      const modifiedResponse = (await responseInterceptor?.(originalResponse)) ?? originalResponse;

      if (!modifiedResponse.ok) {
        throw new Error(
          `${defaultErrorMessage}! Status Info: ${modifiedResponse.statusText}, Status Code: ${modifiedResponse.status}`,
        );
      }

      return modifiedResponse.json() as TResponseData;

      // Default error handling
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`Request to ${url} timed out after ${timeout}ms`);
      }

      // REVIEW - may need better error handling
      // Just rethrows the error if it's not an instance of DOMException
      throw error;
    }
  };

  return fetcherInstance;
};

export { createFetcherInstance };
