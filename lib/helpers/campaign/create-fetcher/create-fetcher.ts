import { isObject } from "../../global-type-helpers";
import type {
	AbegErrorResponse,
	AbegSuccessResponse,
	BaseRequestConfig,
	CallApiParams,
	CallApiResult,
} from "./create-fetcher.types";
import { getResponseData } from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError>(
	baseConfig: BaseRequestConfig
) => {
	const {
		baseURL,
		timeout,
		defaultErrorMessage = "Failed to fetch success response from server!",
		onResponse,
		onResponseError,
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	// Overloads for better TypeScript DX
	async function callApi<TData = TBaseData, TError = TBaseError>(
		url: `/${string}`
	): CallApiResult<TData, TError>;

	async function callApi<TData = TBaseData, TError = TBaseError>(
		url: `/${string}`,
		bodyData: Record<string, unknown> | FormData
	): CallApiResult<TData, TError>;

	async function callApi<TData = TBaseData, TError = TBaseError>(
		url: `/${string}`,
		bodyData: Record<string, unknown> | FormData,
		signal: AbortSignal
	): CallApiResult<TData, TError>;

	// Implementation
	async function callApi<TData = TBaseData, TError = TBaseError>(
		...params: CallApiParams
	) {
		const [url, bodyData, signal] = params;

		const prevController = abortControllerStore.get(url);

		if (prevController) {
			prevController.abort();
		}

		const controller = new AbortController();
		abortControllerStore.set(url, controller);

		const timeoutId =
			typeof timeout === "number"
				? window.setTimeout(() => controller.abort(), timeout)
				: null;

		try {
			const response = await fetch(`${baseURL}${url}`, {
				signal: signal ?? controller.signal,
				method: bodyData ? "POST" : "GET",

				body: isObject(bodyData) ? JSON.stringify(bodyData) : bodyData,

				headers: isObject(bodyData)
					? {
							"content-type": "application/json",
							accept: "application/json",
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
			await onResponse?.(response);

			return {
				data: await getResponseData<AbegSuccessResponse<TData>>(response),
				error: null,
			};

			// Exhaustive error handling for request failures
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				// eslint-disable-next-line no-console
				console.info(
					`%cAbortError: Request to ${url} timed out after ${timeout}ms`,
					"color: red; font-weight: 500; font-size: 14px;"
				);

				return {
					data: null,
					error: {
						status: "Error",
						message: `Request timed out after ${timeout}ms`,
					},
				};
			}

			return {
				data: null,
				error: {
					status: "Error",
					message:
						(error as { message?: string }).message ?? defaultErrorMessage,
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
