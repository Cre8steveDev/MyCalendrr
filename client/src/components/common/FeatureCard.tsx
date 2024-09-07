import { Link } from 'react-router-dom';

type Feature = {
  image: string;
  title: string;
  description: string;
  route: string;
};

const FeatureCard: React.FC<Feature> = ({
  image,
  title,
  description,
  route,
}) => {
  return (
    <section className="mx-auto my-5 w-full max-w-[600px] overflow-hidden rounded-[2rem] bg-white p-5 font-poppins drop-shadow-xl transition-transform duration-700 ease-in-out hover:scale-95 sm:mt-5 sm:w-full lg:flex lg:gap-3">
      {/* Card Image */}
      <div className="overflow-hidden rounded-[1rem] object-cover lg:w-[50%]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="transition-all duration-1000 ease-out hover:scale-125 lg:h-full lg:object-cover"
        />
      </div>

      <div className="flex cursor-default flex-col p-3 lg:w-[50%]">
        {/* Title   */}

        <h3 className="mb-3 select-none text-center text-xl font-bold text-primary-green lg:text-left">
          {title}
        </h3>

        {/* Description */}

        <p className="cursor-grab select-none text-center text-sm text-slate-600 md:text-lg lg:text-left">
          {description}
        </p>

        {/* Route */}
        <Link
          to={route}
          className="mt-4 self-center rounded-xl border border-primary-orange p-2 text-xs transition-colors duration-700 ease-in-out hover:border-none hover:bg-primary-green hover:text-white lg:self-start"
        >
          <button>Start Now</button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureCard;
