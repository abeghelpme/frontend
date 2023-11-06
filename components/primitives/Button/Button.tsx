import { forwardRef } from "react";

interface ButtonProps {
    className: string;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    size: "sm" | "base" | "lg";
  variant: "primary" | "secondary" | "danger";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, disabled, onClick, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
