export type User = {
  full_name: string;
};

export type AppData = {
  user: User | null;
  token: string | null;
};

export type AppState = {
  app: AppData;
  login: (data: AppData) => void;
  logout: () => void;
};

export type AppointmentBooking = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  amount_payable: number;
  working_days: string[];
  booked_dates: Date[];
  user: {
    company_name: string | null;
    email: string;
    full_name: string;
    phone_number: string;
    photo_url: string | null;
    profession: string | null;
    title: string | null;
  };
};

export type TBooking = {
  full_name: string;
  phone_number: string;
  email: string;
  transaction_reference: string;
  appointment_id: string;
  appointment_title: string;
  booked_date: Date;
  timestamp: Date;
};

type TOverviewData = {
  appointments: number;
  amount_earned: number;
  bookings: TBooking[];
  user: AppointmentBooking['user'];
};

export type ProfileResponse = {
  data: {
    user: ProfileUser;
  };
};

export type ProfileUser = {
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string | undefined;
  profession: string | undefined;
  title: string | undefined;
  account_verified: boolean;
  bank_account: string | undefined;
  bank_name: string | undefined;
  photo_url: string | undefined;
};
