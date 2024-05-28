import type { Campaign, Image } from "@/interfaces/Campaign";
import type { Prettify } from "@/lib/type-helpers";
import { create } from "zustand";
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
	Pick<Campaign, "story" | "storyHtml"> & {
		photos: Array<File | Image["secureUrl"]>;
	}
>;

export type FormStore = {
	formStatus: {
		isValid: boolean;
		isSubmitting: boolean;
	};

	currentStep: Campaign["currentStep"];

	campaignId: Campaign["_id"];

	formStepData: Prettify<StepOneData & StepTwoData & StepThreeData>;

	actions: {
		goToStep: (newStep: number) => void;

		updateCampaignId: (
			updatedId: Partial<FormStore["campaignId"]> | undefined
		) => void;

		updateFormStatus: (
			updatedFormStatus: Partial<FormStore["formStatus"]>
		) => void;

		updateFormData: (
			updatedFormData: Partial<FormStore["formStepData"]>
		) => void;

		resetFormData: () => void;

		initializeFormData: () => void;
	};
};

export const initialFormState = {
	currentStep: 1,

	formStatus: {
		isValid: true,
		isSubmitting: false,
	},

	campaignId: "",

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

export const useInitFormStore = create<FormStore>()((set, get) => ({
	...initialFormState,

	actions: {
		goToStep: (newStep) => {
			if (newStep < 1 || newStep > 3) return;

			set({ currentStep: newStep as FormStore["currentStep"] });
		},

		updateFormStatus: (newFormStatus) => {
			const { formStatus: previousFormStatus } = get();

			set({ formStatus: { ...previousFormStatus, ...newFormStatus } });
		},

		updateCampaignId: (updatedId) => {
			if (!updatedId || updatedId === get().campaignId) return;

			set({ campaignId: updatedId });
		},

		updateFormData: (updatedFormData) => {
			const { formStepData } = get();

			set({ formStepData: { ...formStepData, ...updatedFormData } });
		},

		resetFormData: () => set({ formStepData: initialFormState.formStepData }),

		initializeFormData: () => {
			const campaigns = useInitCampaignStore.getState().campaigns as
				| Campaign[]
				| undefined;

			if (!campaigns || campaigns.length === 0) return;

			const searchParams = new URLSearchParams(window.location.search);

			const campaignToBeEdited = campaigns.find(
				(campaign) =>
					!campaign.isPublished && campaign._id === searchParams.get("id")
			);

			if (campaignToBeEdited) {
				set({
					currentStep: campaignToBeEdited.currentStep,

					campaignId: campaignToBeEdited._id,

					formStepData: {
						categoryId: campaignToBeEdited.category?._id ?? "",
						country: campaignToBeEdited.country,
						tags: campaignToBeEdited.tags,
						title: campaignToBeEdited.title,
						deadline: campaignToBeEdited.deadline,
						fundraiser: campaignToBeEdited.fundraiser,
						goal: campaignToBeEdited.goal,
						story: campaignToBeEdited.story,
						storyHtml: campaignToBeEdited.storyHtml,
						photos: campaignToBeEdited.images.map((image) => image.secureUrl),
					},
				});

				return;
			}

			const currentDraftCampaign = campaigns.find(
				(campaign) => campaign.status === "Draft"
			);

			if (!currentDraftCampaign) return;

			set({
				currentStep: currentDraftCampaign.currentStep,

				campaignId: currentDraftCampaign._id,

				formStepData: {
					categoryId: currentDraftCampaign.category?._id ?? "",
					country: currentDraftCampaign.country,
					tags: currentDraftCampaign.tags,
					title: currentDraftCampaign.title,
					deadline: currentDraftCampaign.deadline,
					fundraiser: currentDraftCampaign.fundraiser,
					goal: currentDraftCampaign.goal,
					story: currentDraftCampaign.story,
					storyHtml: currentDraftCampaign.storyHtml,
					photos: currentDraftCampaign.images.map((image) => image.secureUrl),
				},
			});
		},
	} satisfies FormStore["actions"],
}));

export const useFormStore = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitFormStore(useShallow(selector));

	return state;
};
