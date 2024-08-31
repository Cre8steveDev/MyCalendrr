/**
 * Header Component for the Landing Page
 * Renders the Navigation of the Title and Header
 * @returns
 */

import { useNavigate } from 'react-router-dom';
import ContainerWithMaxWidth from '../common/ContainerWithMaxWidth';

const Header = () => {
  const navigate = useNavigate();

  // Return JSX to view
  return (
    <header className="bg-white shadow-md font-poppins w-full ">
      <ContainerWithMaxWidth className="flex justify-between items-center">
        <div
          role="button"
          onClick={() => navigate('/')}
          className="text-2xl  text-primary-green font-extrabold font-poppins hover:text-primary-orange transition-all duration-500 ease-in-out"
        >
          MyCalendrr
          <span className="text-primary-orange text-4xl hover:text-primary-green transition-all duration-500 ease-in-out">
            .
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#features"
                className="text-gray-600 hover:text-primary-green transition-all duration-500 ease-in-out"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-primary-green transition-all duration-500 ease-in-out"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-600 hover:text-primary-green transition-all duration-500 ease-in-out"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-600 hover:text-primary-green transition-all duration-500 ease-in-out"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <a
            href="#login"
            className="text-primary-green hover:text-primary-orange mr-4 transition-all duration-500 ease-in-out"
          >
            Log In
          </a>
          <a
            href="#signup"
            className="bg-primary-green text-white px-4 py-2 rounded hover:text-primary-green hover:bg-secondary-green transition-all duration-500 ease-in-out"
          >
            Sign Up
          </a>
        </div>
      </ContainerWithMaxWidth>
    </header>
  );
};

export default Header;
