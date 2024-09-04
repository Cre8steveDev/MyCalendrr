import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactNode;
  primary?: boolean;
  route?: string;
  onClick?: () => void;
  className?: string;
  otherProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

/**
 * Reusable Button Component
 * @returns
 */
const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  route,
  onClick,
  className,
  otherProps,
}) => {
  const primaryBtnClass =
    'border-primary-green bg-primary-green text-white hover:text-primary-green hover:bg-white hover:border-primary-green hover:cursor-secondary';

  const secondaryBtnClass =
    'border-primary-orange text-primary-orange hover:text-white hover:bg-primary-orange hover:border-primary-orange hover:cursor-custom';

  // Return JSX Element to DOM
  return (
    <Link to={route!}>
      <button
        {...otherProps}
        onClick={onClick}
        className={`px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ease-in duration-300 ${
          primary ? primaryBtnClass : secondaryBtnClass
        } ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
