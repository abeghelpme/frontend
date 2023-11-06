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
  ({ disabled, onClick, className, children, ...props }, ref) => {
    {
      console.log(props);
    }
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
