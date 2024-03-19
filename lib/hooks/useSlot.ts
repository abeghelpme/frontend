import React, { Children, isValidElement, useMemo } from "react";

const isSlotInstance = (
	child: React.ReactNode,
	SlotWrapper: React.ElementType
) => {
	return isValidElement(child) && child.type === SlotWrapper;
};

const useSlot = (children: React.ReactNode, SlotWrapper: React.ElementType) => {
	const SlotInstance = useMemo(() => {
		const childrenArray = Children.toArray(children);

		return childrenArray.find((child) =>
			isSlotInstance(child, SlotWrapper)
		) as React.ReactElement;
	}, [children, SlotWrapper]);

	return SlotInstance;
};

export { useSlot };
