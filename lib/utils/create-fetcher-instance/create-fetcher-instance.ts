import type {
  BaseRequestConfig,
  ControllerInstanceType,
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

  const previousController: ControllerInstanceType = { current: null };

  // Added overloads for better TypeScript DX
  async function callApi<TResponseData = TBaseResponseData>(
    url: `/${string}`,
  ): Promise<TResponseData>;

  async function callApi<TResponseData = TBaseResponseData>(
    url: `/${string}`,
    method: "POST",
    bodyData: Record<string, unknown>,
  ): Promise<TResponseData>;

  async function callApi<TResponseData = TBaseResponseData>(
    url: `/${string}`,
    method?: "POST",
    bodyData?: Record<string, unknown>,
  ) {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    previousController.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${baseURL}${url}`, {
        signal: controller.signal,
        method,
        body: method === "POST" ? JSON.stringify(bodyData) : undefined,
        credentials: "include",
        ...restOfBaseConfig,
      });

      window.clearTimeout(timeoutId);

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
    }
  }

  return callApi;
};

export { createFetcherInstance };
