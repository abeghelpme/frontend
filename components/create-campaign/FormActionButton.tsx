import { cn } from "@/lib";
import type { Control } from "react-hook-form";
import { useFormState } from "react-hook-form";
import { Button } from "../ui";

type BaseProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isSubmitting?: boolean;
	disabled?: boolean;
	targetForm?: string;
	asChild?: boolean;
	type: "button" | "submit";
	variant?: "primary" | "secondary" | "danger";
	className?: string;
	onClick?: () => void;
};

type FormActionButtonProps = BaseProps & ({ text: string } | { children: React.ReactNode });

function FormActionButton(props: FormActionButtonProps) {
	const {
		targetForm,
		isSubmitting,
		disabled,
		asChild,
		variant = "primary",
		className,
		type,
		onClick,
		...restOfProps
	} = props;

	return (
		<Button
			asChild={asChild}
			form={targetForm}
			type={type}
			variant={variant}
			className={cn(
				"rounded-md px-3 py-2 text-center text-xs font-semibold max-md:h-9 lg:rounded-lg lg:px-6 lg:py-4 lg:text-base lg:font-bold",
				isSubmitting && "cursor-not-allowed bg-unfocused",
				className
			)}
			onClick={onClick}
			loading={isSubmitting}
			disabled={isSubmitting}
		>
			{"children" in restOfProps ? restOfProps.children : restOfProps.text}
		</Button>
	);
}

export default FormActionButton;
