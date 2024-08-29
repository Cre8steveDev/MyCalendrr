import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Dashboard from './routes/Dashboard.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * Router Object to add for client side
 * routing using react-router-dom
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <App />,
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
