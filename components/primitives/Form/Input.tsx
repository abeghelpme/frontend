import type { SignUpProps } from "@/interfaces/formInputs";
import { cn } from "@/lib/utils/cn";
import eye from "@/public/assets/icons/auth/eye.svg";
import slashEye from "@/public/assets/icons/auth/slashEye.svg";
import Image from "next/image";
import React, { forwardRef, useState, type MouseEventHandler } from "react";
import type { FieldErrors } from "react-hook-form";

type InputProps = { errorField?: FieldErrors<SignUpProps> | string };
type TInputProps = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ id, type, className, errorField, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      setShowPassword((curPassword) => !curPassword);
    };

    return (
      <div className="relative">
        <input
          className={cn(
            "py-3 px-3 text-sm placeholder:text-sm block w-full border border-[#D0D5DD] bg-white rounded-md outline-0 focus:border-abeg-green-20 placeholder:text-abeg-neutral-50 text-abeg-neutral-10 disabled:bg-[#F0F2F5] disabled:border-[#D0D5DD]",
            {
              "pr-[32px]": type === "password",
              "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20":
                errorField,
            },
            className,
          )}
          type={type === "password" && showPassword ? "text" : type}
          ref={ref}
          id={id}
          {...props}
        />
        {type === "password" && (
          <button
            onClick={handleToggle}
            className="w-5 h-5 text-abeg-neutral-50 absolute left-[calc(100%-20px)] top-1/2 -translate-x-1/2 -translate-y-1/2"
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
  },
);

Input.displayName = "Input";

export default Input;
