import type {
	ForgotPasswordProps,
	LoginProps,
	ResetPasswordProps,
	SignUpProps,
} from "@/interfaces";
import { cn } from "@/lib";
import eye from "@/public/assets/icons/auth/eye.svg";
import slashEye from "@/public/assets/icons/auth/slashEye.svg";
import Image from "next/image";
import React, { forwardRef, useState, type MouseEventHandler } from "react";
import type { FieldErrors } from "react-hook-form";

type InputProps = {
	errorField?: FieldErrors<SignUpProps> | string;
	searchInputClassName?: string;
};
type TInputProps = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, TInputProps>(
	(
		{ id, type, className, errorField, searchInputClassName, ...props },
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);

		const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
			e.preventDefault();
			setShowPassword((curPassword) => !curPassword);
		};

		return (
			<div className={cn("relative", searchInputClassName)}>
				<input
					className={cn(
						"block w-full rounded-md border border-inputBorder bg-white px-3 py-3 text-abeg-neutral-10 outline-0 placeholder:text-sm placeholder:text-abeg-neutral-50 focus:border-inputBorder disabled:border-[#D0D5DD] disabled:bg-[#F0F2F5] ",
						{
							"pr-[32px]": type === "password",
							// 'md:h-DInputField h-MInputField': type !== 'checkbox' || type !== 'radio',
							"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20":
								errorField,
						},
						className
					)}
					type={type === "password" && showPassword ? "text" : type}
					ref={ref}
					id={id}
					{...props}
				/>
				{type === "password" && (
					<button
						type="button"
						onClick={handleToggle}
						className="absolute left-[calc(100%-20px)] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-abeg-neutral-50"
					>
						{showPassword ? (
							<Image
								src={slashEye as string}
								width={24}
								height={24}
								alt="hide password"
							/>
						) : (
							<Image
								src={eye as string}
								width={24}
								height={24}
								alt="show password"
							/>
						)}
					</button>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
