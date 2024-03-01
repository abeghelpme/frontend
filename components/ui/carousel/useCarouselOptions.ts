import { useCallbackRef } from "@/lib/hooks/useCallbackRef";
import { useState } from "react";
import { useCarouselStore } from "./carouselStoreContext";
import { useAnimationInterval } from "./useAnimationInterval";

type CarouselOptions = {
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	shouldPauseOnHover?: boolean;
};

const useCarouselOptions = (options: CarouselOptions = {}) => {
	const { hasAutoSlide = false, autoSlideInterval = 5000, shouldPauseOnHover = false } = options;

	const { nextSlide } = useCarouselStore((state) => state.actions);

	const [isPaused, setIsPaused] = useState(false);

	const shouldAutoSlide = hasAutoSlide && !isPaused;

	useAnimationInterval({
		callbackFn: nextSlide,
		intervalDuration: shouldAutoSlide ? autoSlideInterval : null,
	});

	const pauseAutoSlide = useCallbackRef(() => shouldPauseOnHover && setIsPaused(true));

	const resumeAutoSlide = useCallbackRef(() => shouldPauseOnHover && setIsPaused(false));

	return { pauseAutoSlide, resumeAutoSlide };
};

export { useCarouselOptions };
