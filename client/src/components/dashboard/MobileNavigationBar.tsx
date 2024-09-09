import React, { useState } from 'react';
import Button from '../common/Button';
import { Link, useLocation } from 'react-router-dom';
import { useInternetConnection } from '@/hooks/useInternetConnection.';
import { SidebarClose, SidebarOpen } from 'lucide-react';

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
const MobileNavigationBar: React.FC<BarProp> = ({ setShowCreateModal }) => {
  const pathname = useLocation().pathname;
  const isOnline = useInternetConnection();

  const [showMenu, setShowMenu] = useState(false);

  // Return JSX Elements
  return (
    <article className="font-poppins  cursor-pointer text-slate-600 sm:hidden">
      <div
        role="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className="-mt-3 mb-3 text-xs"
      >
        {showMenu ? (
          <div className="flex gap-2 pl-3 items-center">
            <SidebarClose color="green" size={16} />
            <p>Hide</p>
          </div>
        ) : (
          <div className="flex gap-2 pl-3 items-center">
            <SidebarOpen color="green" size={16} />
            <p>Menu</p>
          </div>
        )}
      </div>

      {/* Show Navigation Menu */}

      <div
        onClick={() => setShowMenu(false)}
        className={`flex w-full flex-col justify-between rounded-lg bg-white p-4 font-poppins shadow-lg sm:hidden absolute z-10 transition-all ease-linear duration-500 ${
          showMenu ? 'left-0 opacity-100' : '-left-[100%] opacity-50'
        } `}
      >
        {/*  */}
        <div className="flex w-full flex-col gap-3">
          <Button
            primary
            className="mb-3 flex w-full items-center justify-center gap-2 text-orange-600"
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
        <article className="mt-5 flex flex-col">
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
            <p className="mt-4 text-xs text-slate-600">Developed by:</p>
            <p className="text-[15px]">Cre8steve Tech</p>
          </div>
        </article>
      </div>
    </article>
  );
};

export default MobileNavigationBar;
