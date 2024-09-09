/**
 * Appointments
 * @returns JSX Element outlet
 */

import { useToken } from '@/hooks/useAppStore';
import fetchAppointments from '@/lib/fetchAppointments';
// import { toastError } from '@/hooks/useToasts';

import { useEffect, useState } from 'react';
import { Appointment, columns } from './AppointmentColumn';
import { DataTable } from './AppointmentDataTable';
import LoadingComponent from '../common/LoadingComponent';

const Appointments = () => {
  const token = useToken();
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Appointments
  useEffect(() => {
    setLoading(true);

    fetchAppointments(token!).then((data) => {
      setData(data as Appointment[]);
      setLoading(false);
    });
  }, [token]);

  // Return JSX
  return (
    <section
      className="font-poppins p-4 w-full h-full overflow-x-scroll"
      id="hide_scroll_bar"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-600">
          Your Appointments
        </h2>
        <p className="italic">Share, Preview and Manage your appointments. </p>
      </div>

      {/* Separator */}
      <hr className="my-4 w-full" />

      {/* Datatable for Appointments Created by user */}

      {loading && <LoadingComponent message="Loading Table Data..." />}
      {!loading && (
        <div className="overflow-x-scroll" id="hide_scroll_bar">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </section>
  );
};

export default Appointments;
