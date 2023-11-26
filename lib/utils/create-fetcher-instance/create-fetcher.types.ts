export type BaseRequestConfig = Pick<RequestInit, "signal"> & {
  /**
   * The base URL of the endpoint used by the fetcher instance.
   */
  baseURL: string;

  /**
   * The base request timeout in milliseconds.
   */
  timeout?: number;

  /**
   * The default error message to display when response.ok resolves to false.
   */
  defaultErrorMessage?: string;

  /**
   * Intercept the response and modify the response or perform any other action before it is returned.
   */
  responseInterceptor?: (response: Response) => Promise<void> | void;
};

export type ControllerInstanceType = { current: AbortController | null };
