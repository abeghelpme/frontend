import { useEffect, useRef, useState } from "react";
import { checkIsDeviceMobileOrTablet } from "../helpers/checkIsDeviceMobileOrTablet";
import { cn } from "../helpers/cn";
import { useCallbackRef } from "./useCallbackRef";

const updateCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "grabbing";
	element.style.userSelect = "none";
};

const handleScrollSnap = <TElement extends HTMLElement>(
	element: TElement,
	action: "reset" | "remove"
) => {
	if (action === "remove") {
		element.style.scrollSnapType = "none";
		return;
	}

	element.style.scrollSnapType = "";
};

const resetCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "";
	element.style.userSelect = "";
};

const useDragScroll = <TElement extends HTMLElement>(options?: {
	isDesktopOnly: boolean;
}) => {
	const { isDesktopOnly = false } = options ?? {};

	const dragContainerRef = useRef<TElement>(null);
	const positionRef = useRef({ top: 0, left: 0, x: 0, y: 0 });

	const handleMouseMove = useCallbackRef<MouseEvent>((event) => {
		if (!dragContainerRef.current) return;

		const dx = event.clientX - positionRef.current.x;
		const dy = event.clientY - positionRef.current.y;

		dragContainerRef.current.scrollTop = positionRef.current.top - dy;
		dragContainerRef.current.scrollLeft = positionRef.current.left - dx;
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

		if (isDesktopOnly && window.innerWidth < 768) return;

		positionRef.current = {
			left: dragContainerRef.current.scrollLeft,
			top: dragContainerRef.current.scrollTop,
			x: event.clientX,
			y: event.clientY,
		};

		updateCursor(dragContainerRef.current);
		dragContainerRef.current.addEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.addEventListener("mouseup", handleMouseUpOrLeave);
		dragContainerRef.current.addEventListener(
			"mouseleave",
			handleMouseUpOrLeave
		);
	});

	useEffect(() => {
		const { isMobileOrTablet } = checkIsDeviceMobileOrTablet();

		if (!dragContainerRef.current) return;

		if (!isMobileOrTablet) {
			handleScrollSnap(dragContainerRef.current, "remove");
		} else {
			handleScrollSnap(dragContainerRef.current, "reset");
		}
	}, []);

	const dragScrollProps = {
		ref: dragContainerRef,
		onMouseDown,
	};

	const dragContainerClasses = cn(
		`flex w-full cursor-grab snap-x snap-mandatory flex-row overflow-x-scroll hide-scrollbar [scrollbar-width:none]`,
		isDesktopOnly && "max-md:cursor-default max-md:flex-col"
	);

	const dragItemClasses = "snap-center snap-always" as const;

	return { dragContainerClasses, dragScrollProps, dragItemClasses };
};

export { useDragScroll };
