import type { ApiResponse, User } from "@/interfaces";
import { callApi } from "@/lib";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

interface Session {
	isFirstMount: boolean;
	loading: boolean;
	user: unknown;
	clearSession: () => void;
	updateUser: (data: User) => void;
	getSession: (isInitialLoad?: boolean) => Promise<void>;
}

const initialState = {
	loading: true,
	user: null,
	isFirstMount: false,
};

export const useSession = createWithEqualityFn<Session>(
	(set, get) => ({
		...initialState,
		getSession: async (isInitialLoad) => {
			if (isInitialLoad as boolean) {
				set({ isFirstMount: true });
			}
			const { data } = await callApi<ApiResponse>("/auth/session");
			set({
				...(data?.data && { user: data?.data }),
				loading: false,
			});
		},
		updateUser: (data: User) => set({ user: data }),
		clearSession: async () => {
			set((state) => ({
				...initialState,
				loading: false,
				isFirstMount: state.isFirstMount,
			}));

			await callApi("/auth/signout");

			const currentPageUrl = window.location.pathname;
			if (
				currentPageUrl !== "/signin" &&
				currentPageUrl !== "/signup" &&
				!get().isFirstMount
			) {
				window.location.replace("/signin?unauthorized=true");
			}
		},
	}),
	shallow
);
