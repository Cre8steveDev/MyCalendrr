/**
 * Reusable Component for Quicklins in the
 * Footer Section
 * @returns Quick Links Component
 */

type QuickLinksProp = {
  route: string;
  label: string;
  className?: string;
};
const QuickLinks: React.FC<QuickLinksProp> = ({ route, label, className }) => {
  return (
    <li
      className={`text-sm md:text-base hover:text-white transition-colors ease-in-out duration-300 ${className}`}
    >
      <a href={route}>{label}</a>
    </li>
  );
};

export default QuickLinks;
