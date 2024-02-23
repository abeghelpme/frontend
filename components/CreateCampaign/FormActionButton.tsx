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
				"gap-@0.4 px-@1.2 py-@0.8 lg:px-@2.4 lg:py-@1.6 g:text-[length:theme(spacing[@1.5])] flex items-center rounded-md text-xs font-semibold lg:rounded-lg lg:font-bold",
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
