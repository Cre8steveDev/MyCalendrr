/**
 * Hero Section Component
 * @returns
 */

import { HeroImage } from '../../assets';
import Button from '../common/Button';

const HeroSection = () => {
  const hoverOpacity =
    'hover:opacity-70 transition-opacity ease-in-out duration-300 cursor-pointer';

  // Return JSX Component
  return (
    <section className="w-full h-screen max-h-[900px] flex flex-col justify-center cursor-default">
      <h1 className="text-center font-poppins font-bold text-4xl">
        <span
          className={`block w-full text-center text-green-500 ${hoverOpacity}`}
        >
          Seamlessly Manage Your
        </span>
        <span
          className={`lock w-full text-center text-primary-green ${hoverOpacity}`}
        >
          Appointments Conveniently
        </span>
        <span
          className={`block w-full text-center text-primary-orange ${hoverOpacity}`}
        >
          with <span>MyCalendrr</span>
        </span>
      </h1>
      <p className="text-center mt-2 text-xl font-poppins max-w-[600px] mx-auto hover:opacity-85 transition-opacity ease-in-out duration-300">
        Create an Appointment Page, Manage your bookings and get paid - all in
        one place!
      </p>

      {/* CTA Buttons */}
      <div
        role="form"
        className="flex gap-5 mx-auto my-6 w-full justify-center"
      >
        <Button route="/docs" primary={false} className="w-[150px]">
          View Our Docs
        </Button>

        <Button route="/dashboard" primary className="w-[150px]">
          Get Started
        </Button>
      </div>

      {/* Hero Section Image */}
      <div className="rounded-[2.5rem] object-contain w-full max-w-[800px] mx-auto overflow-hidden drop-shadow-2xl animate-loading">
        <img
          src={HeroImage}
          alt="Image for Hero Section"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};

export default HeroSection;
