import type { FormStore } from "./formStore.types";

export const initialFormState = {
	currentStep: 1,

	campaignInfo: {
		shortId: "",
		categories: [] as FormStore["campaignInfo"]["categories"],
	} as FormStore["campaignInfo"],

	formStatus: {
		isValid: true,
		isSubmitting: false,
	},

	stepOneData: {
		categoryId: "",
		country: "",
		tags: [],
	},

	stepTwoData: {
		title: "",
		fundraiser: "",
		goal: 0,
		deadline: "",
	},

	stepThreeData: {
		photos: [],
		storyHtml: "",
		story: "",
	},
} satisfies Omit<FormStore, "actions">;

export const STEP_DATA_KEY_LOOKUP = {
	1: "stepOneData",
	2: "stepTwoData",
	3: "stepThreeData",
} as const;
