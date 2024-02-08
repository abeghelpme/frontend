import { useFormStore } from "@/store/formStore";
import { useEffect, useRef } from "react";
import { type FieldValues, type FormState } from "react-hook-form";

const useWatchFormStatus = <TStepData extends FieldValues>(
	formState: FormState<TStepData>
) => {
	const { isValid, isSubmitting } = formState;

	const { setFormStatus } = useFormStore((state) => state.actions);

	const isFirstMount = useRef({
		real: true,
		dummy: true,
	});

	useEffect(() => {
		if (isFirstMount.current.real) {
			isFirstMount.current.real = false;
			setFormStatus({ isValid: true, isSubmitting });
			return;
		}

		if (isFirstMount.current.dummy) {
			isFirstMount.current.dummy = false;
			return;
		}

		setFormStatus({ isValid, isSubmitting });
	}, [isSubmitting, isValid]);
};

export { useWatchFormStatus };
