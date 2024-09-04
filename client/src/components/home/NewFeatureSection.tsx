// Constant data for the features section
import featuredData from '../../utils/featuredData';
import ContainerWithMaxWidth from '../common/ContainerWithMaxWidth';
import FeatureCard from '../common/FeatureCard';
import SectionContainer from '../common/SectionContainer';

// Import ShadCn Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoosePluginType = any;

/**
 * Hero Section Component
 * @returns
 */
const NewFeatureSection = () => {
  // Return JSX Component
  return (
    <ContainerWithMaxWidth
      id="features"
      maxWidth=""
      className="w-full bg-slate-50 rounded-3xl py-10 mb-10 px-5"
    >
      <SectionContainer>
        <h1 className="text-center font-poppins font-bold px-4 text-2xl sm:text-4xl text-slate-400 mt-5">
          Exciting Features, Just For You
        </h1>

        <p className="text-center text-slate-600 sm:text-base text-sm w-[80%] mx-auto">
          Innovative offersing to boost your business with MyCalendrr.
        </p>

        {/* Render the Features using a Shadcn Carousel Component */}
        <Carousel
          orientation="horizontal"
          plugins={[
            Autoplay({
              delay: 5000,
              playOnInit: true,
              stopOnInteraction: true,
            }) as LoosePluginType,
          ]}
        >
          <CarouselPrevious className="bg-primary-green text-white md:ml-5" />
          <CarouselNext className="bg-primary-green text-white md:mr-5" />
          <CarouselContent className="-ml-4 ">
            {featuredData.map((feature, index) => (
              <CarouselItem className="pl-4" key={index}>
                <FeatureCard
                  route="/dashboard"
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </SectionContainer>
    </ContainerWithMaxWidth>
  );
};

export default NewFeatureSection;
