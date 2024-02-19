import { cn } from "@/lib";
import { ArrowSpinIcon } from "@/public/assets/icons/campaign";
import { Button } from "../ui";

type BaseProps = {
	targetForm?: string;
	type: "button" | "submit";
	variant?: "primary" | "secondary" | "danger";
	className?: string;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};

type FormActionButtonProps =
	| (BaseProps & {
			text: string;
	  })
	| (BaseProps & {
			children: React.ReactNode;
	  });

function FormActionButton(props: FormActionButtonProps) {
	const {
		targetForm,
		variant = "primary",
		className,
		type,
		isLoading = false,
		disabled = false,
		onClick,
		...restOfProps
	} = props;

	return (
		<Button
			form={targetForm}
			type={type}
			variant={variant}
			className={cn(
				"flex items-center gap-@0.4 rounded-md px-@1.2 py-@0.8 text-xs font-semibold lg:rounded-lg lg:px-@2.4 lg:py-@1.6 lg:text-[length:theme(spacing[@1.5])] lg:font-bold",
				disabled && "cursor-not-allowed bg-unfocused",
				className
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading && (
				<ArrowSpinIcon className="size-@1.6 animate-spin lg:size-@2" />
			)}
			{"children" in restOfProps ? restOfProps.children : restOfProps.text}
		</Button>
	);
}

export default FormActionButton;
