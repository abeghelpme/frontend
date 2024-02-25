import { cn } from "@/lib";
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
				"md:text-smte flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold md:px-3 md:py-2 md:text-xs lg:rounded-lg lg:px-6 lg:py-4 lg:font-bold",
				disabled && "cursor-not-allowed bg-unfocused",
				className
			)}
			onClick={onClick}
			loading={isLoading}
			disabled={disabled}
		>
			{"children" in restOfProps ? restOfProps.children : restOfProps.text}
		</Button>
	);
}

export default FormActionButton;
