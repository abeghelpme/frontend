import {
	FormActionButton,
	StepOne,
	StepThree,
	StepTracker,
	StepTwo,
} from "@/components/create-campaign";
import { AuthenticatedUserLayout } from "@/layouts";
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
void useInitFormStore.getState().actions.initializeCategories();

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
		<AuthenticatedUserLayout
			footer={
				<div className="flex w-full items-center justify-between">
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
							className={cn(
								"bg-abeg-primary",
								currentStep === 3 && "lg:hidden"
							)}
							targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
							isLoading={formStatus.isSubmitting}
							disabled={formStatus.isSubmitting}
						/>

						{currentStep === 3 && (
							<FormActionButton
								type="submit"
								text="Create campaign"
								variant="primary"
								className={"bg-abeg-primary font-bold max-lg:hidden"}
								targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
								isLoading={formStatus.isSubmitting}
								disabled={formStatus.isSubmitting}
							/>
						)}
					</div>
				</div>
			}
		>
			<div className="flex w-full shrink-0 flex-col gap-8 bg-cover pt-8 max-lg:max-w-[30rem] lg:flex-row lg:items-start lg:gap-16">
				<section className="flex shrink-0 gap-3 lg:mt-5">
					<StepTracker />
				</section>

				{STEP_COMPONENT_LOOKUP[currentStep]}
			</div>
		</AuthenticatedUserLayout>
	);
}

export default CreateCampaignPage;
CreateCampaignPage.protect = true;
