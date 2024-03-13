import { callApi } from "@/lib/helpers/campaign";
import { type StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "../store-types";
import { useInitCampaignStore } from "../useCampaign";
import { STEP_DATA_KEY_LOOKUP, initialFormState } from "./formStore.constants";
import type { FormStore } from "./formStore.types";

const stateObjectFn: StateCreator<FormStore> = (set, get) => ({
	...initialFormState,

	actions: {
		goToStep: (newStep) => {
			if (newStep < 1 || newStep > 3) return;

			set({ currentStep: newStep as FormStore["currentStep"] });
		},

		setCampaignInfo: (newInfo) => {
			const { campaignInfo: previousInfo } = get();

			set({
				campaignInfo: {
					...previousInfo,
					...newInfo,
					shortId: newInfo.url
						? newInfo.url.split(".me/")[1]
						: previousInfo.shortId,
				},
			});
		},

		setFormStatus: (newFormStatus) => {
			const { formStatus: previousFormStatus } = get();

			set({ formStatus: { ...previousFormStatus, ...newFormStatus } });
		},

		setData: ({ step, data: newData }) => {
			const dataKey = STEP_DATA_KEY_LOOKUP[step];

			const { [dataKey]: previousData } = get();

			set({ [dataKey]: { ...previousData, ...newData } });
		},

		initializeFormData: async (queryParam = "") => {
			const currentCampaign = useInitCampaignStore.getState().campaigns?.[0];

			if (!currentCampaign) {
				set({ currentStep: 1 });
				return;
			}
			console.log(currentCampaign);
			if (currentCampaign && currentCampaign.status === "Draft") {
				const { setData, setCampaignInfo } = get().actions;

				setCampaignInfo(currentCampaign);

				set({
					stepOneData: {
						categoryId: currentCampaign.category._id,
						country: currentCampaign.country,
						tags: currentCampaign.tags,
					},
					stepTwoData: {
						title: currentCampaign.title,
						deadline: currentCampaign.deadline,
						fundraiser: currentCampaign.fundraiser,
						goal: currentCampaign.goal,
					},
					stepThreeData: {
						story: currentCampaign.story,
						storyHtml: currentCampaign.storyHtml,
						photos: [],
					},
				});
			}
		},

		initializeCategories: async () => {
			const { data, error } = await callApi<
				FormStore["campaignInfo"]["categories"]
			>("/campaign/categories");

			if (error || !data.data) return;

			const { setCampaignInfo } = get().actions;

			setCampaignInfo({ categories: data.data });
		},
	} satisfies FormStore["actions"],
});

export const useInitFormStore = create<FormStore>()(
	devtools(stateObjectFn, { name: "formStore" })
);

export const useFormStore = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitFormStore(useShallow(selector));

	return state;
};
