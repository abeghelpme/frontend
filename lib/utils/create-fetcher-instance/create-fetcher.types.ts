export type BaseFetchConfig = RequestInit & {
  /**
   * The base URL of the endpoint used by the fetcher instance.
   */
  baseURL: string;

  /**
   * The request timeout in milliseconds.
   */
  timeout?: number;

  /**
   * The default error message to display when response.ok resolves to false.
   */
  defaultErrorMessage?: string;
};

export type FetchConfig = RequestInit & {
  /**
   * The request timeout in milliseconds.
   */
  timeout?: number;

  /**
   * Intercept the request and modify the requestConfig before it is sent .
   */
  requestInterceptor?: (
    requestConfig: RequestInit,
  ) => Promise<RequestInit> | RequestInit;

  /**
   * Intercept the response and modify the response or perform any other action before it is returned.
   */
  responseInterceptor?: (response: Response) => Promise<Response> | Response;
};
