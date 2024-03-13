import type { Campaign } from "@/interfaces/Campaign";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type FormStore = {
	values: Partial<Campaign>;

	actions: {
		updateValues: (data: Partial<Campaign>) => void;
	};
};

const initialState = {
	values: {} as Partial<Campaign>,
};

export const useInitCampaignForm = create<FormStore>()((set, get) => ({
	...initialState,

	actions: {
		updateValues: (data) => set({ values: { ...data, ...get().values } }),
	} satisfies FormStore["actions"],
}));

export const useCampaignForm = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitCampaignForm(useShallow(selector));
	return state;
};
