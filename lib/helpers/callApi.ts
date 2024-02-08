import { useSession } from "@/store";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { assertENV } from "./global-type-helpers";

const BACKEND_API = assertENV(process.env.NEXT_PUBLIC_BACKEND_URL, {
	message: "Please add the NEXT_PUBLIC_BACKEND_API variable to your .env file",
});

const api: AxiosInstance = axios.create({
	baseURL: BACKEND_API,
	timeout: 60000, // Set timeout to 60 seconds
	withCredentials: true,
});

interface ApiError {
	message: string;
	status: string | number;
	headers?: Record<string, unknown>;
}
export const callApi = async <T>(
	endpoint: `/${string}`,
	data?: Record<string, unknown> | FormData
): Promise<{ data?: T; error?: ApiError }> => {
	const source = axios.CancelToken.source();
	const method = data ? "POST" : "GET";

	try {
		const response: AxiosResponse<T> = await api.request<T>({
			url: endpoint,
			method,
			...(data && { data }),
			cancelToken: source.token,
		});
		return { data: response.data };
	} catch (error) {
		let apiError: ApiError | undefined;

		if (axios.isCancel(error)) {
			console.log("Request canceled", error.message);
		}

		if (axios.isAxiosError(error) && error.response) {
			apiError = error.response.data as ApiError;
			// avoid handling errors on the signin and signup pages

			if (error.response.status === 401) {
				useSession.getState().clearSession();
			}
		} else {
			if (error instanceof Error) {
				apiError = {
					message: error.message,
					status: "Error",
				};
			}
		}
		return { error: apiError };
	}
};
