import { cn } from "@/lib";
import { useEffect, useRef } from "react";
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

	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const message = formState.errors[errorField]?.message as string | undefined;

	useEffect(() => {
		if (!paragraphRef.current) return;
		if (paragraphRef.current.classList.contains("animate-shake")) return;

		paragraphRef.current.classList.add("animate-shake");
	}, [formState.submitCount]);

	if (!message) {
		return null;
	}

	return (
		<p
			ref={paragraphRef}
			className={cn(
				"text-[1.1rem] font-medium mt-1.2 ml-0.4 italic text-red-400",
				className
			)}
			onAnimationEnd={() => {
				paragraphRef.current?.classList.remove("animate-shake");
			}}
		>
			*{message}
		</p>
	);
}

export default ErrorParagraph;
