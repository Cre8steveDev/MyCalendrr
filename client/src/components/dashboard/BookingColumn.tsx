import { ColumnDef } from '@tanstack/react-table';
import { TBooking } from '@/types';
import { formatDate } from '@/utils/parseDate';

export const columns: ColumnDef<TBooking>[] = [
  {
    accessorKey: 'index',
    header: 'S/N',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'full_name',
    header: 'Full Name',
  },

  {
    accessorKey: 'email',
    header: 'User Email',
  },

  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
  },

  {
    accessorKey: 'appointment_title',
    header: 'Appointment',
  },

  {
    accessorKey: 'booked_date',
    header: 'Booked Date',
    cell: ({ row }) => {
      const date = row.getValue('booked_date');
      const formatted = formatDate(date as string);

      return <div className="">{formatted}</div>;
    },
  },

  {
    accessorKey: 'timestamp',
    header: 'Booked On',
    cell: ({ row }) => {
      const date = row.getValue('timestamp');
      const formatted = formatDate(date as string);

      return <div className="">{formatted}</div>;
    },
  },
];
