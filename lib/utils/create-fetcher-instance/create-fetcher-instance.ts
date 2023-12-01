import type { BaseRequestConfig } from "./create-fetcher.types";
import { HTTPError } from "./create-fetcher.utils";

const createFetcherInstance = <TBaseResponseData>(
  baseConfig: BaseRequestConfig,
) => {
  const {
    baseURL,
    timeout = 5000,
    defaultErrorMessage = "Failed to fetch data from server!",
    responseInterceptor,
    errorInterceptor,
    ...restOfBaseConfig
  } = baseConfig;

  const abortControllerStore = new Map<`/${string}`, AbortController>();

  // Overloads for better TypeScript DX
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
    const previousController = abortControllerStore.get(url);

    if (previousController) {
      previousController.abort();
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeout);
    abortControllerStore.set(url, controller);

    try {
      const response = await fetch(`${baseURL}${url}`, {
        signal: controller.signal,
        method: bodyData ? "POST" : "GET",
        body: bodyData ? JSON.stringify(bodyData) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        ...restOfBaseConfig,
      });

      await responseInterceptor?.(response);

      const responseData = (await response.json()) as unknown;

      if (!response.ok && responseData != null) {
        throw responseData;
      }

      if (!response.ok) {
        throw new HTTPError(
          `
          ${defaultErrorMessage}
          Status Info: ${response.statusText},
          Status Code: ${response.status}
           `,
        );
      }

      return responseData as TResponseData;

      // Default error handling
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new DOMException(
          `Request to ${url} timed out after ${timeout}ms`,
          "AbortError",
        );
      }

      await errorInterceptor?.(error as Error);

      throw error;

      // Clean up the timeout and remove the now unneeded AbortController from store
    } finally {
      abortControllerStore.delete(url);
      window.clearTimeout(timeoutId);
    }
  }

  return callApi;
};

export { createFetcherInstance };
