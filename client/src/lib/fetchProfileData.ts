/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastError } from '@/hooks/useToasts';
import API from './API';
import { ProfileResponse } from '@/types';

const fetchProfileData = async (token: string) => {
  try {
    const res = await API.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = (res as ProfileResponse).data.user;

    return {
      full_name: user.full_name,
      email: user.email,
      company_name: user.company_name || '',
      profession: user.profession || '',
      title: user.title || '',
      phone_number: user.phone_number,
      account_verified: user.account_verified,
      bank_account: user.bank_account || '',
      bank_name: user.bank_name || '',
    };
  } catch (error: any) {
    if (error.response) {
      toastError(error.response.data.message);
    } else {
      toastError('An Error occured. Check network connection.');
    }
    return undefined;
  }
};

export default fetchProfileData;
