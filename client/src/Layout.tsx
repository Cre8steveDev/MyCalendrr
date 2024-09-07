import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';
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

      {/* Toaster Component  */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Footer Element */}

      <Footer />
    </>
  );
};

export default Layout;
