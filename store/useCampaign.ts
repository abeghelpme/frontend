import type { Campaign } from "@/interfaces/Campaign";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type CampaignStore = {
	loading: boolean;
	campaigns: Campaign[];

	actions: {
		updateCampaign: (campaign: Campaign[]) => void;
	};
};

const initialState = {
	loading: true,
	campaigns: [],
};

export const useInitCampaignStore = create<CampaignStore>()((set, get) => ({
	...initialState,

	actions: {
		updateCampaign: (data) => set({ campaigns: data }),
	} satisfies CampaignStore["actions"],
}));

export const useCampaign = <TResult>(
	selector: SelectorFn<CampaignStore, TResult>
) => {
	const state = useInitCampaignStore(useShallow(selector));
	return state;
};
