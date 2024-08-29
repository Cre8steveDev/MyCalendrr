import { Outlet } from 'react-router-dom';
/**
 * Returns the root component that
 * Renders the outlet  This serves as the
 * Global Layout for the page.
 * @returns JSX Component
 */
const Root = () => {
  return (
    <>
      {/* The Header Component Here */}
      <header>
        <nav>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </header>

      {/* Child Elements for the route */}
      <main>
        <Outlet />
      </main>

      {/* Footer Element */}
      <footer>
        <div role="navigation">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Root;
