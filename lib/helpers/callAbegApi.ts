import { assertENV } from "@/lib/type-helpers/assert";
import { useInitSession } from "@/store/useSession";
import Router from "next/router";
import { toast } from "sonner";
import { type ErrorResponseParam, createFetcher } from "./create-fetcher";

const BACKEND_API = assertENV(process.env.NEXT_PUBLIC_BACKEND_URL, {
	message: "Please add the NEXT_PUBLIC_BACKEND_API variable to your .env file",
});

const callAbegApi = createFetcher({
	baseURL: BACKEND_API,
	timeout: 60000, // Set timeout to 60 seconds
	credentials: "include",

	headers: {
		"x-referer": process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.abeghelp.me",
	},

	onResponseError: (response: ErrorResponseParam<{ type?: string; email?: string }>) => {
		if (response.status === 401) {
			useInitSession.getState().actions.clearSession();
		}

		if (response.status === 429) {
			toast.error("Too many requests!", {
				description: response.errorData.message,
			});
		}

		if (response.status === 403 && response.errorData.message === "2FA verification is required") {
			toast.error(response.errorData.message, {
				description: "Please authenticate to continue",
			});

			void Router.push({
				pathname: "/2fa/authenticate",
				query: {
					type: response.errorData.error?.type,
					email: response.errorData.error?.email,
				},
			});
		}

		if (response.status === 500) {
			toast.error("Internal server Error!", {
				description: response.errorData.message,
			});

			void Router.push("/500");
		}
	},
});

export { callAbegApi };
