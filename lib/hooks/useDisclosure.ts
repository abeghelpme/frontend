import { useCallback } from "react";
import { useToggle } from "./useToggle";

type DisclosureOptions = {
	initialState?: boolean | (() => boolean);
};

const useDisclosure = (options: DisclosureOptions = {}) => {
	const { initialState = false } = options;

	const [isOpen, toggle] = useToggle(initialState);

	const onOpen = useCallback(() => toggle(true), [toggle]);

	const onClose = useCallback(() => toggle(false), [toggle]);

	return { isOpen, onOpen, onClose, onToggle: toggle };
};

export { useDisclosure };
