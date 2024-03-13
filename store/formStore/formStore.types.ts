import type { Campaign } from "@/interfaces/Campaign";
import type { targetCountries } from "@/lib/helpers/campaign/constants";

export type StepOneData = {
	categoryId: string;
	country: (typeof targetCountries)[number];
	tags: string[];
};

export type StepTwoData = {
	title: string;
	fundraiser: "INDIVIDUAL" | "BENEFICIARY" | "";
	goal: number;
	deadline: string;
};

export type StepThreeData = {
	photos: File[];
	story: string;
	storyHtml: string;
};

type SetDataParams =
	| { step: 1; data: Partial<StepOneData> }
	| { step: 2; data: Partial<StepTwoData> }
	| { step: 3; data: Partial<StepThreeData> };

export type FormStore = {
	currentStep: SetDataParams["step"];

	formStatus: {
		isValid: boolean;
		isSubmitting: boolean;
	};

	stepOneData: StepOneData;
	stepTwoData: StepTwoData;
	stepThreeData: StepThreeData;

	campaignInfo: Campaign & {
		shortId: string;
		categories: Array<{ _id: string; name: string }>;
	};

	actions: {
		goToStep: (newStep: number) => void;

		setCampaignInfo: (newInfo: Partial<FormStore["campaignInfo"]>) => void;

		setData: ({ step, data }: SetDataParams) => void;

		setFormStatus: (newFormStatus: Partial<FormStore["formStatus"]>) => void;

		initializeFormData: (queryParam?: string) => Promise<void>;

		initializeCategories: () => Promise<void>;
	};
};
