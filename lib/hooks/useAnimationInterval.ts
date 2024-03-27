import { useCallbackRef } from "@/lib/hooks/useCallbackRef";
import { assertDefined } from "@/lib/type-helpers/assert";
import { useEffect, useRef } from "react";

type AnimationOptions = {
	callbackFn: () => void;
	intervalDuration: number | null;
};

const useAnimationInterval = (options: AnimationOptions) => {
	const { callbackFn, intervalDuration } = options;

	const startTimeStampRef = useRef<number | null>(null);
	const animationFrameId = useRef<number | null>(null);

	// prettier-ignore
	const smoothAnimation = useCallbackRef((timeStamp: DOMHighResTimeStamp) => {
		if (startTimeStampRef.current === null) {
			startTimeStampRef.current = Math.floor(timeStamp);
		}

		const elapsedTime = Math.floor(timeStamp - startTimeStampRef.current);

		if (elapsedTime >= assertDefined(intervalDuration)) {
			callbackFn();
			startTimeStampRef.current = null; // == Reset the starting time stamp
		}

		animationFrameId.current = requestAnimationFrame(smoothAnimation);
	});

	const onAnimationStart = useCallbackRef(
		() => (animationFrameId.current = requestAnimationFrame(smoothAnimation))
	);

	const onAnimationStop = useCallbackRef(() => {
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}
		startTimeStampRef.current = null;
		animationFrameId.current = null;
	});

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
