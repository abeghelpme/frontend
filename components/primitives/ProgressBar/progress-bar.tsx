import { cn } from "@/lib/utils/cn";
import type { HTMLProps, FC } from "react";

interface ProgressBarProps {
	value: number; // Provide the progress value as a number (0-100)
	props?: HTMLProps<HTMLProgressElement>;
	className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, className, ...props }) => {
	return (
		<progress
			className={cn(
				"appearance-none progress-unfilled:bg-abeg-neutral-80 progress-unfilled:h-2 progress-unfilled:rounded-[4px] w-full border-none mx-9 progress-filled:bg-abeg-green progress-filled:rounded-[4px]",
				className,
			)}
			id="target"
			value={`${value}`}
			{...props}
			max="100"
		>
			{value + "%"}
		</progress>
	);
};

export default ProgressBar;
