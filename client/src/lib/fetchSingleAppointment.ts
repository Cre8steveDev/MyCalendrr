/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastError } from '@/hooks/useToasts';
import API from './API';
import { AppointmentBooking } from '@/types';

const fetchSingleAppointment = async (id: string) => {
  try {
    const res = await API.get(`/appointment/get/${id}`);

    return (res?.data as any)?.appointment as AppointmentBooking;
  } catch (error: any) {
    if (error.response) {
      toastError(error.response.data.message);
    } else {
      toastError('An Error occured. Check network connection.');
    }
    return undefined;
  }
};

export default fetchSingleAppointment;
