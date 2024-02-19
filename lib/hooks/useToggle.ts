import { useCallback, useState } from "react";

type InitialStateType = boolean | (() => boolean);

const useToggle = (initialValue?: InitialStateType) => {
	const [value, setValue] = useState(initialValue ?? false);

	const toggle = useCallback((value?: boolean) => {
		if (value) {
			setValue(value);
			return;
		}

		setValue((prev) => !prev);
	}, []);

	return [value, toggle] as const;
};

export { useToggle };
