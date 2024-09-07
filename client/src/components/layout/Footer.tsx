/**
 * Footer Component that renders other links and
 * More information about the footer.
 * @returns
 */

import QuickLinks from '../common/QuickLinks';

const Footer = () => {
  return (
    <footer className="z-10 bg-gradient-radial from-primary-orange py-8 font-poppins text-black">
      <div className="mx-auto max-w-[900px] sm:grid sm:grid-cols-2 sm:gap-8 sm:pl-4 md:grid-cols-4">
        <div className="cursor-default text-center">
          <h3 className="mb-1 text-lg font-semibold">MyCalendrr</h3>
          <p className="mb-3 text-sm md:text-base">
            Simplifying scheduling and payments for professionals worldwide.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-center text-lg font-semibold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-center">
            <QuickLinks route="/#home" label="Home" />
            <QuickLinks route="/#features" label="Features" />
            <QuickLinks route="/#pricing" label="Pricing" />
            <QuickLinks route="/#about" label="About Us" />
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-center text-lg font-semibold">Support</h4>
          <ul className="space-y-2 text-center">
            <QuickLinks route="/#faq" label="FAQ" />
            <QuickLinks route="/#contact" label="Contact Us" />
            <QuickLinks route="/terms-of-service" label="Terms of Service" />
            <QuickLinks route="/privacy-policy" label="Privacy Policy" />
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-center text-lg font-semibold">Connect</h4>
          <ul className="space-y-2 text-center">
            <QuickLinks route="https://x.com/cre8stevedev" label="Twitter" />
            <QuickLinks route="https://dev.to/cre8stevedev" label="Dev.to" />
            <QuickLinks
              route="https://linkedin.com/in/stephen-omoregie"
              label="LinkedIn"
            />
            <QuickLinks
              route="https://github.com/Cre8steveDev"
              label="GitHub"
            />
          </ul>
        </div>
      </div>
      <div className="mt-8 w-full border-t border-gray-700 px-4 pt-8 text-center text-sm">
        <p>&copy; 2024 MyCalendrr. Designed & Developed by @Cre8steveDev.</p>
      </div>
    </footer>
  );
};

export default Footer;
