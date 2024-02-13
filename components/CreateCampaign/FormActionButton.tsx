import { cn } from "@/lib";
import { ArrowSpinIcon } from "@/public/assets/icons/campaign";
import { Button } from "../ui";

type FormActionButtonProps = {
	targetForm?: string;
	type: "button" | "submit";
	text: string;
	className?: string;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};

function FormActionButton(props: FormActionButtonProps) {
	const {
		targetForm,
		text,
		className,
		type,
		isLoading = false,
		disabled = false,
		onClick,
	} = props;

	return (
		<Button
			form={targetForm}
			type={type}
			variant="primary"
			className={cn(
				"rounded-6 bg-formBtn flex gap-0.4 px-1.2 py-0.8 text-1.2 font-semibold lg:rounded-8 lg:px-2.4 lg:py-1.4 lg:text-1.4 lg:font-bold  items-center",
				disabled && "cursor-not-allowed bg-unfocused",
				className
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading && (
				<ArrowSpinIcon className="size-1.6 animate-spin lg:size-2" />
			)}
			{text}
		</Button>
	);
}

export default FormActionButton;
