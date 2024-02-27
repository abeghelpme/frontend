// Wrapper for Success Response
export type AbegSuccessResponse<TDataResponse> = {
	status: "success";
	message: string;
	data: TDataResponse | null;
};

// Wrapper for Error Response
export type AbegErrorResponse<TErrorResponse = Record<string, unknown>> = {
	status: "Error";
	message: string;
	error?: TErrorResponse;
};

// Resolved Resoponse Details
type AbegResponseDetails<TData, TError = Record<string, string[]>> =
	| {
			data: AbegSuccessResponse<TData>;
			error: null;
	  }
	| {
			data: null;
			error: AbegErrorResponse<TError>;
	  };

export type BaseRequestConfig = Pick<RequestInit, "headers" | "credentials"> & {
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
	onResponse?: (responseObj: Response) => Promise<void> | void;

	/**
	 * Intercept the response and perform some action when an http error occurs.
	 */
	onResponseError?: (
		responseObj: Response & { message: AbegErrorResponse["message"] }
	) => Promise<void> | void;
};

export type CallApiParams =
	| [url: `/${string}`]
	| [url: `/${string}`, bodyData: Record<string, unknown> | FormData]
	| [
			url: `/${string}`,
			bodyData: Record<string, unknown> | FormData,
			signal: AbortSignal,
	  ];

// CallApi function return type (Response details Object wrapped in a promise)
export type CallApiResult<TData, TError = Record<string, string[]>> = Promise<
	AbegResponseDetails<TData, TError>
>;
