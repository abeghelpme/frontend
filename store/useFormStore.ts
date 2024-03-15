import type { Campaign } from "@/interfaces/Campaign";
import type { Prettify } from "@/lib/type-helpers";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";
import { useInitCampaignStore } from "./useCampaignStore";

export type StepOneData = Prettify<
	Pick<Campaign, "country" | "tags"> & {
		categoryId: string;
	}
>;

export type StepTwoData = Prettify<
	Pick<Campaign, "title" | "goal" | "deadline" | "fundraiser">
>;

export type StepThreeData = Prettify<
	Pick<Campaign, "story" | "storyHtml"> & { photos: File[] }
>;

export type FormStore = {
	currentStep: 1 | 2 | 3;

	formStatus: {
		isValid: boolean;
		isSubmitting: boolean;
	};

	formStepData: Prettify<StepOneData & StepTwoData & StepThreeData>;

	currentCampaign: Campaign & { shortId: string };

	actions: {
		goToStep: (newStep: number) => void;

		updateCurrentCampaign: (
			updatedInfo: Partial<FormStore["currentCampaign"]>
		) => void;

		updateFormData: (
			updatedFormData: Partial<FormStore["formStepData"]>
		) => void;

		updateFormStatus: (
			updatedFormStatus: Partial<FormStore["formStatus"]>
		) => void;

		initializeFormData: () => void;
	};
};

const initialState = {
	currentStep: 1,

	currentCampaign: {
		shortId: "",
	} as FormStore["currentCampaign"],

	formStatus: {
		isValid: true,
		isSubmitting: false,
	},

	formStepData: {
		categoryId: "",
		country: "" as Campaign["country"],
		tags: [],
		title: "",
		fundraiser: "" as Campaign["fundraiser"],
		goal: 0,
		deadline: "",
		photos: [],
		storyHtml: "",
		story: "",
	},
} satisfies Omit<FormStore, "actions">;

export const useInitFormStore = create<FormStore>()(
	persist(
		(set, get) => ({
			...initialState,

			actions: {
				goToStep: (newStep) => {
					if (newStep < 1 || newStep > 3) return;

					set({ currentStep: newStep as FormStore["currentStep"] });
				},

				updateCurrentCampaign: (newInfo) => {
					const { currentCampaign: previousInfo } = get();

					set({
						currentCampaign: {
							...previousInfo,
							...newInfo,
							shortId: newInfo.url
								? newInfo.url.split(".me/")[1]
								: previousInfo.shortId,
						},
					});
				},

				updateFormStatus: (newFormStatus) => {
					const { formStatus: previousFormStatus } = get();

					set({ formStatus: { ...previousFormStatus, ...newFormStatus } });
				},

				updateFormData: (updatedFormData) => {
					const { formStepData } = get();

					set({ formStepData: { ...formStepData, ...updatedFormData } });
				},

				initializeFormData: () => {
					const { campaigns } = useInitCampaignStore.getState();

					if (campaigns.length === 0) {
						set({ currentStep: 1 });
						return;
					}

					const currentCampaign = campaigns[0];

					if (
						currentCampaign.status === "Approved" &&
						currentCampaign.isPublished
					)
						return;

					const { updateCurrentCampaign } = get().actions;

					updateCurrentCampaign(currentCampaign);

					set({
						formStepData: {
							categoryId: currentCampaign.category?._id ?? "",
							country: currentCampaign.country,
							tags: currentCampaign.tags,
							title: currentCampaign.title,
							deadline: currentCampaign.deadline,
							fundraiser: currentCampaign.fundraiser,
							goal: currentCampaign.goal,
							story: currentCampaign.story,
							storyHtml: currentCampaign.storyHtml,
							photos: [],
						},
					});
				},
			} satisfies FormStore["actions"],
		}),
		{ name: "FormStore", partialize: ({ currentStep }) => ({ currentStep }) }
	)
);

export const useFormStore = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitFormStore(useShallow(selector));

	return state;
};