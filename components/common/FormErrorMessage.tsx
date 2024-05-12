import type { SignUpProps } from "@/interfaces";
import { memo } from "react";
import type { FieldErrors } from "react-hook-form";
import { ProgressBar } from "../ui";

type FormErrorMessageProps = {
	error?: FieldErrors<SignUpProps>;
	errorMsg?: string;
	isForPasswordStrength?: boolean;
	result?: number;
};
const FormErrorMessage = memo(
	({
		error,
		errorMsg,
		isForPasswordStrength,
		result,
	}: FormErrorMessageProps) => {
		if (isForPasswordStrength && result) {
			return (
				<div>
					<ProgressBar
						value={result * 25}
						className={`${
							result < 2
								? "progress-filled:bg-red-500"
								: result >= 2 && result <= 3
								  ? "progress-filled:bg-yellow-500"
								  : "progress-filled:bg-green-500"
						}`}
					/>
					<p
						className={`${
							result <= 2
								? "text-text-red"
								: result >= 2 && result <= 3
								  ? "text-yellow-500"
								  : "text-green-500"
						} text-sm`}
					>
						<span className="text-black">Password strength:</span>
						&nbsp;
						{result < 2
							? "Weak"
							: result >= 2 && result <= 3
							  ? "Medium"
							  : "Strong"}
					</p>
				</div>
			);
		} else
			return error && <p className="text-abeg-error-20 text-xs">{errorMsg}</p>;
	}
);

export default FormErrorMessage;
