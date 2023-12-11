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
    timeout = 5000,
    defaultErrorMessage = "Failed to fetch success response from server!",
    responseInterceptor,
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
  ): Promise<AbegResponseData<TData, TError>> {
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

      if (!response.ok) {
        return {
          dataInfo: null,
          errorInfo: await getResponseData<AbegErrorResponse<TError>>(response),
        };
      }

      return {
        dataInfo: await getResponseData<AbegSuccessResponse<TData>>(response),
        errorInfo: null,
      };

      // Exhaustive error handling
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        process.env.NODE_ENV === "development" &&
          console.error(
            "AbortError",
            `Request to ${url} timed out after ${timeout}ms`,
          );

        return {
          dataInfo: null,
          errorInfo: {
            status: "Error",
            message: `Request to ${url} timed out after ${timeout}ms`,
          },
        };
      }

      return {
        dataInfo: null,
        errorInfo: {
          status: "Error",
          message:
            (error as SyntaxError | TypeError | Error).message ??
            defaultErrorMessage,
        },
      };

      // Clean up the timeout and remove the now unneeded AbortController from store
    } finally {
      abortControllerStore.delete(url);
      window.clearTimeout(timeoutId);
    }
  }

  return callApi;
};

export { createFetcher };
