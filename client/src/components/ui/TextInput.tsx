import { ReactNode } from 'react';

type TextInputProp = {
  type: React.HTMLInputTypeAttribute | undefined;
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
  iconComponent?: ReactNode;
  className?: string;
  otherProps?: React.HTMLAttributes<HTMLInputElement>;
};

/**
 * TextInput Component
 * @returns
 */
const TextInput: React.FC<TextInputProp> = ({
  type,
  value,
  onChange,
  className,
  placeholder,
  iconComponent,
  otherProps = {},
}) => {
  return (
    <div className="max-w-[500px] mx-auto">
      <input
        type={type}
        value={value}
        {...otherProps}
        placeholder={placeholder}
        onChange={(event) => onChange(event.currentTarget.value)}
        className={`${className} w-full px-4 py-2 rounded-md outline-none`}
      />
      {iconComponent}
    </div>
  );
};

export default TextInput;
