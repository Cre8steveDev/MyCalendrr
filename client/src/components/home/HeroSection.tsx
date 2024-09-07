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
    <SectionContainer className="p-8 sm:h-screen sm:p-0">
      <h1 className="w-[95%] text-center font-poppins text-2xl font-bold sm:w-[full] md:text-4xl">
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
      <p className="mx-auto mt-2 max-w-[600px] text-center font-poppins text-sm transition-opacity duration-300 ease-in-out hover:opacity-85 sm:text-xl">
        Create an Appointment Page, Manage your bookings and get paid - all in
        one place!
      </p>

      {/* CTA Buttons */}
      <div
        role="form"
        className="mx-auto my-6 flex w-full justify-center gap-2 sm:gap-5"
      >
        <Button
          route="/docs"
          primary={false}
          className="text-xs sm:w-[150px] sm:text-base"
        >
          View Our Docs
        </Button>

        <Button
          route="/dashboard"
          primary
          className="text-xs sm:w-[150px] sm:text-base"
        >
          Get Started
        </Button>
      </div>

      {/* Hero Section Image */}
      <div className="mx-auto w-full max-w-[900px] animate-loading cursor-custom overflow-hidden rounded-md object-cover drop-shadow-2xl sm:rounded-[2.5rem]">
        <img
          src={HeroImage}
          alt="Image for Hero Section"
          className="cursorim w-full transition-transform duration-500 ease-linear hover:scale-105"
        />
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
