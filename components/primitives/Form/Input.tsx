import React from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <input
          className={cn(
            "py-2 px-3 text-sm placeholder:text-sm block w-full border border-[#D0D5DD] bg-white rounded-md outline-0 focus:border-abeg-green-20 placeholder:text-abeg-neutral-50 text-abeg-neutral-10 disabled:bg-[#F0F2F5] disabled:border-[#D0D5DD]",
            {
              "pr-[32px]": type === "password",
            },
            className,
          )}
          type={type === "password" && showPassword ? "text" : type}
          ref={ref}
          id={id}
          {...rest}
        />
        {type === "password" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-abeg-neutral-50 absolute left-[calc(100%-20px)] top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={() => setShowPassword((curPassword) => !curPassword)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
