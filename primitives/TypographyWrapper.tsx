import React, { type ReactNode } from "react";

interface TypographyWrapperprops {
  className?: string;
  size?: "sm" | "base" | "lg";
  children?: ReactNode;
}

const TypographyWrapper: React.FC<TypographyWrapperprops> = ({
  children,
  className,
  size = "base",
  ...props
}) => {
  return (
    <span className={`prose, prose-${size}, ${className}`} {...props}>
      {children}
    </span>
  );
};

export default TypographyWrapper;
