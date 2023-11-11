import { cn } from "@/lib/utils/cn";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  className: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  size?: "sm" | "base" | "lg";
  variant?: "primary" | "secondary" | "danger";
}

const Button = (
  {
    className,
    children,
    fullWidth,
    variant,
    size,
    disabled,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const buttonClass = {
    "bg-abeg-error-20": variant === "danger",
    "border-abeg-green text-abeg-green border": variant === "secondary",
    "bg-abeg-neutral-20": variant === "primary",
    "px-3": size === "sm",
    "px-10": size === "lg",
    "w-full": fullWidth,
    "bg-abeg-neutral-50 text-white": disabled,
  };

  return (
    <button
      className={cn(
        "px-5 py-2 rounded-lg text-white text-sm font-medium",
        buttonClass,
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
