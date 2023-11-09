import React, { ReactNode } from 'react';

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children, level = 1, ...props }) => {
  const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <TitleTag className="font-medium" {...props}>
      {children}
    </TitleTag>
  );
};

export default Title;
