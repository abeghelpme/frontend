import type { BaseFetchConfig, FetchConfig } from "./create-fetcher.types";

const createFetcherInstance = (baseConfig: BaseFetchConfig) => {
  const {
    baseURL,
    timeout: baseTimeout = 10000,
    ...restOfBaseConfig
  } = baseConfig;

  const fetcherInstance = async <TResponseData>(
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
      const modifiedFetchConfig = await requestInterceptor(restOfFetchConfig);

      const originalResponse = await fetch(`${baseURL}${url}`, {
        signal: controller.signal,
        ...restOfBaseConfig,
        ...(modifiedFetchConfig ?? restOfFetchConfig),
      });

      window.clearTimeout(timeoutId);

      // prettier-ignore
      const modifiedResponse = (await responseInterceptor(originalResponse)) ?? originalResponse;

      if (!modifiedResponse.ok) {
        throw new Error(
          `
			 Failed to fetch data from server!
			 Status Info: ${modifiedResponse.statusText}, Status Code: ${modifiedResponse.status}
			 `,
        );
      }

      return modifiedResponse.json() as TResponseData;

      // Error handling
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`Request to ${url} timed out after ${timeout}ms`);
      }

      if (error instanceof SyntaxError) {
        throw error;
      }

      console.error("Something went wrong: ", error); // REVIEW - may need better error handling
    }
  };

  return fetcherInstance;
};

export { createFetcherInstance };
