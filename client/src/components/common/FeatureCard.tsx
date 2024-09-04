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
    <section className="w-full my-5 sm:mt-5 sm:w-full max-w-[600px] mx-auto rounded-[2rem] overflow-hidden p-5 bg-white font-poppins drop-shadow-xl hover:scale-95 transition-transform duration-700 ease-in-out lg:flex lg:gap-3">
      {/* Card Image */}
      <div className="object-cover rounded-[1rem] overflow-hidden lg:w-[50%]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="hover:scale-125 transition-all duration-1000 ease-out lg:h-full lg:object-cover"
        />
      </div>

      <div className="p-3 cursor-default flex flex-col lg:w-[50%]">
        {/* Title   */}

        <h3 className="text-xl text-center lg:text-left font-bold mb-3 text-primary-green select-none">
          {title}
        </h3>

        {/* Description */}

        <p className="text-slate-600 text-sm md:text-lg text-center lg:text-left cursor-grab select-none">
          {description}
        </p>

        {/* Route */}
        <Link
          to={route}
          className="mt-4 p-2 self-center lg:self-start  border rounded-xl border-primary-orange text-xs hover:bg-primary-green hover:text-white hover:border-none transition-colors duration-700 ease-in-out"
        >
          <button>Start Now</button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureCard;
