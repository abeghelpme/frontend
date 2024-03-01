import { useCallbackRef } from "@/lib/hooks/useCallbackRef";
import { assertDefined } from "@/lib/type-helpers/assert";
import { useCallback, useEffect, useRef } from "react";

type AnimationOptions = {
	callbackFn: () => void;
	intervalDuration: number | null;
};

const useAnimationInterval = (options: AnimationOptions) => {
	const { callbackFn, intervalDuration } = options;

	const startTimeStampRef = useRef<number | null>(null);
	const animationFrameId = useRef<number | null>(null);

	const savedCallback = useCallbackRef(callbackFn);

	// prettier-ignore
	const smoothAnimation = useCallback((timeStamp: DOMHighResTimeStamp) => {
			if (startTimeStampRef.current === null) {
				startTimeStampRef.current = Math.floor(timeStamp);
			}

			const elapsedTime = Math.floor(timeStamp - startTimeStampRef.current);

			if (elapsedTime >= assertDefined(intervalDuration)) {
				savedCallback();
				startTimeStampRef.current = null; // == Reset the starting time stamp
			}

			animationFrameId.current = requestAnimationFrame(smoothAnimation);
		},
		[intervalDuration, savedCallback]
	);

	const onAnimationStart = useCallback(
		() => (animationFrameId.current = requestAnimationFrame(smoothAnimation)),
		[smoothAnimation]
	);

	const onAnimationStop = useCallback(() => {
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}
		startTimeStampRef.current = null;
		animationFrameId.current = null;
	}, []);

	useEffect(
		function toggleAnimationByInterval() {
			if (intervalDuration === null) return;

			onAnimationStart();

			return () => onAnimationStop();
		},

		[intervalDuration, onAnimationStart, onAnimationStop]
	);

	return { animationFrameId: animationFrameId.current, onAnimationStop };
};

export { useAnimationInterval };
