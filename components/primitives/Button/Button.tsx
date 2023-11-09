import React, { forwardRef } from "react";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  className: string;
  disabled?: boolean;
  children: React.ReactNode;
  size?: "sm" | "base" | "lg";
  variant?: "primary" | "secondary" | "danger";
}

// const buttonClass = cl

const Button = (
  { className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button className={className} ref={ref} {...props}>
      {children}
    </button>
  );
};

export default forwardRef(Button);
