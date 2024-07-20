import { isFormData, isObject } from "@/lib/type-helpers/typeof";
import type {
	AbegApiResult,
	AbegErrorResponse,
	AbegSuccessResponse,
	AbortSignalWithAny,
	BaseFetchConfig,
} from "./types";
import { getResponseData } from "./utils";

const createFetcher = <TBaseData, TBaseErrorData>(
	baseConfig: BaseFetchConfig<TBaseData, TBaseErrorData>
) => {
	const {
		baseURL,
		timeout,
		defaultErrorMessage = "Failed to fetch success response from server!",
		headers,
		onResponse,
		onResponseError,
		...restOfBaseConfig
	} = baseConfig as BaseFetchConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	const callApi = async <TData = TBaseData, TErrorData = TBaseErrorData>(
		url: `/${string}`,
		bodyData?: Record<string, unknown> | FormData,
		signal?: AbortSignal
	): Promise<AbegApiResult<TData, TErrorData>> => {
		const prevController = abortControllerStore.get(url);

		if (prevController) {
			const reason = new DOMException(
				`Automatic cancelation of the previous unfinished request to this same url: ${url}`,
				"AbortError"
			);
			prevController.abort(reason);
		}

		const fetchController = new AbortController();
		abortControllerStore.set(url, fetchController);

		const timeoutId = timeout
			? setTimeout(() => {
					const reason = new DOMException(`Request timed out after ${timeout}ms`, "TimeoutError");
					fetchController.abort(reason);
			  }, timeout)
			: null;

		// FIXME - Remove this type cast once TS updates its lib-dom types for AbortSignal, to include the new any() method
		const combinedSignal = (AbortSignal as AbortSignalWithAny).any([
			fetchController.signal,
			signal ?? fetchController.signal,
		]);

		try {
			const response = await fetch(`${baseURL}${url}`, {
				signal: combinedSignal,

				method: bodyData ? "POST" : "GET",

				body: isObject(bodyData) ? JSON.stringify(bodyData) : bodyData,

				// == If the body is an object, then we automatically set the Content-Type and Accept headers appropriately.
				// == If the body is FormData, then we automatically set the Content-Type header appropriately.
				headers: {
					...(isObject(bodyData) && {
						"Content-Type": "application/json",
						Accept: "application/json",
					}),
					...(isFormData(bodyData) && {
						"Content-Type": "multipart/form-data",
					}),
					...headers,
				},

				...restOfBaseConfig,
			});

			// == Response has http errors at this point
			if (!response.ok) {
				const errorResponse = await getResponseData<AbegErrorResponse<TErrorData>>(response.clone());

				await onResponseError?.(Object.assign(response.clone(), { errorData: errorResponse }));

				// == Data must be explicitly set to null here, to honor the callApi return type
				return {
					data: null,
					error: errorResponse,
				};
			}

			const successResponse = await getResponseData<AbegSuccessResponse<TData>>(response.clone());

			// == Response was successful, so await response interceptor and return the data
			await onResponse?.(Object.assign(response.clone(), { data: successResponse }));

			// == Error must be explicitly set to null here, to honor the callApi return type
			return {
				data: successResponse,
				error: null,
			};

			// == Exhaustive error handling for request failures
		} catch (error) {
			if (error instanceof DOMException && error.name === "TimeoutError") {
				console.info(
					`%c${error.name}: ${error.message}`,
					"color: red; font-weight: 500; font-size: 14px;"
				);
				console.trace(error.name);

				return {
					data: null,
					error: {
						status: "Error",
						message: error.message,
					},
				};
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				const message = `Request was aborted due to: ${error.message}`;

				console.info(`%${error.name}: ${message}`, "color: red; font-weight: 500; font-size: 14px;");
				console.trace(error.name);

				return {
					data: null,
					error: {
						status: "Error",
						message,
					},
				};
			}

			return {
				data: null,
				error: {
					status: "Error",
					message: (error as { message?: string }).message ?? defaultErrorMessage,
				},
			};

			// == Clean up the timeout and remove the now unneeded AbortController from the store
		} finally {
			abortControllerStore.delete(url);
			timeoutId && clearTimeout(timeoutId);
		}
	};

	// == Quick abort method if one gets too lazy to pass in a custom signal
	callApi.abort = (url: `/${string}`) => abortControllerStore.get(url)?.abort();

	return callApi;
};

export { createFetcher };
