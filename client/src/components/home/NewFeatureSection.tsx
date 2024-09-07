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
      className="mb-10 w-full rounded-3xl bg-slate-50 px-5 py-10"
    >
      <SectionContainer>
        <h1 className="mt-5 px-4 text-center font-poppins text-2xl font-bold text-slate-400 sm:text-4xl">
          Exciting Features, Just For You
        </h1>

        <p className="mx-auto w-[80%] text-center text-sm text-slate-600 sm:text-base">
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
          <CarouselPrevious className="hidden bg-primary-green text-white sm:flex md:ml-5" />
          <CarouselNext className="hidden bg-primary-green text-white sm:flex md:mr-5 text-center" />
          <CarouselContent className="-ml-4">
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
