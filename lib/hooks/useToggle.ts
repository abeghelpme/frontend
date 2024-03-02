import { useCallback, useState } from "react";

type InitialStateType = boolean | (() => boolean);

const useToggle = (initialValue?: InitialStateType) => {
	const [value, setValue] = useState(initialValue ?? false);

	const toggle = useCallback((newValue?: boolean) => {
		if (newValue) {
			setValue(newValue);
			return;
		}

		setValue((prev) => !prev);
	}, []);

	return [value, toggle] as const;
};

export { useToggle };
