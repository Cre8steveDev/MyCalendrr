import { Avatar } from '@/assets';
import { AppointmentBooking } from '../../types/index';
import Separator from '../common/Separator';
/**
 * Poster Information
 * @returns JSX with details
 */

type user = AppointmentBooking['user'];

const PosterInformation: React.FC<user> = (props) => {
  if (!props.full_name || !props.email) return null;

  return (
    <div className="rounded-lg bg-green-100 p-5 cursor-default flex gap-3 mt-4 items-center">
      <section className="w-full">
        <p className="text-xs">Contact Information</p>
        <h3 className="text-xl font-bold">{props.full_name}</h3>
        <p className="text-xs">{props.email}</p>
        <p className="text-[15px]">{props.phone_number}</p>

        <Separator />
        {props.company_name && <p className="text-xs">{props.company_name}</p>}
        {props.title && <p className="text-xs">{props.title}</p>}
      </section>

      <section className="w-[80px]">
        <img
          className="w-full"
          src={props.photo_url || Avatar}
          alt="Profile Photo"
        />
      </section>
    </div>
  );
};

export default PosterInformation;
