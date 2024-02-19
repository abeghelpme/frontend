import {
	FormActionButton,
	StepOne,
	StepThree,
	StepTracker,
	StepTwo,
} from "@/components/CreateCampaign";
import { cn } from "@/lib";
import { STEP_DATA_KEY_LOOKUP, useFormStore } from "@/store/formStore";
import { useEffect } from "react";

const STEP_COMPONENT_LOOKUP = {
	1: <StepOne />,
	2: <StepTwo />,
	3: <StepThree />,
};

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
			<main className="flex w-full shrink-0 flex-col gap-@3.2 bg-contours-old bg-cover px-@2.4 pb-@5.5 pt-@3.2 max-lg:max-w-[30rem] lg:flex-row lg:items-start lg:gap-@7 lg:px-@10 lg:pb-@10 lg:pt-@4.8">
				<section className="flex shrink-0 gap-@1.2 lg:mt-@1.9">
					<StepTracker />
				</section>

				{STEP_COMPONENT_LOOKUP[currentStep]}
			</main>

			<footer className="flex w-full items-center justify-between border-t border-t-formBtn px-@2.4 py-@1.6 lg:px-@10 lg:py-[1.65625rem]">
				<FormActionButton
					type="button"
					text="Go Back"
					className="flex min-w-[4.875rem] justify-center bg-formBtn"
					disabled={currentStep === 1}
					onClick={() => goToStep(currentStep - 1)}
				/>

				<div className="flex justify-end gap-@0.8">
					<FormActionButton
						type="submit"
						text="Continue"
						className={cn("bg-formBtn", currentStep === 3 && "lg:hidden")}
						targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
						isLoading={formStatus.isSubmitting}
						disabled={formStatus.isSubmitting}
					/>

					{currentStep === 3 && (
						<FormActionButton
							type="submit"
							text="Preview Campaign"
							variant="secondary"
							className={"border-formBtn font-bold text-formBtn max-lg:hidden"}
							targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
							isLoading={formStatus.isSubmitting}
							disabled={formStatus.isSubmitting}
						/>
					)}

					{currentStep === 3 && (
						<FormActionButton
							type="button"
							text="Publish Campaign"
							className="bg-formBtn max-lg:hidden"
						/>
					)}
				</div>
			</footer>
		</div>
	);
}

export default CreateCampaignPage;
