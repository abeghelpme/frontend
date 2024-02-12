import {
	FormActionButton,
	StepOne,
	StepThree,
	StepTracker,
	StepTwo,
} from "@/components/CreateCampaign";
import { toast } from "@/components/ui";
import { callApi } from "@/lib";
import {
	STEP_DATA_KEY_LOOKUP,
	type StepOneData,
	type StepThreeData,
	type StepTwoData,
	useFormStore,
} from "@/store/formStore";
import { useEffect } from "react";

const STEP_COMPONENT_LOOKUP = {
	1: <StepOne />,
	2: <StepTwo />,
	3: <StepThree />,
};

type BaseResponse = {
	status: "success" | "Error";
	message: string;
	isComplete: boolean;
};

// type StepOneResponse = BaseResponse & { data: Omit<StepOneData, "categories"> };

// type StepTwoResponse = BaseResponse & { data: StepTwoData };

// type StepThreeResponse = BaseResponse & { data: StepThreeData };

type CategoriesResponse = BaseResponse & {
	data: Array<{
		id: string;
		name: string;
	}>;
};

function CreateCampaignPage() {
	const {
		currentStep,
		formStatus,
		actions: { goToStep, setData, initializeFormData },
	} = useFormStore((state) => state);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [currentStep]);

	return (
		<div className="flex min-h-screen flex-col justify-between max-lg:items-center">
			<main
				className="flex w-[min(100%,48rem)] shrink-0 flex-col gap-3.2 bg-contours-old lg:pt-4.8 bg-cover pt-3.2 px-2.4 pb-5.5 lg:w-full lg:flex-row lg:items-start lg:gap-7 lg:px-10 lg:pb-10"
				data-rem-reset
			>
				<section className="flex shrink-0 gap-1.2 lg:mt-1.9">
					<StepTracker />
				</section>

				{STEP_COMPONENT_LOOKUP[currentStep]}
			</main>

			<footer className="flex w-full items-center justify-between border-t border-t-formBtn px-2.4 py-1.6 lg:px-10 lg:py-2.4">
				<FormActionButton
					type="button"
					text="Go Back"
					className="min-w-[7.8rem]"
					disabled={currentStep === 1}
					onClick={() => goToStep(currentStep - 1)}
				/>

				<FormActionButton
					type="submit"
					text="Continue"
					targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
					disabled={formStatus.isSubmitting}
				/>
			</footer>
		</div>
	);
}

export default CreateCampaignPage;
