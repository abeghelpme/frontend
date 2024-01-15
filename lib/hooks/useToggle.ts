import { useCallback, useState } from "react";

type InitialStateType = boolean | (() => boolean);

const useToggle = (initialValue: InitialStateType = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((value?: boolean) => {
    if (typeof value !== "boolean") return;

    if (value !== undefined) {
      setValue(value);
      return;
    }

    setValue((prev) => !prev);
  }, []);

  return [value, toggle] as const;
};

export { useToggle };
