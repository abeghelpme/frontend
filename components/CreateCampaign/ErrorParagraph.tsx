import { cn } from "@/lib";
import { type FieldValues, type FormState } from "react-hook-form";

type ErrorParagraphProps<TStepData extends FieldValues> = {
	className?: string;
	formState: FormState<TStepData>;
	errorField: keyof TStepData;
};

function ErrorParagraph<TStepData extends FieldValues>(
	props: ErrorParagraphProps<TStepData>
) {
	const { className, formState, errorField } = props;

	const { errors } = formState;

	const message = errors[errorField]?.message as string | undefined;

	if (!message) {
		return null;
	}

	return (
		<p
			className={cn(
				"text-[1.1rem] mt-1.2 ml-0.4 animate-shake font-semibold italic text-red-400",
				className
			)}
		>
			{message}
		</p>
	);
}

export default ErrorParagraph;
