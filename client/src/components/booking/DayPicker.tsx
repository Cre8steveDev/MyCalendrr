import { toastError } from '@/hooks/useToasts';
import { parseAvailableDays } from '@/utils/parseAvailableDays';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type TDayPicker = {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  working_days: string[];
  booked_dates: Date[];
};

const DayPickerComp: React.FC<TDayPicker> = ({
  selectedDate,
  setSelectedDate,
  working_days,
  booked_dates,
}) => {
  return (
    <DayPicker
      required
      mode="single"
      selected={selectedDate}
      today={new Date()}
      onSelect={setSelectedDate}
      fromDate={new Date()}
      captionLayout="dropdown"
      showOutsideDays={false}
      disabled={{
        dayOfWeek: parseAvailableDays(working_days),
      }}
      modifiers={{
        booked: booked_dates,
      }}
      modifiersStyles={{
        booked: {
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'orange',
        },
      }}
      onDayClick={(_date, modifiers) => {
        if (modifiers.booked) {
          return toastError('This day is already booked.');
        }
      }}
      className="w-full text-lg rounded-xl p-4"
      classNames={{ caption_label: 'text-primary-green font-bold' }}
    />
  );
};

export default DayPickerComp;
