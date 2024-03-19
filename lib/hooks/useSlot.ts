import { Children, isValidElement, useMemo } from "react";

type Noop = () => void;

const isSlotInstance = (
	child: React.ReactNode,
	SlotWrapper: React.ElementType
) => {
	return (
		isValidElement(child) &&
		(child.type === SlotWrapper ||
			(child.type as Noop).name === (SlotWrapper as Noop).name)
	);
};

const useSlot = <TProps extends Record<string, unknown>>(
	children: React.ReactNode,
	SlotWrapper: React.ElementType<TProps>
) => {
	const Slot = useMemo(() => {
		const childrenArray = Children.toArray(children);

		return childrenArray.find((child) => isSlotInstance(child, SlotWrapper));
	}, [children, SlotWrapper]);

	return Slot as React.ReactElement<TProps>;
};

export { useSlot };
