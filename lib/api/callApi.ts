import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { useSession } from "@/state/useSession";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL!;

if (!BACKEND_API) {
  throw new Error(
    "Please add the NEXT_PUBLIC_BACKEND_API variable to your .env file",
  );
}

const api: AxiosInstance = axios.create({
  baseURL: BACKEND_API,
  timeout: 60000, // Set timeout to 60 seconds
  withCredentials: true,
});

const handle401 = () => {
  // Add your logic here
  useSession.getState().clearSession();
};

interface ApiError {
  message: string;
  status: string | number;
  headers?: Record<string, unknown>;
}
const callApi = async <T>(
  endpoint: string,
  data?: Record<string, unknown>,
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
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);

      if (
        error.response.status === 401 &&
        (endpoint === "/login" || endpoint === "/signup")
      ) {
        console.log("unauthenticated");
        handle401();
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

export default callApi;
