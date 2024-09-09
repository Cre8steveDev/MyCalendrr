import { useEffect, useState } from 'react';
import { AppointmentBooking } from '@/types';
import { useParams } from 'react-router-dom';
import LoadingComponent from '@/components/common/LoadingComponent';
import fetchSingleAppointment from '@/lib/fetchSingleAppointment';

// Day picker

import Button from '@/components/common/Button';
import BookingDetails from '@/components/booking/BookingDetails';
import PosterInformation from '@/components/booking/PosterInformation';
import ContainerWithMaxWidth from '@/components/common/ContainerWithMaxWidth';
import { DefaultAppointmentBG } from '@/assets';
import WorkingDays from '@/components/booking/WorkingDays';
import DayPickerComp from '@/components/booking/DayPicker';
import CreateBookingComp from '@/components/booking/CreateBooking';
import { toastError } from '@/hooks/useToasts';

/**
 * Component for handling Appointment
 * Preview and Booking by Public Users.
 * @returns
 */
const Booking = () => {
  const { appointment_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<AppointmentBooking>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showBooking, setShowBooking] = useState(false);

  //   Load the appointment data
  useEffect(() => {
    setLoading(true);

    if (!appointment_id) return;
    fetchSingleAppointment(appointment_id).then((data) => {
      setAppointment(data);
      setLoading(false);
    });
  }, [appointment_id]);

  // Loader Component
  if (loading) {
    return (
      <LoadingComponent
        message="Loading Appointment Data..."
        className="h-screen"
      />
    );
  }

  const bookedDates =
    appointment?.booked_dates?.map(
      (date) => new Date(date + 'T23:59:00.000Z')
    ) || [];

  // Return Booking Page
  return (
    <ContainerWithMaxWidth className="font-poppins w-full relative">
      {/* If Appointmetn is not found. */}
      {!appointment && (
        <div>
          <h2>Oops. Appointment not found</h2>
        </div>
      )}

      {/* If appointment is found */}
      {appointment && (
        <>
          {/* Show Appointment Cover Photo or default */}
          <div className="w-full object-cover h-[120px] sm:h-[200px] overflow-hidden rounded-md">
            <img
              src={DefaultAppointmentBG}
              alt="Appointment Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex py-8 mx-auto justify-center md:flex-row-reverse flex-col-reverse gap-5">
            <div className="self-start">
              {/* Calendear Info */}
              <p className="pl-8 -mb-5 text-slate-500">
                Pick a Date from the Calender
              </p>

              {/* Date Picker  */}
              <DayPickerComp
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                booked_dates={bookedDates}
                working_days={appointment.working_days}
              />

              <Button
                primary
                className="w-full mx-auto -mt-3"
                onClick={() => {
                  if (!selectedDate) {
                    return toastError('Please selected a booking date.');
                  }
                  setShowBooking(true);
                }}
              >
                <p>Book Appointment</p>
              </Button>

              {/* Render Working Days */}
              <WorkingDays days={appointment.working_days} />

              {/*  Author information component*/}
              <PosterInformation {...appointment.user} />
            </div>

            {/* Show Appointment Details */}
            <BookingDetails appointment={appointment} />
          </div>
        </>
      )}
      {appointment && showBooking && (
        <CreateBookingComp
          selectedDate={selectedDate!}
          appointment_id={appointment.id}
          appointment_title={appointment.title}
          setModalVisibility={setShowBooking}
          amount_paid={appointment.amount_payable}
        />
      )}
    </ContainerWithMaxWidth>
  );
};

export default Booking;
