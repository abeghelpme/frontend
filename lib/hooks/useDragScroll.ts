import { useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

/* eslint-disable no-param-reassign */
const updateCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "grabbing";
	element.style.userSelect = "none";
};

const resetCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "grab";
	element.style.userSelect = "auto";
};

const useDragScroll = <TElement extends HTMLElement>(options?: {
	hasMobileSupport: boolean;
}) => {
	const { hasMobileSupport = false } = options ?? {};

	const dragContainerRef = useRef<TElement>(null);
	const positionRef = useRef({ top: 0, left: 0, x: 0, y: 0 });

	const handleMouseMove = useCallbackRef<MouseEvent>((event) => {
		if (!dragContainerRef.current) return;

		const dx = event.clientX - positionRef.current.x;
		const dy = event.clientY - positionRef.current.y;

		dragContainerRef.current.scrollTop = positionRef.current.top - dy;
		dragContainerRef.current.scrollLeft = positionRef.current.left - dx;

		updateCursor(dragContainerRef.current);
	});

	const handleMouseUpOrLeave = useCallbackRef<MouseEvent>(() => {
		if (!dragContainerRef.current) return;

		dragContainerRef.current.removeEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.removeEventListener(
			"mouseup",
			handleMouseUpOrLeave
		);
		dragContainerRef.current.removeEventListener(
			"mouseleave",
			handleMouseUpOrLeave
		);

		resetCursor(dragContainerRef.current);
	});

	const onMouseDown = useCallbackRef((event: React.MouseEvent<TElement>) => {
		if (!dragContainerRef.current) return;

		positionRef.current = {
			left: dragContainerRef.current.scrollLeft,
			top: dragContainerRef.current.scrollTop,
			x: event.clientX,
			y: event.clientY,
		};

		dragContainerRef.current.addEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.addEventListener("mouseup", handleMouseUpOrLeave);
		dragContainerRef.current.addEventListener(
			"mouseleave",
			handleMouseUpOrLeave
		);
	});

	const onTouchMove = useCallbackRef((event: TouchEvent) => {
		if (!dragContainerRef.current) return;

		const touch = event.touches[0];

		const dx = touch.clientX - positionRef.current.x;
		const dy = touch.clientY - positionRef.current.y;

		dragContainerRef.current.scrollTop = positionRef.current.top - dy;
		dragContainerRef.current.scrollLeft = positionRef.current.left - dx;
	});

	const onTouchEnd = useCallbackRef<TouchEvent>(() => {
		if (!dragContainerRef.current) return;

		dragContainerRef.current.removeEventListener("touchmove", onTouchMove);
		dragContainerRef.current.removeEventListener("touchend", onTouchEnd);
	});

	const onTouchStart = useCallbackRef<React.TouchEvent<TElement>>((event) => {
		if (!dragContainerRef.current) return;

		const touch = event.touches[0];

		positionRef.current = {
			left: dragContainerRef.current.scrollLeft,
			top: dragContainerRef.current.scrollTop,
			x: touch.clientX,
			y: touch.clientY,
		};

		dragContainerRef.current.addEventListener("touchmove", onTouchMove);
		dragContainerRef.current.addEventListener("touchend", onTouchEnd);
	});

	return {
		dragScrollProps: {
			ref: dragContainerRef,
			onMouseDown,
			...(hasMobileSupport && { onTouchStart }),
		},
		dragContainerClasses:
			"w-full flex cursor-grab overflow-x-scroll [scrollbar-width:none] hide-scrollbar",
	};
};

export { useDragScroll };
