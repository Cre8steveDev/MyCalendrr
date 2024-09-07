// Constant data for the features section
import { useState } from 'react';
import ContainerWithMaxWidth from '../common/ContainerWithMaxWidth';
import SectionContainer from '../common/SectionContainer';

/**
 * Hero Section Component
 * @returns
 */
const SubscribeNewsLetter = () => {
  const [email, setEmail] = useState('');

  // Handle Subscription event
  const handleSubscribeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate user entry manually or with a library
    if (email.length < 5) {
      alert('Invalid Email Entry.');
      return;
    }

    // Perform Async action to add user to your email list

    // On Success or error show the user an interaction
    // Create a custom toast component or use a library
    // Like react-toastify or react-hot-toast
    alert(`The Email: ${email} has been added to mailing list.`);
  };

  // Return JSX Component
  return (
    <ContainerWithMaxWidth
      maxWidth="max-w-[900px]"
      className="relative mb-10 w-full overflow-hidden bg-gradient-radial from-primary-orange to-primary-green py-10 font-poppins drop-shadow-2xl md:rounded-3xl"
    >
      <SectionContainer>
        <h1 className="mt-5 text-center text-2xl font-bold text-white sm:text-4xl">
          Stay Ahead in Scheduling Innovation
        </h1>

        {/* Render the Features */}
        <form
          className="z-10 mx-auto flex w-full justify-center px-8 py-4"
          onSubmit={handleSubscribeSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Kindly enter your email here..."
            className="w-full max-w-[600px] p-2 text-center text-sm outline-none sm:p-4 sm:text-lg md:text-xl"
          />
          <button className="bg-primary-green px-4 py-2 text-sm text-white transition-colors duration-500 hover:bg-primary-orange hover:text-black sm:w-[120px] sm:text-base">
            Subscribe
          </button>
        </form>

        <p className="mx-auto mt-2 max-w-[600px] px-4 text-center text-xs sm:px-0 sm:text-sm">
          Subscribe to our newsletter for expert tips, industry insights, and
          exclusive updates. Boost your scheduling game and never miss a beat in
          optimizing your business.
        </p>

        {/* Overlay Circle */}
        <div className="absolute mx-auto h-screen w-[50%] animate-ping rounded-[100%] bg-white opacity-20 delay-300 duration-1000">
          <div className="absolute left-[50%] mx-auto h-screen w-[100%] translate-x-[50%] animate-ping rounded-[100%] bg-white opacity-50"></div>
        </div>
      </SectionContainer>
    </ContainerWithMaxWidth>
  );
};

export default SubscribeNewsLetter;
