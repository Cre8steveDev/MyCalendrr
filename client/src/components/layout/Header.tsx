/**
 * Header Component for the Landing Page
 * Renders the Navigation of the Title and Header
 * @returns
 */

import { Link, useNavigate } from 'react-router-dom';
import ContainerWithMaxWidth from '../common/ContainerWithMaxWidth';
import NavLinks from '../common/NavLinks';

const Header = () => {
  const navigate = useNavigate();

  // Return JSX to view
  return (
    <header className="sticky top-0 w-full bg-white font-poppins shadow-md z-10">
      <ContainerWithMaxWidth className=" flex items-center justify-between px-4 sm:px-0">
        <div
          role="button"
          onClick={() => navigate('/')}
          className="font-poppins text-2xl font-extrabold text-primary-green transition-all duration-500 ease-in-out hover:text-primary-orange"
        >
          MyCalendrr
          <span className="text-4xl text-primary-orange transition-all duration-500 ease-in-out hover:text-primary-green">
            .
          </span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavLinks label="Features" route="#features" />
            <NavLinks label="Pricing" route="#pricing" />
            <NavLinks label="About Us" route="#about" />
            <NavLinks label="Contact" route="/contact" />
          </ul>
        </nav>
        <div>
          <Link
            to="/login"
            className="mr-4 text-xs text-primary-green transition-all duration-500 ease-in-out hover:text-primary-orange sm:text-base"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="rounded bg-primary-green px-4 py-2 text-xs text-white transition-all duration-500 ease-in-out hover:bg-secondary-green hover:text-primary-green sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </ContainerWithMaxWidth>
    </header>
  );
};

export default Header;
