import {
	FormActionButton,
	StepOne,
	StepThree,
	StepTracker,
	StepTwo,
} from "@/components/create-campaign";
import { cn } from "@/lib";
import { STEP_DATA_KEY_LOOKUP, useFormStore } from "@/store/formStore";
import { useInitFormStore } from "@/store/formStore/formStore";
import { useEffect } from "react";

const STEP_COMPONENT_LOOKUP = {
	1: <StepOne />,
	2: <StepTwo />,
	3: <StepThree />,
};

void useInitFormStore.getState().actions.initializeFormData();

function CreateCampaignPage() {
	const {
		currentStep,
		formStatus,
		actions: { goToStep },
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
			<main className="flex w-full shrink-0 flex-col gap-8 bg-cover px-6 pb-14 pt-8 max-lg:max-w-[30rem] lg:flex-row lg:items-start lg:gap-16 lg:px-28 lg:pb-28 lg:pt-12">
				<section className="flex shrink-0 gap-3 lg:mt-5">
					<StepTracker />
				</section>

				{STEP_COMPONENT_LOOKUP[currentStep]}
			</main>

			<footer className="flex w-full items-center justify-between border-t border-t-abeg-primary px-6 py-4 lg:px-[100px] lg:py-6">
				<FormActionButton
					type="button"
					text="Go Back"
					className="min-w-[78px] bg-abeg-primary"
					disabled={currentStep === 1}
					onClick={() => goToStep(currentStep - 1)}
				/>

				<div className="flex justify-end gap-2">
					<FormActionButton
						type="submit"
						text="Continue"
						className={cn("bg-abeg-primary", currentStep === 3 && "lg:hidden")}
						targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
						isLoading={formStatus.isSubmitting}
						disabled={formStatus.isSubmitting}
					/>

					{currentStep === 3 && (
						<>
							<FormActionButton
								type="submit"
								text="Preview Campaign"
								variant="secondary"
								className={
									"border-abeg-primary font-bold text-abeg-primary max-lg:hidden"
								}
								targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
								isLoading={formStatus.isSubmitting}
								disabled={formStatus.isSubmitting}
							/>

							<FormActionButton
								type="button" // TODO - Replace with action for publishing campaigns
								text="Publish Campaign"
								className="bg-abeg-primary max-lg:hidden"
							/>
						</>
					)}
				</div>
			</footer>
		</div>
	);
}

export default CreateCampaignPage;
CreateCampaignPage.protect = true;
