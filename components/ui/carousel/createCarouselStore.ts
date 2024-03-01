import type { PrettyOmit } from "@/lib/type-helpers";
import { createStore } from "zustand";
import type {
	CarouselProviderProps,
	CarouselStore,
	ImagesType,
} from "./carousel.types";

// CarouselStore Creation
const createCarouselStore = <TImages extends ImagesType>(
	storeValues: PrettyOmit<CarouselProviderProps<TImages>, "children">
) => {
	const { images, onSlideBtnClick } = storeValues;

	const carouselStore = createStore<CarouselStore<TImages>>((set, get) => ({
		images,
		currentSlide: 0,
		maxSlide: images.length - 1,

		actions: {
			goToSlide: (newValue) => {
				onSlideBtnClick?.();

				set({ currentSlide: newValue });
			},

			nextSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide } = get().actions;

				if (currentSlide === maxSlide) {
					goToSlide(0);
					return;
				}

				goToSlide(currentSlide + 1);
			},

			previousSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide } = get().actions;

				if (currentSlide === 0) {
					goToSlide(maxSlide);
					return;
				}

				goToSlide(currentSlide - 1);
			},
		},
	}));

	return carouselStore;
};

export { createCarouselStore };
