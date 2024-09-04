/**
 * Navigation Links on the Header
 * @returns JsX To view.
 */

type NavType = {
  label: string;
  route: string;
};

const NavLinks: React.FC<NavType> = ({ label, route }) => {
  return (
    <li>
      <a
        href={route}
        className="text-gray-600 hover:text-primary-green transition-all duration-500 ease-in-out"
      >
        {label}
      </a>
    </li>
  );
};

export default NavLinks;
