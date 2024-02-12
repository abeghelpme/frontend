import { useFormStore } from "@/store/formStore";
import { useEffect, useRef } from "react";
import { type FieldValues, type FormState } from "react-hook-form";

const useWatchFormStatus = <TStepData extends FieldValues>(
	formState: FormState<TStepData>
) => {
	const { setFormStatus } = useFormStore((state) => state.actions);

	const firstMountRef = useRef({ real: true, dummy: true });

	const { isValid, isSubmitting } = formState;

	useEffect(() => {
		if (firstMountRef.current.real) {
			setFormStatus({ isValid: true, isSubmitting });
			firstMountRef.current.real = false;
		}

		if (firstMountRef.current.dummy) {
			firstMountRef.current.dummy = false;
			return;
		}

		setFormStatus({ isValid, isSubmitting });
	}, [isValid, isSubmitting]);
};

export { useWatchFormStatus };
