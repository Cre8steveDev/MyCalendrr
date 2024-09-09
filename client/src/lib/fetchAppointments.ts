/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastError } from '@/hooks/useToasts';
import API from './API';

const fetchAppointments = async (token: string) => {
  try {
    const res = await API.get('/appointment/get-all', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return (res?.data as any)?.all_appointments;
  } catch (error: any) {
    if (error.response) {
      toastError(error.response.data.message);
    } else {
      toastError('An Error occured. Check network connection.');
    }
    return [];
  }
};

export default fetchAppointments;
