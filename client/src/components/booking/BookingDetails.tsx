import { AppointmentBooking } from '@/types';
import Separator from '../common/Separator';

type BookingCompType = {
  appointment: AppointmentBooking;
};

const BookingDetails: React.FC<BookingCompType> = ({ appointment }) => {
  return (
    <section className="max-w-[600px] cursor-default">
      <div className="rounded-lg bg-slate-50 p-5">
        <h3 className="text-3xl font-bold mb-5">{appointment.title}</h3>

        <Separator />

        {/* Description for appointment */}
        <p className="whitespace-pre-wrap sm:text-justify pr-3 text-[15px] sm:text-base">
          {appointment.description}
        </p>
      </div>
      <Separator />
    </section>
  );
};

export default BookingDetails;
