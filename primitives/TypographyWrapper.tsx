import React, { ReactNode } from 'react';

interface Iprops {
  className?: string;
  size?: string;
  children?: ReactNode;
}

const TypographyWrapper: React.FC<Iprops> = ({
  children,
  className,
  size = 'sm',
  ...props
}) => {
  return (
    <span className={`prose, prose-${size}, ${className}`} {...props}>
      {children}
    </span>
  );
};

export default TypographyWrapper;
