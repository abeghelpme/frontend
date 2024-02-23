import { cn } from "@/lib";
import { useEffect, useRef } from "react";
import { type FieldValues, type FormState } from "react-hook-form";

type ErrorParagraphProps<TStepData extends FieldValues> = {
	className?: string;
	formState: FormState<TStepData>;
	errorField: keyof TStepData;
};

function FormErrorMessage<TStepData extends FieldValues>(
	props: ErrorParagraphProps<TStepData>
) {
	const { className, formState, errorField } = props;

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
			className={cn(
				"ml-@0.4 mt-@1.2 text-[1.1rem] font-medium italic text-red-400",
				className
			)}
			onAnimationEnd={() =>
				paragraphRef.current?.classList.remove(animationClass)
			}
		>
			*{message}
		</p>
	);
}

export default FormErrorMessage;
