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
};

export type AbegErrorResponse<TError = Record<string, unknown>> = {
  status: "Error";
  error?: TError;
  message: string;
};
export type AbegSuccessResponse<TData> = {
  status: "Success";
  data: TData | null;
  message: string;
};

export type AbegResponseData<TData, TError = Record<string, unknown>> =
  | {
      data: AbegSuccessResponse<TData>;
      error: null;
    }
  | {
      data: null;
      error: AbegErrorResponse<TError>;
    };
