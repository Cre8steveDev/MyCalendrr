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
import parseAmount from '@/utils/parseAmount';
import { TOverviewData } from '@/types';
import Separator from '../common/Separator';
import ProfileCard from './ProfileCard';

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [overviewData, setOverviewData] = useState<TOverviewData>();
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

        setOverviewData((res.data as any).data as TOverviewData);

        //
      } catch (error: any) {
        setError(true);
        if (error.response) {
          console.log(error.response);
        }

        console.log(error);
        setOverviewData(undefined);
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
  if (error)
    return (
      <div className="w-full h-full text-4xl text-slate-600 text-center flex place-items-center">
        <h1>Data not found</h1>
      </div>
    );

  // Return JSX After Fetching Data
  return (
    <div className="font-poppins w-full p-4 animate-fadein pl-6">
      {/*   */}
      <h2 className="text-xl">
        {getTimeOfDayGreeting()}, {user?.full_name.split(' ')[0]} 👋
      </h2>

      {/* Separator */}
      <Separator />

      {overviewData && (
        <>
          {/* Top Stats */}
          <div className="flex gap-4 mt-4 flex-wrap md:flex-nowrap justify-center">
            <StatCard
              label="No. of Appointments"
              value={overviewData.appointments}
              className="bg-orange-600 text-white"
            />
            <StatCard
              label="Amount Earned"
              value={parseAmount(overviewData.amount_earned)}
              subtext={`${overviewData.bookings.length} Bookings`}
              className="bg-green-500 text-white"
            />
            <ProfileCard
              user={overviewData.user}
              className="bg-green-700 text-white w-full"
            />
          </div>

          <Separator />
          {/* Booking History */}
          <div className="my-4">
            <h2 className="font-semibold text-slate-600 text-xl my-3">
              5 Most Recent Bookings
            </h2>
            <BookingHistory bookings={overviewData.bookings} />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
