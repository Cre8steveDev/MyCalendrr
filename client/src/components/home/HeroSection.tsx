/**
 * Hero Section Component
 * @returns
 */

import { HeroImage } from '../../assets';
import Button from '../common/Button';
import SectionContainer from '../common/SectionContainer';

const HeroSection = () => {
  // Compose Reusable class string for hover opacity
  const hoverOpacity =
    'hover:opacity-70 transition-opacity ease-in-out duration-300 cursor-pointer';

  // Return JSX Component
  return (
    <SectionContainer className="p-8 sm:p-0 sm:h-screen">
      <h1 className="text-center font-poppins font-bold text-2xl  md:text-4xl w-[95%] sm:w-[full]">
        <span
          className={`sm:block w-full text-center text-green-500 ${hoverOpacity}`}
        >
          Seamlessly Manage Your{'  '}
        </span>
        <span
          className={`sm:block w-full text-center text-primary-green ${hoverOpacity}`}
        >
          Appointments Conveniently{'  '}
        </span>
        <span
          className={`sm:block w-full text-center text-primary-orange ${hoverOpacity}`}
        >
          with <span>MyCalendrr.</span>
        </span>
      </h1>
      <p className="text-center mt-2 text-sm sm:text-xl font-poppins max-w-[600px] mx-auto hover:opacity-85 transition-opacity ease-in-out duration-300">
        Create an Appointment Page, Manage your bookings and get paid - all in
        one place!
      </p>

      {/* CTA Buttons */}
      <div
        role="form"
        className="flex gap-2 sm:gap-5 mx-auto my-6 w-full justify-center"
      >
        <Button
          route="/docs"
          primary={false}
          className="text-xs sm:text-base sm:w-[150px]"
        >
          View Our Docs
        </Button>

        <Button
          route="/dashboard"
          primary
          className="text-xs sm:text-base sm:w-[150px]"
        >
          Get Started
        </Button>
      </div>

      {/* Hero Section Image */}
      <div className="rounded-md sm:rounded-[2.5rem] object-cover w-full max-w-[900px] mx-auto overflow-hidden drop-shadow-2xl animate-loading cursor-custom">
        <img
          src={HeroImage}
          alt="Image for Hero Section"
          className="w-full hover:scale-105 transition-transform duration-500 ease-linear cursorim"
        />
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
