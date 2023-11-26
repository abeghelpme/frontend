import type {
  BaseRequestConfig,
  ControllerStoreType,
} from "./create-fetcher.types";
import { HTTPError } from "./create-fetcher.utils";

const createFetcherInstance = <TBaseResponseData>(
  baseConfig: BaseRequestConfig,
) => {
  const {
    baseURL,
    timeout = 5000,
    defaultErrorMessage = "Failed to fetch data from server!",
    responseInterceptor,
    ...restOfBaseConfig
  } = baseConfig;

  const controllerStore: ControllerStoreType = { current: null };

  // Added overloads for better TypeScript DX
  async function callApi<TResponseData = TBaseResponseData>(
    url: `/${string}`,
  ): Promise<TResponseData>;

  async function callApi<TResponseData = TBaseResponseData>(
    url: `/${string}`,
    bodyData: Record<string, unknown>,
  ): Promise<TResponseData>;

  async function callApi<TResponseData = TBaseResponseData>(
    url: `/${string}`,
    bodyData?: Record<string, unknown>,
  ) {
    if (controllerStore.current) {
      controllerStore.current.abort();
    }

    controllerStore.current = new AbortController();
    const timeoutId = window.setTimeout(
      () => controllerStore.current?.abort(),
      timeout,
    );

    try {
      const response = await fetch(`${baseURL}${url}`, {
        signal: controllerStore.current.signal,
        body: bodyData ? JSON.stringify(bodyData) : undefined,
        credentials: "include",
        ...restOfBaseConfig,
      });

      await responseInterceptor?.(response);

      if (!response.ok) {
        throw new HTTPError(
          `
          ${defaultErrorMessage}
          Status Info: ${response.statusText},
          Status Code: ${response.status}
           `,
        );
      }

      return response.json() as TResponseData;

      // Default error handling
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new DOMException(
          `Request to ${url} timed out after ${timeout}ms`,
          "AbortError",
        );
      }

      throw error;

      // Clean up the timeout
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return callApi;
};

export { createFetcherInstance };
