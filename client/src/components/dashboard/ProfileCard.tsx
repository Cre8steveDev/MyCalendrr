import { Avatar } from '@/assets';
import { AppointmentBooking } from '@/types';
import React from 'react';
import Separator from '../common/Separator';

type PropType = { user: AppointmentBooking['user']; className: string };

/**
 * StatCard
 * @returns
 */

const ProfileCard: React.FC<PropType> = ({ user, className }) => {
  return (
    <div
      className={`rounded-md p-6 flex flex-col-reverse sm:flex-row justify-center items-center ${className} text-[15px]`}
    >
      <section className="w-full sm:text-left text-center sm:text-base text-xs">
        <p className="text-xs">Profile Summary</p>
        <h3 className="text-xl font-bold">{user.full_name}</h3>
        <p>{user.email}</p>
        <p>{user.phone_number}</p>

        <Separator />

        {user.company_name && <p>{user.company_name}</p>}
        {user.title && <p>{user.title}</p>}
      </section>

      <section className="w-[100px] sm:w-[120px] bg-white rounded-full border-4 drop-shadow-xl object-cover mb-3">
        <img
          className="w-full"
          src={user.photo_url || Avatar}
          alt="Profile Photo"
        />
      </section>
    </div>
  );
};

export default ProfileCard;
