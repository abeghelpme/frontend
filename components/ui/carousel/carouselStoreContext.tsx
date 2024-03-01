import { createCustomContext } from "@/lib/hooks";
import type { SelectorFn } from "@/store";
import { useState } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type {
	CarouselProviderProps,
	CarouselStore,
	CarouselStoreApi,
	ImagesType,
} from "./carousel.types";
import { createCarouselStore } from "./createCarouselStore";

const [Provider, useCarouselContext] = createCustomContext<CarouselStoreApi>({
	name: "CarouselStoreContext",
	hookName: "useCarouselStore",
	providerName: "CarouselContextProvider",
});

// Provider Component
export function CarouselContextProvider<TImages extends ImagesType = ImagesType>(
	props: CarouselProviderProps<TImages>
) {
	const { children, images, onSlideBtnClick } = props;

	const [carouselStore] = useState(() => createCarouselStore({ images, onSlideBtnClick }));

	return <Provider value={carouselStore}>{children}</Provider>;
}

// Store Hook
export const useCarouselStore = <TResult,>(
	selector: SelectorFn<CarouselStore<ImagesType>, TResult>
) => {
	const store = useCarouselContext();

	return useStore(store, useShallow(selector));
};
