import React from 'react';
import Button from '../common/Button';
import { Link, useLocation } from 'react-router-dom';
import { useInternetConnection } from '@/hooks/useInternetConnection.';

type BarProp = {
  setShowCreateModal: () => void;
};

const actions = [
  { label: 'Overview', route: '/dashboard' },
  { label: 'Appointments', route: '/dashboard/appointments' },
  { label: 'Settings', route: '/dashboard/settings' },
  { label: 'Support', route: '/dashboard/support' },
];

/**
 * Responsive Side or Top Navigation Bar for Dashboard
 * @returns
 */
const NavigationBar: React.FC<BarProp> = ({ setShowCreateModal }) => {
  const pathname = useLocation().pathname;
  const isOnline = useInternetConnection();

  // Return JSX Elements
  return (
    <div className="hidden w-full sm:w-[300px] min-w-[200px] font-poppins sm:flex flex-col p-4 bg-white rounded-lg shadow-lg shadow-slate-100 justify-between">
      {/*  */}
      <div className="w-full flex-col gap-3 flex">
        <Button
          primary
          className="flex items-center justify-center gap-2 w-full mb-3 text-orange-600"
          onClick={setShowCreateModal}
        >
          New Appointment
        </Button>

        {actions.map((link, index) => (
          <Link to={link.route} key={index}>
            <p
              className={`${
                pathname === link.route
                  ? 'bg-green-200 text-slate-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              } px-3 py-2  rounded-md  transition-all ease-linear duration-500`}
            >
              {link.label}
            </p>
          </Link>
        ))}
      </div>
      {/* Show Version and Status */}
      <article className=" flex flex-col mt-5">
        <div
          className={`flex items-center gap-2 font-bold  text-xs ${
            isOnline ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <article
            className={`${
              isOnline ? 'bg-green-600' : 'bg-red-600'
            } w-[15px] h-[15px] rounded-full animate-pulse`}
          ></article>
          <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
        </div>

        {/* Trade Mark */}
        <div>
          <p className="text-xs mt-4 text-slate-600">Developed by:</p>
          <p className="text-[15px]">Cre8steve Tech</p>
        </div>
      </article>
    </div>
  );
};

export default NavigationBar;
