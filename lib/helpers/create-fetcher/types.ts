import type { Prettify } from "@/lib/type-helpers";

// == Base Request Config

export type BaseFetchConfig<TData = unknown, TErrorData = unknown> = {
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
	onResponse?: (
		response: Response & { data: Prettify<AbegSuccessResponse<TData>> }
	) => void | Promise<void>;

	/**
	 * Intercept the response and perform some action when an http error occurs.
	 */
	onResponseError?: (
		response: Response & { errorData: Prettify<AbegErrorResponse<TErrorData>> }
	) => void | Promise<void>;
} & Pick<RequestInit, "headers" | "credentials">;

// == Wrapper for Success Response
export type AbegSuccessResponse<TData> = {
	status: "success";
	message: string;
	data: TData | null;
};

// == Wrapper for Error Response
export type AbegErrorResponse<TErrorData = unknown> = {
	status: "Error";
	message: string;
	error?: TErrorData;
};

// == Resolved callApi return type via discriminated unions
export type AbegApiResult<TData, TErrorData = unknown> =
	| {
			data: AbegSuccessResponse<TData>;
			error: null;
	  }
	| {
			data: null;
			error: AbegErrorResponse<TErrorData>;
	  };

// == Used to manually type the response params for the Response Interceptors, if you don't provide type argument for the createFetcher generic
type ResponseParam<TData, TErrorData> = Parameters<
	Required<BaseFetchConfig<TData, TErrorData>>["onResponseError"]
>[0];

export type ErrorResponseParam<TErrorData> = ResponseParam<unknown, TErrorData>;
export type SuccessResponseParam<TData> = ResponseParam<TData, unknown>;

export type AbortSignalWithAny = typeof AbortSignal & {
	any: (signalArray: AbortSignal[]) => AbortSignal;
};
