/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Overview of User's Public Appointments
 * @returns JSX Element outlet
 */

import { useEffect, useState } from 'react';
import LoadingComponent from '../common/LoadingComponent';
import { useToken, useUser } from '@/hooks/useAppStore';
import StatCard from './StatCard';
import getTimeOfDayGreeting from '@/utils/greeting';
import BookingHistory from './BookingHistory';
import API from '@/lib/API';

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = useUser();
  const token = useToken();

  useEffect(() => {
    setLoading(true);
    setError(false);
    async function fetchDashboard() {
      try {
        const res = await API.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('DATA RECEIVED: ', res.data);

        //
      } catch (error: any) {
        setError(true);
        if (error.response) {
          console.log(error.response);
        }

        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // Call the async function
    fetchDashboard();
  }, [token]);

  // Loading Component
  if (loading) return <LoadingComponent message="Loading Data..." />;

  // Error loading dashboard data
  if (error) return <div>Unable to retrieve</div>;

  // Return JSX After Fetching Data
  return (
    <div className="font-poppins bg-slate-50 w-full p-4 animate-fadein pl-6">
      <h2 className="text-xl">
        {getTimeOfDayGreeting()}, {user?.full_name.split(' ')[0]} 👋
      </h2>

      {/* Separator */}
      <hr className="my-3" />

      {/* Top Stats */}
      <div className="flex gap-4 mt-4">
        <StatCard label="No. of Appointments" value="0" />
        <StatCard label="Amount Earned" value="300k" subtext="35 Bookings" />
      </div>

      {/* Booking History */}
      <div className="mt-4">
        <h2 className="font-semibold text-slate-600">Booking History</h2>
        <BookingHistory />
      </div>
    </div>
  );
};

export default Overview;
