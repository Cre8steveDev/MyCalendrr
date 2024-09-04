import { HTMLAttributes, ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  otherProps?: HTMLAttributes<HTMLDivElement>;
};
/**
 * Section Container Component
 * Reduce Boilerplate repeating of same features
 * @returns JSX Component to the DOM
 */
const SectionContainer: React.FC<SectionProps> = ({
  children,
  className,
  otherProps,
}) => {
  return (
    <section
      {...otherProps}
      className={`w-full flex flex-col justify-center cursor-default ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
