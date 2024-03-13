import type { ApiResponse } from "@/interfaces";
import type { Campaign, Category, Image } from "@/interfaces/Campaign";
import { callApi } from "@/lib";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type FormStore = {
	values: Partial<Campaign>;
	formStatus: {
		isValid: boolean;
		isSubmitting: boolean;
	};
	fileBlobs: File[];
	modifiedSteps: number[];
	categories: Category[];
	localImages: string[];
	actions: {
		updateValues: (data: Partial<Campaign>) => void;
		updateInitialValues: (data: Partial<Campaign>) => void;
		goToStep: (newStep: number) => void;
		initializeCategories: () => Promise<void>;
	};
};

const initialState = {
	values: {
		currentStep: 1,
		tags: [],
	} as Partial<Campaign>,
	formStatus: {
		isValid: true,
		isSubmitting: false,
	},
	fileBlobs: [],
	modifiedSteps: [],
	categories: [],
	localImages: [],
};

export const useInitCampaignForm = create<FormStore>()((set, get) => ({
	...initialState,
	actions: {
		updateValues: (data) =>
			set((state) => ({
				values: { ...state.values, ...data },
			})),
		updateInitialValues: (data) => {
			set({
				values: { ...data, categoryId: data.category?._id?.toString() },
				...(data?.photos &&
					data?.photos?.length > 0 && {
						localImages: [
							...data.photos.map((photo: Image | string) => {
								if (typeof photo === "string") {
									return photo;
								}
								return photo?.secureUrl as string;
							}),
						],
					}),
			});
			console.log(get().values, "new values");
		},
		goToStep: (newStep) => {
			if (newStep < 1 || newStep > 3) return;

			set((state) => ({
				values: {
					...state.values,
					currentStep: newStep as Campaign["currentStep"],
				},
			}));
		},
		initializeCategories: async () => {
			const { data, error } = await callApi<ApiResponse<Category[]>>(
				"/campaign/categories"
			);

			if (error || !data?.data) return;

			set({ categories: data.data });
		},
	} satisfies FormStore["actions"],
}));

export const useCampaignForm = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitCampaignForm(useShallow(selector));
	return state;
};
