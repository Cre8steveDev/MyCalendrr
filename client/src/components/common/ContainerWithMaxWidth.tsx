import { ReactNode } from 'react';

type DivContainerProps = {
  children: ReactNode;
  className?: string;
  otherProps?: React.HTMLAttributes<HTMLDivElement>;
  maxWidth?: string;
  defaultPadding?: string;
  id?: string;
};

/**
 * Div Container with Max-width constraints
 * @returns JSX Element to View
 */

const ContainerWithMaxWidth: React.FC<DivContainerProps> = ({
  children,
  className,
  id,
  maxWidth = 'md:max-w-[1280px]',
  otherProps = {},
  defaultPadding = 'sm:px-16 py-4',
}) => {
  return (
    <div
      id={id}
      {...otherProps}
      className={`mx-auto ${defaultPadding}   ${className} ${maxWidth}`}
    >
      {children}
    </div>
  );
};

export default ContainerWithMaxWidth;
