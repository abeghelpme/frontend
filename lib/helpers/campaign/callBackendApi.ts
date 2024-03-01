import { useSession } from "@/store";
import { toast } from "sonner";
import { assertENV } from "../../type-helpers/assert";
import { createFetcher } from "./create-fetcher";

const BACKEND_API = assertENV(process.env.NEXT_PUBLIC_BACKEND_URL, {
	message: "Please add the NEXT_PUBLIC_BACKEND_API variable to your .env file",
});

const callBackendApi = createFetcher({
	baseURL: BACKEND_API,
	timeout: 60000, // Set timeout to 60 seconds
	credentials: "include",

	onResponseError: (response) => {
		if (response.status === 401) {
			useSession.getState().clearSession();
		}

		if (response.status === 429) {
			toast.error("Too may requests!", {
				description: response.message,
			});
		}
	},
});

export { callBackendApi };
