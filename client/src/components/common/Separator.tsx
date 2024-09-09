/**
 * Separator Component
 * @returns
 */

type SeparatorType = {
  className?: string;
  color?: string;
};

const Separator: React.FC<SeparatorType> = ({ color, className }) => {
  return (
    <hr
      className={`${className} ${
        color ? color : 'border-slate-400'
      } w-full border-1 my-3`}
    />
  );
};

export default Separator;
