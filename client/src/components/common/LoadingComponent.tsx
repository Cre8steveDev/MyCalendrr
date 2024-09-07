import { Loader2 } from 'lucide-react';

type LoaderType = {
  message: string;
  className?: string;
};
/**
 * Loading Component
 * @returns
 */

const LoadingComponent: React.FC<LoaderType> = ({ message, className }) => {
  return (
    <div
      className={`${className} w-full h-full p-10  flex items-center justify-center flex-col `}
    >
      <Loader2 className="animate-spin font-bold" size={45} color="green" />
      <p className="mt-2 font-poppins fontbold">{message}</p>
    </div>
  );
};

export default LoadingComponent;
