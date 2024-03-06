import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "../store-types";
import { STEP_DATA_KEY_LOOKUP, initialFormState } from "./formStore.constants";
import type { FormStore } from "./formStore.types";

const stateObjectFn: StateCreator<FormStore> = (set, get) =>
	({
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

			initializeFormData: async (userId, queryParam = "limit=1") => {
				const { data, error } = await callApi<Campaign[]>(
					`/campaign/user/${userId}?${queryParam}&status=Draft`
				);

				if (error) return;

				if (!data.data) return;

				const { setData, setCampaignInfo } = get().actions;

				if (data.data.length === 0) {
					set({ currentStep: 1 });
					return;
				}

				const campaign = data.data[0];

				setCampaignInfo(campaign);

				setData({
					step: 1,
					data: {
						categoryId: campaign.category._id,
						country: campaign.country,
						tags: campaign.tags,
					},
				});

				setData({
					step: 2,
					data: {
						title: campaign.title,
						deadline: campaign.deadline,
						fundraiser: campaign.fundraiser,
						goal: campaign.goal,
					},
				});

				setData({
					step: 3,
					data: {
						story: campaign.story,
						storyHtml: campaign.storyHtml,
					},
				});
			},

			initializeCategories: async () => {
				const { data, error } =
					await callApi<FormStore["campaignInfo"]["categories"]>(
						"/campaign/category"
					);

				if (error) return;

				if (!data.data) return;

				const { setCampaignInfo } = get().actions;

				setCampaignInfo({ categories: data.data });
			},
		},
	}) satisfies FormStore;

export const useInitFormStore = create<FormStore>()(
	persist(devtools(stateObjectFn, { name: "formStore" }), {
		name: "campaignFormStore",

		partialize: ({ currentStep }) => ({ currentStep }),
	})
);

export const useFormStore = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitFormStore(useShallow(selector));

	return state;
};
