export type BaseFetchConfig = RequestInit & {
  baseURL: string;
  timeout?: number;
  defaultErrorMessage?: string;
};

export type FetchConfig = RequestInit & {
  timeout?: number;

  requestInterceptor?: (
    requestConfig: RequestInit,
  ) => Promise<RequestInit> | RequestInit;

  responseInterceptor?: (
    response: Response,
  ) => Promise<Response | void> | Response | void;
};
