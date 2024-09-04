import ContainerWithMaxWidth from '@/components/common/ContainerWithMaxWidth';
import HeroSection from '@/components/home/HeroSection';
import NewFeatureSection from '@/components/home/NewFeatureSection';
import SubscribeNewsLetter from '@/components/home/SubscribeNewsletter';

/**
 * Home Component - This renders the landing
 * page that users are met with when they
 * visit the index page.
 * @returns
 */
const Home = () => {
  return (
    <>
      <ContainerWithMaxWidth maxWidth="">
        <HeroSection />
        <NewFeatureSection />
        <SubscribeNewsLetter />
      </ContainerWithMaxWidth>
    </>
  );
};

export default Home;
