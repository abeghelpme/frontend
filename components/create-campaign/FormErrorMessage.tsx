import { cn } from "@/lib";
import { useEffect, useRef } from "react";
import { type Control, type FieldValues, useFormState } from "react-hook-form";

type ErrorParagraphProps<TStepData extends FieldValues> = {
	className?: string;
	control: Control<TStepData>;
	errorField: keyof TStepData;
};

function FormErrorMessage<TStepData extends FieldValues>(props: ErrorParagraphProps<TStepData>) {
	const { className, control, errorField } = props;

	const formState = useFormState({ control });

	const errorParagraphRef = useRef<HTMLParagraphElement>(null);
	const message = formState.errors[errorField]?.message as string | undefined;

	const animationClass = "animate-shake";

	console.log(formState.errors);
	console.dir(errorParagraphRef.current);

	useEffect(() => {
		if (!errorParagraphRef.current) return;

		if (errorParagraphRef.current.classList.contains(animationClass)) return;

		errorParagraphRef.current.classList.add(animationClass);

		// Scroll to first error message
		if (Object.keys(formState.errors).indexOf(errorField as string) === 0) {
			errorParagraphRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [formState.submitCount]);

	if (!message) {
		return null;
	}

	return (
		<p
			ref={errorParagraphRef}
			className={cn("ml-1 mt-3 text-xs font-medium italic text-red-400 lg:text-base", className)}
			onAnimationEnd={() => errorParagraphRef.current?.classList.remove(animationClass)}
		>
			*{message}
		</p>
	);
}

export default FormErrorMessage;
