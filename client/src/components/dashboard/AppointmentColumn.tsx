import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toastSuccess } from '@/hooks/useToasts';
import { FRONTEND_URL } from '@/lib/frontendUrl';
import { Link } from 'react-router-dom';

export type Appointment = {
  title: string;
  amount_payable: number;
  id: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'amount_payable',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount_payable'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },

  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  // },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mr-4">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${FRONTEND_URL}/appt/${appointment.id}`
                );
                toastSuccess('Copied');
              }}
            >
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer">
              <Link to={`${FRONTEND_URL}/appt/${appointment.id}`}>
                View Appointment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" cursor-pointer">
              Edit Appointment
            </DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer bg-red-500 text-white">
              Delete Appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
