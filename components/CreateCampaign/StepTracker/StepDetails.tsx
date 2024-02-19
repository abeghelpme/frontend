import { cn } from "@/lib";
import { TickIcon } from "@/public/assets/icons/campaign";
import type { FormStore } from "@/store/formStore";

type StepIndicatorProps = {
	step: FormStore["currentStep"];
	disabled?: boolean;
	isCompleted?: boolean;
};

type StepInfoProps = Pick<StepIndicatorProps, "disabled"> & {
	title: string;
	description: string;
};

function StepIndicator(props: StepIndicatorProps) {
	const { step, isCompleted = false, disabled = false } = props;

	const Separator = (
		<hr
			className={cn(
				"my-0.4 border-formBtn basis-full border border-dashed",
				disabled && "border-unfocused"
			)}
		/>
	);

	return (
		<div className={cn(step > 1 && "flex basis-full flex-col items-center")}>
			{step > 1 && Separator}

			<span
				className={cn(
					"bg-formBtn grid aspect-square w-2 shrink-0 place-content-center rounded-full font-bold text-white",
					disabled && "bg-unfocused"
				)}
			>
				{isCompleted ? <TickIcon /> : step}
			</span>
		</div>
	);
}

function StepInformation({
	title,
	description,
	disabled = false,
}: StepInfoProps) {
	return (
		<article className={cn("w-full", disabled && "text-unfocused")}>
			<h4 className="text-1.2 lg:text-2 font-medium">{title}</h4>

			<p>{description}</p>
		</article>
	);
}

export { StepIndicator, StepInformation };
