/**
 * Header Component for the Landing Page
 * Renders the Navigation of the Title and Header
 * @returns
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import ContainerWithMaxWidth from '../common/ContainerWithMaxWidth';
import NavLinks from '../common/NavLinks';
import { useLogout, useUser } from '@/hooks/useAppStore';

const Header = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const user = useUser();
  const logout = useLogout();

  // Return JSX to view
  return (
    <header className="sticky top-0 z-10 w-full bg-white font-poppins shadow-md">
      <ContainerWithMaxWidth className="flex items-center justify-between px-4 sm:px-0">
        <div
          role="button"
          onClick={() => navigate('/')}
          className="font-poppins text-xl font-extrabold text-primary-green transition-all duration-500 ease-in-out hover:text-primary-orange sm:text-2xl"
        >
          MyCalendrr
          <span className="text-4xl text-primary-orange transition-all duration-500 ease-in-out hover:text-primary-green">
            .
          </span>
        </div>
        {!pathname.includes('/dashboard') && (
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <NavLinks label="Features" route="/#features" />
              <NavLinks label="Pricing" route="/#pricing" />
              <NavLinks label="About Us" route="/#about" />
              <NavLinks label="Contact" route="/contact" />
            </ul>
          </nav>
        )}
        {!user && (
          <div>
            <Link
              to="/login"
              className="mr-4 text-xs text-primary-green transition-all duration-500 ease-in-out hover:text-primary-orange sm:text-base"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded bg-primary-green px-2 py-1 text-xs text-white transition-all duration-500 ease-in-out hover:bg-secondary-green hover:text-primary-green sm:px-4 sm:py-2 sm:text-base"
            >
              Sign Up
            </Link>
          </div>
        )}

        {user && (
          <div className="flex gap-2">
            <Link
              to="/dashboard"
              className="rounded bg-primary-green px-2 py-1 text-xs text-white transition-all duration-500 ease-in-out hover:bg-secondary-green hover:text-primary-green sm:px-4 sm:py-2 sm:text-base"
            >
              Dashboard
            </Link>

            {/* Signout Button  */}
            <button
              onClick={logout}
              className="rounded bg-primary-orange px-2 py-1 text-xs text-white transition-all duration-500 ease-in-out hover:bg-secondary-green hover:text-primary-green sm:px-4 sm:py-2 sm:text-base"
            >
              Sign Out
            </button>
          </div>
        )}
      </ContainerWithMaxWidth>
    </header>
  );
};

export default Header;
