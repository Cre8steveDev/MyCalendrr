/**
 * Footer Component that renders other links and
 * More information about the footer.
 * @returns
 */

import QuickLinks from '../common/QuickLinks';

const Footer = () => {
  return (
    <footer className="bg-gradient-radial  from-primary-orange text-black py-8 font-poppins">
      <div className="sm:grid sm:grid-cols-2  sm:pl-4 md:grid-cols-4 sm:gap-8 max-w-[900px] mx-auto">
        <div className="cursor-default text-center">
          <h3 className="text-lg font-semibold mb-1">MyCalendrr</h3>
          <p className="text-sm md:text-base mb-3">
            Simplifying scheduling and payments for professionals worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-center">
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
          <h4 className="text-lg font-semibold mb-4 text-center">Support</h4>
          <ul className="space-y-2 text-center">
            <QuickLinks route="/#faq" label="FAQ" />
            <QuickLinks route="/#contact" label="Contact Us" />
            <QuickLinks route="/terms-of-service" label="Terms of Service" />
            <QuickLinks route="/privacy-policy" label="Privacy Policy" />
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-center">Connect</h4>
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
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm w-full">
        <p>&copy; 2024 MyCalendrr. Open Source Project by @Cre8steveDev.</p>
      </div>
    </footer>
  );
};

export default Footer;
