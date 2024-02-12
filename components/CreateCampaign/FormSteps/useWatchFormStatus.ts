import { useFormStore } from "@/store/formStore";
import { useEffect, useRef } from "react";
import { type FieldValues, type FormState } from "react-hook-form";

const useWatchFormStatus = <TStepData extends FieldValues>(
	formState: FormState<TStepData>
) => {
	const { setFormStatus } = useFormStore((state) => state.actions);

	const firstMountRef = useRef({
		realFirstMount: true,
		dummyFirstMount: true,
	});

	const { isValid, isSubmitting } = formState;

	// useEffect(() => {
	// 	if (firstMountRef.current.realFirstMount) {
	// 		firstMountRef.current.realFirstMount = false;
	// 		setFormStatus({ isValid: true, isSubmitting });
	// 	}

	// 	// if (firstMountRef.current.dummyFirstMount) {
	// 	// 	firstMountRef.current.dummyFirstMount = false;
	// 	// 	return;
	// 	// }

	// setFormStatus({ isValid, isSubmitting });

	// }, [isValid, isSubmitting]);

	const isMounted = useRef(false);

	useEffect(() => {
		if (!isMounted.current) {
			setFormStatus({ isValid: true, isSubmitting });
			isMounted.current = true;
		}

		if (isMounted.current) {
			setFormStatus({ isValid, isSubmitting });
		}
	}, [isValid, isSubmitting]);
};

export { useWatchFormStatus };
