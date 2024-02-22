import type { SignUpProps } from "@/interfaces";
import React from "react";
import type { FieldErrors } from "react-hook-form";

type FormErrorMessageProps = {
	error: FieldErrors<SignUpProps>;
	errorMsg: string;
};
const FormErrorMessage = ({ error, errorMsg }: FormErrorMessageProps) => {
	return error && <p className="text-abeg-primary">{errorMsg}</p>;
};

export default FormErrorMessage;
