import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout.tsx';
import Home from './routes/Home.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Overview from './components/dashboard/Overview.tsx';
import Appointments from './components/dashboard/Appointments.tsx';
import Settings from './components/dashboard/Settings.tsx';
import AdminSupport from './components/dashboard/AdminSupport.tsx';

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          { index: true, element: <Overview /> },
          { path: 'appointments', element: <Appointments /> },
          { path: 'settings', element: <Settings /> },
          { path: 'support', element: <AdminSupport /> },
        ],
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
