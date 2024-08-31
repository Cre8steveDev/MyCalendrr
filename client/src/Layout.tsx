import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
/**
 * Returns the root component that
 * Renders the outlet  This serves as the
 * Global Layout for the page.
 * @returns JSX Component
 */
const Layout = () => {
  return (
    <>
      {/* The Header Component Here */}
      <Header />

      {/* Child Elements for the route */}
      <main>
        <Outlet />
      </main>

      {/* Footer Element */}
      <Footer />
    </>
  );
};

export default Layout;
