import type { EachProp, ForRenderProps } from "@/lib/hooks/useElementList/For";
import type { Prettify } from "@/lib/type-helpers";
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

type BaseWrapperProps<TArray extends unknown[]> = Prettify<
	ForRenderProps<TArray> & Partial<EachProp<TArray>>
>;

export type CarouselItemWrapperProps<TArray extends unknown[]> =
	BaseWrapperProps<TArray> & {
		className?: string;
	};

export type CarouselIndicatorWrapperProps<TArray extends unknown[]> =
	BaseWrapperProps<TArray> & {
		classNames?: {
			base?: string;
			indicatorContainer?: string;
		};
	};

export type OtherCarouselProps = {
	children: React.ReactNode;
	className?: string;
};
