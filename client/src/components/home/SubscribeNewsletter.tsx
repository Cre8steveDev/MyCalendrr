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
      className="mb-10 w-full md:rounded-3xl bg-gradient-radial to-primary-green from-primary-orange py-10 font-poppins drop-shadow-2xl relative overflow-hidden"
    >
      <SectionContainer>
        <h1 className="mt-5 text-center text-2xl sm:text-4xl font-bold text-white">
          Stay Ahead in Scheduling Innovation
        </h1>

        {/* Render the Features */}
        <form
          className="mx-auto flex w-full justify-center py-4 px-8 z-10"
          onSubmit={handleSubscribeSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Kindly enter your email here..."
            className="w-full max-w-[600px] p-2 sm:p-4 text-sm sm:text-lg md:text-xl outline-none text-center"
          />
          <button className="bg-primary-green px-4 py-2 text-white sm:w-[120px] text-sm sm:text-base hover:bg-primary-orange transition-colors hover:text-black duration-500">
            Subscribe
          </button>
        </form>

        <p className="text-center text-xs px-4 sm:px-0 sm:text-sm max-w-[600px] mx-auto mt-2">
          Subscribe to our newsletter for expert tips, industry insights, and
          exclusive updates. Boost your scheduling game and never miss a beat in
          optimizing your business.
        </p>

        {/* Overlay Circle */}
        <div className="absolute mx-auto  h-screen w-[50%] bg-white rounded-[100%] opacity-20 animate-ping delay-300 duration-1000">
          <div className="absolute mx-auto left-[50%] translate-x-[50%] h-screen w-[100%] bg-white rounded-[100%] opacity-50 animate-ping"></div>
        </div>
      </SectionContainer>
    </ContainerWithMaxWidth>
  );
};

export default SubscribeNewsLetter;
