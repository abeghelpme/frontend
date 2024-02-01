import {
	StepOne,
	StepThree,
	StepTracker,
	StepTwo,
} from "@/components/CreateCampaign";
import FormActionButton from "@/components/CreateCampaign/FormActionButton";
import { type FormStore, useFormStore } from "@/store/useformStore";
import { STEP_DATA_KEY_LOOKUP } from "@/store/useformStore/constants";
import { useEffect } from "react";

const STEP_COMPONENT_LOOKUP = {
	1: <StepOne />,
	2: <StepTwo />,
	3: <StepThree />,
};

function CreateCampaignPage() {
	const { currentStep, goToStep } = useFormStore((state) => state);

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
				className="flex w-[min(100%,48rem)] shrink-0 flex-col gap-3.2 bg-contours lg:pt-4.8 bg-cover pt-3.2 px-2.4 pb-5.5 lg:pb-7 lg:w-full lg:flex-row lg:items-start lg:gap-7 lg:px-10"
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
					onClick={() =>
						goToStep((currentStep - 1) as FormStore["currentStep"])
					}
				/>

				<FormActionButton
					type="submit"
					text="Continue"
					targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
				/>
			</footer>
		</div>
	);
}

export default CreateCampaignPage;
