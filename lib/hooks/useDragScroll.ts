import { useEffect, useRef } from "react";
import { checkIsDeviceMobileOrTablet } from "../helpers/checkIsDeviceMobileOrTablet";
import { cn } from "../helpers/cn";
import { useCallbackRef } from "./useCallbackRef";

/* eslint-disable no-param-reassign */

const updateCursor = <TElement extends HTMLElement>(element: TElement) => {
	element.style.cursor = "grabbing";
	element.style.userSelect = "none";
};

const handleScrollSnap = <TElement extends HTMLElement>(
	action: "reset" | "remove",
	element: TElement
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

type UseDragScrollOptions = {
	usage?: "desktopOnly" | "mobileAndTabletOnly" | "allScreens";
	dragOrientation?: "horizontal" | "vertical" | "both";
};

const useDragScroll = <TElement extends HTMLElement>(options: UseDragScrollOptions = {}) => {
	const { usage = "allScreens", dragOrientation = "horizontal" } = options;

	const dragContainerRef = useRef<TElement>(null);
	const positionRef = useRef({ top: 0, left: 0, x: 0, y: 0 });

	const handleMouseMove = useCallbackRef<MouseEvent>((event) => {
		if (!dragContainerRef.current) return;

		if (dragOrientation === "horizontal" || dragOrientation === "both") {
			// == calculate the current change in the horizontal scroll position based on the difference between the previous mouse position and the new mouse position
			const dx = event.clientX - positionRef.current.x;

			// == Assign the scrollLeft of the container to the difference between its previous horizontal scroll position and the change in the mouse position
			dragContainerRef.current.scrollLeft = positionRef.current.left - dx;
		}

		if (dragOrientation === "vertical" || dragOrientation === "both") {
			// == calculate the current change in the vertical scroll position based on the difference between the previous mouse position and the new mouse position
			const dy = event.clientY - positionRef.current.y;

			// == Assign the scrollTop of the container to the difference between its previous vertical scroll position and the change in the mouse position
			dragContainerRef.current.scrollTop = positionRef.current.top - dy;
		}
	});

	const handleMouseUpOrLeave = useCallbackRef<MouseEvent>(() => {
		if (!dragContainerRef.current) return;

		dragContainerRef.current.removeEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.removeEventListener("mouseup", handleMouseUpOrLeave);
		dragContainerRef.current.removeEventListener("mouseleave", handleMouseUpOrLeave);

		resetCursor(dragContainerRef.current);
	});

	const onMouseDown = useCallbackRef((event: React.MouseEvent<TElement>) => {
		if (usage === "mobileAndTabletOnly" && window.innerWidth >= 768) return;
		if (usage === "desktopOnly" && window.innerWidth < 768) return;

		if (!dragContainerRef.current) return;

		// == Update all initial position properties stored in the positionRef
		if (dragOrientation === "horizontal" || dragOrientation === "both") {
			positionRef.current.x = event.clientX;
			positionRef.current.left = dragContainerRef.current.scrollLeft;
		}

		if (dragOrientation === "vertical" || dragOrientation === "both") {
			positionRef.current.y = event.clientY;
			positionRef.current.top = dragContainerRef.current.scrollTop;
		}

		updateCursor(dragContainerRef.current);
		dragContainerRef.current.addEventListener("mousemove", handleMouseMove);
		dragContainerRef.current.addEventListener("mouseup", handleMouseUpOrLeave);
		dragContainerRef.current.addEventListener("mouseleave", handleMouseUpOrLeave);
	});

	useEffect(() => {
		const { isMobileOrTablet } = checkIsDeviceMobileOrTablet();

		if (!dragContainerRef.current) return;

		if (!isMobileOrTablet) {
			handleScrollSnap("remove", dragContainerRef.current);
		} else {
			handleScrollSnap("reset", dragContainerRef.current);
		}
	}, []);

	const dragScrollProps = {
		ref: dragContainerRef,
		onMouseDown,
	};

	const dragContainerClasses = cn(
		"scrollbar-hide flex cursor-grab snap-x snap-mandatory flex-row overflow-y-clip overflow-x-scroll px-4 md:px-[80px]",
		dragOrientation === "horizontal" && "w-full flex-row",
		dragOrientation === "vertical" && "flex-col",
		usage === "mobileAndTabletOnly" && "md:cursor-default md:flex-col",
		usage === "desktopOnly" && "max-md:cursor-default max-md:flex-col"
	);

	const dragItemClasses = "snap-center";

	return { dragContainerClasses, dragScrollProps, dragItemClasses };
};

export { useDragScroll };
