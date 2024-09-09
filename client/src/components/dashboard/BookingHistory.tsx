import { useToken } from '@/hooks/useAppStore';
import { useEffect, useState } from 'react';
import LoadingComponent from '../common/LoadingComponent';

/**
 * Booking History Component
 * on the Dashboard
 * @returns
 */
const BookingHistory = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, [token]);

  // Loading Component
  if (loading) {
    return (
      <LoadingComponent
        message="Loading Data..."
        className="bg-white rounded-md"
      />
    );
  }

  //   Return JSX AFter Loading Data
  return <div>BookingHistory</div>;
};

export default BookingHistory;
