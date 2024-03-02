import type { RenderPropFn } from "@/lib/hooks/useElementList/For";
import type { StoreApi } from "zustand";

// Carousel store types
export type ImagesType = Array<Record<string, string>> | string[];

export type DefaultImagesType =
	| Array<{
			secureUrl: string;
			blurDataURL: string;
	  }>
	| string[];

export type CarouselStore<TImages extends ImagesType = DefaultImagesType> = {
	currentSlide: number;
	maxSlide: number;
	images: TImages;

	actions: {
		goToSlide: (newValue: number) => void;
		nextSlide: () => void;
		previousSlide: () => void;
	};
};

export type CarouselStoreApi<TImages extends ImagesType = ImagesType> =
	StoreApi<CarouselStore<TImages>>;

export type CarouselProviderProps<TImages extends ImagesType> = {
	children: React.ReactNode;
	images: CarouselStore<TImages>["images"];
	onSlideBtnClick?: () => void;
};

// Carousel component types
export type CarouselContentProps = {
	children: React.ReactNode;

	classNames?: {
		base?: string;
		scrollContainer?: string;
	};

	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	shouldPauseOnHover?: boolean;
};

export type CarouselButtonsProps = {
	type: "prev" | "next";

	icon?: React.ReactNode;

	classNames?: {
		base?: string;
		iconContainer?: string;
		icon?: string;
	};
};

export type CarouselIndicatorProps = {
	classNames?: {
		base?: string;
		onActive?: string;
	};
	currentIndex: number;
};

type CarouselWrapperProps<TArray extends unknown[]> = {
	each?: TArray;
	render: RenderPropFn<TArray>;
};

export type CarouselItemWrapperProps<TArray extends unknown[]> =
	CarouselWrapperProps<TArray> & {
		className?: string;
	};

export type CarouselIndicatorWrapperProps<TArray extends unknown[]> =
	CarouselWrapperProps<TArray> & {
		classNames?: {
			base?: string;
			indicatorContainer?: string;
		};
	};

export type OtherCarouselProps = {
	children: React.ReactNode;
	className?: string;
};
