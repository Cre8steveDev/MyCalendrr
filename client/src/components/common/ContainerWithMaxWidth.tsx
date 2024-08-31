import { ReactNode } from 'react';

type DivContainerProps = {
  children: ReactNode;
  className?: string;
  otherProps?: React.HTMLAttributes<HTMLDivElement>;
  maxWidth?: string;
};

/**
 * Div Container with Max-width constraints
 * @returns JSX Element to View
 */

const ContainerWithMaxWidth: React.FC<DivContainerProps> = ({
  children,
  className,
  maxWidth = 'max-w-[1280px]',
  otherProps = {},
}) => {
  return (
    <div
      {...otherProps}
      className={`container mx-auto sm:px-16 py-4   ${className} ${maxWidth}`}
    >
      {children}
    </div>
  );
};

export default ContainerWithMaxWidth;
