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
    <li>
      <a href={route} className={`text-sm hover:text-blue-300 ${className}`}>
        {label}
      </a>
    </li>
  );
};

export default QuickLinks;
