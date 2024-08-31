import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './Layout.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Home from './routes/Home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * Router Object to add for client side
 * routing using react-router-dom
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

// Compile route and render element on the DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
