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

	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const message = formState.errors[errorField]?.message as string | undefined;

	const animationClass = "animate-shake";

	useEffect(() => {
		if (!paragraphRef.current) return;

		if (paragraphRef.current.classList.contains(animationClass)) return;

		paragraphRef.current.classList.add(animationClass);
	}, [formState.submitCount]);

	if (!message) {
		return null;
	}

	return (
		<p
			ref={paragraphRef}
			className={cn("ml-1 mt-3 text-xs font-medium italic text-red-400 lg:text-base", className)}
			onAnimationEnd={() => paragraphRef.current?.classList.remove(animationClass)}
		>
			*{message}
		</p>
	);
}

export default FormErrorMessage;
