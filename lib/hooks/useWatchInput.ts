import type { SignUpProps } from "@/interfaces";
import { type Control, useWatch } from "react-hook-form";

type watchInputTypes = {
	control: Control<SignUpProps>;
	inputType: keyof SignUpProps;
};
const useWatchInput = ({ control, inputType }: watchInputTypes) => {
	const result = useWatch({ control, name: inputType, defaultValue: "" });
	return result;
};

export default useWatchInput;
