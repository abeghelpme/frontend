import { useFormStore } from "@/store";
import { StepIndicator, StepInformation } from "./StepDetails";

function StepTracker() {
	const { currentStep } = useFormStore((state) => state);

	return (
		<>
			<div className="flex flex-col text-xs">
				<StepIndicator step={1} isCompleted={currentStep > 1} />

				<StepIndicator
					step={2}
					disabled={currentStep < 2}
					isCompleted={currentStep > 2}
				/>

				<StepIndicator step={3} disabled={currentStep < 3} />
			</div>

			<div className="flex flex-col items-center justify-between gap-8 text-xs text-abeg-primary lg:max-w-52 lg:text-sm">
				<StepInformation
					title="Basic Info"
					description="Create a campaign to fund your passion or cause"
				/>

				<StepInformation
					title="Funding"
					description="Share your funding goal and deadline"
					disabled={currentStep < 2}
				/>

				<StepInformation
					title="Preview"
					description="Preview your campaign"
					disabled={currentStep < 3}
				/>
			</div>
		</>
	);
}

export default StepTracker;
