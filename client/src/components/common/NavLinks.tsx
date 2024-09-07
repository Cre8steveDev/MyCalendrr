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
        className="text-gray-600 transition-all duration-500 ease-in-out hover:text-primary-green"
      >
        {label}
      </a>
    </li>
  );
};

export default NavLinks;
