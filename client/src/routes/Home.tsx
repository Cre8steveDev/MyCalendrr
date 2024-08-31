import ContainerWithMaxWidth from '../components/common/ContainerWithMaxWidth';
import HeroSection from '../components/home/HeroSection';

/**
 * Home Component - This renders the landing
 * page that users are met with when they
 * visit the index page.
 * @returns
 */
const Home = () => {
  return (
    <div font-poppins w-full>
      <ContainerWithMaxWidth>
        <HeroSection />
      </ContainerWithMaxWidth>
    </div>
  );
};

export default Home;
