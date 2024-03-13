import type { Campaign } from "@/interfaces/Campaign";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";
import { useInitCampaignForm } from "./useCampaignForm";

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
		updateCampaign: (data) => {
			// initialize form with draft data if necessary
			data?.[0]?.status === "Draft" &&
				useInitCampaignForm.getState().actions.updateInitialValues(data[0]);

			// update all campaigns
			set({ campaigns: data });
		},
	} satisfies CampaignStore["actions"],
}));

export const useCampaign = <TResult>(
	selector: SelectorFn<CampaignStore, TResult>
) => {
	const state = useInitCampaignStore(useShallow(selector));
	return state;
};
