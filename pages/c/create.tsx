import {
	FormActionButton,
	StepOne,
	StepThree,
	StepTracker,
	StepTwo,
} from "@/components/create-campaign";
import { AuthenticatedUserLayout } from "@/layouts";
import { cn, zodValidator } from "@/lib";
import { useFormStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider as HookFormProvider, useForm } from "react-hook-form";

const STEP_COMPONENT_LOOKUP = {
	1: { component: <StepOne />, validator: "campaignStepOne" },
	2: { component: <StepTwo />, validator: "campaignStepTwo" },
	3: { component: <StepThree />, validator: "campaignStepThree" },
} as const;

function CreateCampaignPage() {
	const {
		currentStep,
		formStepData,
		actions: { goToStep, initializeFormData },
	} = useFormStore((state) => state);

	const methods = useForm({
		mode: "onChange",
		resolver: zodResolver(zodValidator(STEP_COMPONENT_LOOKUP[currentStep].validator)!),
		defaultValues: formStepData,
	});

	useEffect(() => {
		initializeFormData();
	}, []);

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
							className={cn("bg-abeg-primary", currentStep === 3 && "lg:hidden")}
							targetForm={`${currentStep}`}
							isSubmitting={methods.formState.isSubmitting}
							disabled={methods.formState.isSubmitting}
						/>

						{currentStep === 3 && (
							<FormActionButton
								type="submit"
								text="Create campaign"
								variant="primary"
								className={"bg-abeg-primary font-bold max-lg:hidden"}
								targetForm={`${currentStep}`}
								isSubmitting={methods.formState.isSubmitting}
								disabled={methods.formState.isSubmitting}
							/>
						)}
					</div>
				</div>
			}
		>
			<div className="mx-auto flex w-full shrink-0 flex-col gap-8 bg-cover pt-8 max-lg:max-w-[30rem] lg:flex-row lg:items-start lg:gap-16">
				<section className="flex shrink-0 gap-3 lg:mt-5">
					<StepTracker />
				</section>

				<HookFormProvider {...methods}>
					{STEP_COMPONENT_LOOKUP[currentStep].component}
				</HookFormProvider>
			</div>
		</AuthenticatedUserLayout>
	);
}

export default CreateCampaignPage;
CreateCampaignPage.protect = true;
