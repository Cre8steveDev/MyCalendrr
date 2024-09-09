import React from 'react';
import { TBooking } from '@/types';
import { BookingDataTable } from './BookingDataTable';
import { columns } from './BookingColumn';

type THistory = {
  bookings: TBooking[];
};

/**
 * Booking History Component
 * on the Dashboard
 * @returns
 */

const BookingHistory: React.FC<THistory> = ({ bookings }) => {
  //   Return JSX AFter Loading Data
  return (
    <div className="w-full">
      <BookingDataTable columns={columns} data={bookings} />
    </div>
  );
};

export default BookingHistory;
