export type BaseRequestConfig = Pick<RequestInit, "headers"> & {
  /**
   * The base URL of the endpoint used by the fetcher instance.
   */
  baseURL: string;

  /**
   * The default request timeout in milliseconds.
   */
  timeout?: number;

  /**
   * The default error message to display when response.ok resolves to false.
   */
  defaultErrorMessage?: string;

  /**
   * Intercept the response and perform some action before it is returned.
   */
  responseInterceptor?: (response: Response) => Promise<void> | void;

  /**
   * Intercept the error and perform some action before it is rethrown to the caller.
   */
  errorInterceptor?: (error: Error) => Promise<void> | void;
};
