import type { targetCountries } from "@/components/CreateCampaign/campaign-utils/constants";

export type StepOneData = {
	categoryId: string;
	country: (typeof targetCountries)[number];
	tags: string[];
};

export type StepTwoData = {
	title: string;
	fundraiser: "INDIVIDUAL" | "BENEFICIARY" | "";
	goal: number | null;
	deadline: string;
};

export type StepThreeData = {
	photos: File[];
	story: string;
	storyHtml: string;
};

type FormStatus = {
	isValid: boolean;
	isSubmitting: boolean;
};

type SetDataParams =
	| { step: 1; data: Partial<StepOneData> }
	| { step: 2; data: Partial<StepTwoData> }
	| { step: 3; data: Partial<StepThreeData> };

export type FormStore = {
	currentStep: SetDataParams["step"];

	fundraiserCategories: Array<{ id: string; name: string }>;

	formStatus: FormStatus;
	stepOneData: StepOneData;
	stepTwoData: StepTwoData;
	stepThreeData: StepThreeData;

	actions: {
		goToStep: (newStep: number) => void;

		setData: ({ step, data }: SetDataParams) => void;

		setFormStatus: (newFormStatus: Partial<FormStatus>) => void;

		initializeFormData: (
			storeData: Pick<
				FormStore,
				"stepOneData" | "stepTwoData" | "stepThreeData"
			>
		) => void;
	};
};
