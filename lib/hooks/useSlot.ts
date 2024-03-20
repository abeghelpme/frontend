import { Children, isValidElement, useMemo } from "react";

type Noop = () => void;
type NoopWithSlot = { slot?: string };

const isSlotInstance = (
	child: React.ReactNode,
	SlotWrapper: React.ElementType
) => {
	if (!isValidElement(child)) {
		return false;
	}

	if (
		(child.type as NoopWithSlot).slot === (SlotWrapper as NoopWithSlot).slot
	) {
		return true;
	}

	if (child.type === SlotWrapper) {
		return true;
	}

	if ((child.type as Noop).name === (SlotWrapper as Noop).name) {
		return true;
	}
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
