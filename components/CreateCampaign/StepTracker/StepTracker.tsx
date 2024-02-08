import { useFormStore } from "@/store/formStore";
import { StepIndicator, StepInformation } from "./StepDetails";

function StepTracker() {
	const currentStep = useFormStore((state) => state.currentStep);

	return (
		<>
			<div className="flex flex-col text-1.2">
				<StepIndicator step={1} isCompleted={currentStep > 1} />

				<StepIndicator
					step={2}
					disabled={currentStep < 2}
					isCompleted={currentStep > 2}
				/>

				<StepIndicator step={3} disabled={currentStep < 3} />
			</div>

			<div className="flex flex-col items-center justify-between gap-3.2 text-1.2 text-formBtn lg:max-w-21.3 lg:text-1.4">
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
