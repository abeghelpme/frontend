import type {
  AbegErrorResponse,
  AbegResponseData,
  AbegSuccessResponse,
  BaseRequestConfig,
} from "./create-fetcher.types";
import { getResponseData } from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError>(
  baseConfig: BaseRequestConfig,
) => {
  const {
    baseURL,
    timeout,
    defaultErrorMessage = "Failed to fetch success response from server!",
    onResponseSuccess,
    onResponseError,
    ...restOfBaseConfig
  } = baseConfig;

  const abortControllerStore = new Map<`/${string}`, AbortController>();

  // Overloads for better TypeScript DX
  async function callApi<TData = TBaseData, TError = TBaseError>(
    url: `/${string}`,
  ): Promise<AbegResponseData<TData, TError>>;

  async function callApi<TData = TBaseData, TError = TBaseError>(
    url: `/${string}`,
    bodyData: Record<string, unknown>,
  ): Promise<AbegResponseData<TData, TError>>;

  // Implementation
  async function callApi<TData = TBaseData, TError = TBaseError>(
    url: `/${string}`,
    bodyData?: Record<string, unknown>,
  ) {
    const previousController = abortControllerStore.get(url);

    if (previousController) {
      previousController.abort();
    }

    const newController = new AbortController();

    abortControllerStore.set(url, newController);

    const timeoutId =
      typeof timeout === "number"
        ? window.setTimeout(() => newController.abort(), timeout)
        : null;

    try {
      const response = await fetch(`${baseURL}${url}`, {
        signal: newController.signal,
        method: bodyData ? "POST" : "GET",
        body: bodyData ? JSON.stringify(bodyData) : undefined,

        headers: bodyData
          ? {
              "Content-Type": "application/json",
              Accept: "application/json",
            }
          : undefined,

        ...restOfBaseConfig,
      });

      // Response has http errors
      if (!response.ok) {
        await onResponseError?.(response);

        return {
          data: null,
          error: await getResponseData<AbegErrorResponse<TError>>(response),
        };
      }

      // Response was successful
      await onResponseSuccess?.(response);

      return {
        data: await getResponseData<AbegSuccessResponse<TData>>(response),
        error: null,
      };

      // Exhaustive error handling
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        process.env.NODE_ENV === "development" &&
          console.log(
            "AbortError",
            `Request to ${url} got cancelled after ${timeout}ms`,
          );

        return {
          data: null,
          error: {
            status: "Error",
            message: `Request to ${url} timed out after ${timeout}ms`,
          },
        };
      }

      if (error instanceof SyntaxError || error instanceof TypeError) {
        process.env.NODE_ENV === "development" &&
          console.log(
            "SyntaxError",
            `Failed to parse response from ${url} due to ${error.message}`,
          );
      }

      return {
        data: null,
        error: {
          status: "Error",
          message: (error as Error).message ?? defaultErrorMessage,
        },
      };

      // Clean up the timeout and remove the now unneeded AbortController from store
    } finally {
      abortControllerStore.delete(url);
      timeoutId !== null && window.clearTimeout(timeoutId);
    }
  }

  return callApi;
};

export { createFetcher };
