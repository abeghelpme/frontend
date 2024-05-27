import { useFormStore } from "@/store";
import { useEffect, useRef } from "react";
import { type Control, type FieldValues, useFormState } from "react-hook-form";

const useWatchFormStatus = <TStepData extends FieldValues>(
	control: Control<TStepData>
) => {
	const { updateFormStatus } = useFormStore((state) => state.actions);

	const firstMountRef = useRef({ real: true, dummy: true });

	const { isValid, isSubmitting } = useFormState({ control });

	useEffect(() => {
		if (firstMountRef.current.real) {
			updateFormStatus({ isValid: true, isSubmitting });
			firstMountRef.current.real = false;
		}

		if (firstMountRef.current.dummy) {
			firstMountRef.current.dummy = false;
			return;
		}

		updateFormStatus({ isValid, isSubmitting });
	}, [isValid, isSubmitting]);
};

export { useWatchFormStatus };
