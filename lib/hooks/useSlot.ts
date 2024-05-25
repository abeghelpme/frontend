import { Children, isValidElement, useMemo } from "react";

type Noop = () => void;
type WithSlot = { slot?: string };

/**
 * Checks if a React child element matches the specified SlotWrapper.
 * @param child - The React child element to check.
 * @param SlotWrapper - The React component or element type representing the SlotWrapper.
 * @returns True if the child element matches the SlotWrapper, false otherwise.
 */
const isSlotElement = (
	child: React.ReactNode,
	SlotWrapper: React.ElementType
) => {
	if (!isValidElement(child)) {
		return false;
	}

	if ((child.type as WithSlot).slot === (SlotWrapper as WithSlot).slot) {
		return true;
	}

	if ((child.type as Noop).name === (SlotWrapper as Noop).name) {
		return true;
	}

	return child.type === SlotWrapper;
};

/**
 * Custom hook that finds and returns a slot element from the given list of children, which you can then render in the spot you desire within a given component.
 * A slot element is a React element that matches the specified SlotWrapper component.
 *
 * @param children - The children array to search for the slot element.
 * @param SlotWrapper - The component type to match against the slot element.
 * @returns - The found slot element.
 */

/**
 * Sample that demonstrates the use case of the `useSlot` hook.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useSlot } from './useSlot';
 *
 * // Parent component that renders children and looks for a slot
 * const ParentComponent = ({ children }) => {
 *   // Use the hook to get the slot
 *   const HeaderSlot = useSlot(children, Header);
 *
 *   return (
 *     <div>
 *       <h1>Parent Component</h1>
 * 		// Render the slot where you wish
 *       {HeaderSlot}
 *     </div>
 *   );
 * };
 *
 *  // Define a slot wrapper component for identification
 * const Header = ({ children }) => children;
 * Header.slot = Symbol.for('header'); // For uniqueness, although optional
 * ParentComponent.Header = Header
 *
 * // Usage within another component
 * const App = () => (
 *  <ParentComponent>
 * 	<Footer>
 * 		This is a footer
 * 	</Footer>
 *
 * 	{ // Now it won't matter where you use the ParentComponent.Header, it will always be rendered in the right place within the ParentComponent 😉}
 * 	<ParentComponent.Header>
 * 		<div>This is a header slot content.</div>
 * 	</ParentComponent.Header>
 *  </ParentComponent>
 * );
 * ```
 */

const useSlot = <TProps extends Record<string, unknown>>(
	children: React.ReactNode,
	SlotWrapper: React.ElementType<TProps>
) => {
	const Slot = useMemo(() => {
		const childrenArray = Children.toArray(children);
		return childrenArray.find((child) => isSlotElement(child, SlotWrapper));
	}, [children, SlotWrapper]);

	return Slot as React.ReactElement<TProps>;
};

export { useSlot };
