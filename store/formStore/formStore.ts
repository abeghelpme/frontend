import { callApi } from "@/lib";
import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "../store-types";
import { STEP_DATA_KEY_LOOKUP, initialFormState } from "./formStore.constants";
import type { FormStore } from "./formStore.types";

const stateObjectFn: StateCreator<FormStore> = (set, get) => ({
	...initialFormState,

	actions: {
		goToStep: (newStep) => {
			if (newStep < 1 || newStep > 3) return;

			set({ currentStep: newStep as FormStore["currentStep"] });
		},

		setCampaignId: (campaignId) => set({ campaignId }),

		setFormStatus: (newFormStatus) => {
			const { formStatus: previousFormStatus } = get();

			set({ formStatus: { ...previousFormStatus, ...newFormStatus } });
		},

		setData: ({ step, data: newData }) => {
			const dataKey = STEP_DATA_KEY_LOOKUP[step];

			const { [dataKey]: previousData } = get();

			set({ [dataKey]: { ...previousData, ...newData } });
		},

		initializeFormData: async () => {
			const {} = await callApi("/campaign/create/one");
		},
	},
});

const useInitFormStore = create<FormStore>()(
	persist(devtools(stateObjectFn, { name: "formStore" }), {
		name: "campaignFormStore",
		partialize: ({ currentStep, campaignId }) => ({ currentStep, campaignId }),
	})
);

const useFormStore = <TResult>(selector: SelectorFn<FormStore, TResult>) => {
	const state = useInitFormStore(useShallow(selector));

	return state;
};

export { useFormStore };
