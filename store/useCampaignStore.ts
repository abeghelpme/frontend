import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type CampaignStore = {
	loading: boolean;
	campaigns: Campaign[];
	categories: Array<{ _id: string; name: string }>;

	actions: {
		updateCampaign: (updatedCampaigns: Campaign[]) => void;
		initializeCategories: () => Promise<void>;
	};
};

const initialState = {
	loading: true,
	campaigns: [],
	categories: [],
} satisfies Omit<CampaignStore, "actions">;

export const useInitCampaignStore = create<CampaignStore>()((set) => ({
	...initialState,

	actions: {
		updateCampaign: (updatedCampaigns) => set({ campaigns: updatedCampaigns }),

		initializeCategories: async () => {
			const { data, error } = await callApi<CampaignStore["categories"]>(
				"/campaign/categories"
			);

			if (error || !data.data) return;

			set({ categories: data.data });
		},
	} satisfies CampaignStore["actions"],
}));

void useInitCampaignStore.getState().actions.initializeCategories();

export const useCampaignStore = <TResult>(
	selector: SelectorFn<CampaignStore, TResult>
) => {
	const state = useInitCampaignStore(useShallow(selector));

	return state;
};
