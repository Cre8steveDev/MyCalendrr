/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { Availability } from '@/assets';
import {
  bookingSchema,
  bookingDefault,
  bookingFormField,
} from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Import Shadcn components for form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { toastError, toastSuccess } from '@/hooks/useToasts';
import API from '@/lib/API';
import { useState } from 'react';
import Separator from '../common/Separator';

// Type for the component
type CompProp = {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  appointment_id: string;
  appointment_title: string;
  amount_paid: number;
  contact_email: string;
};

/**
 * Create Booking Component
 * @returns JSX Element outlet
 */

const CreateBookingComp: React.FC<CompProp> = ({
  setModalVisibility,
  selectedDate,
  appointment_id,
  appointment_title,
  amount_paid,
  contact_email,
}) => {
  // Create react hook form with Zod validation
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: bookingDefault,
  });

  const isLoading = form.formState.isSubmitting;
  const [transactionRef, setTransactionRef] = useState<string>();

  const handlePayment = async () => {
    console.log('INITIATED PAYMENT');
    setTimeout(() => {
      setTransactionRef('5748dfhjaisce729');
    }, 5000);
  };

  // Submit Form handler
  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    // Make request.
    try {
      const bookingData = {
        ...values,
        appointment_id: appointment_id,
        appointment_title: appointment_title,
        transaction_reference: transactionRef,
        booked_date: selectedDate,
        timestamp: new Date(),
        amount_paid: +amount_paid,
      };

      const res = await API.post('/appointment/create-booking', bookingData);

      const data = res.data as { message: string };
      toastSuccess(data?.message);

      form.reset(bookingDefault);
      setModalVisibility(false);

      // Catch error.
    } catch (error: any) {
      if (error?.response) {
        const message = error.response?.data?.message;
        return toastError(message);
      }
      return toastError('Sorry. A Network or Uknown Error has occurred.');
    }
  }

  // Return JSX for the View
  return (
    <div className="w-screen min-h-screen bg-black backdrop-blur-lg bg-opacity-65 fixed top-0 left-0 flex justify-center items-center animate-fadepage sm:px-6 px-2">
      {/* Section container for the form creation  */}

      <section className="flex flex-col md:flex-row rounded-xl bg-white p-4 font-poppins gap-3">
        {/* Image Container */}
        <div className="max-w-[500px] object-cover bg-red-500">
          <img
            src={Availability}
            alt="Booking Image"
            className="h-full object-cover"
          />
        </div>

        {/* The Form Component  */}
        <div className="flex flex-col justify-center py-4 sm:py-8">
          <p className="text-center w-[80%] mx-auto">
            Welcome to our easy-to-use booking system. We're excited to assist
            you!
          </p>

          <Separator />

          <p className="text-center text-xs mt-3">Book Your Appointment</p>
          <h3 className="text-center font-bold text-xl text-slate-700">
            {appointment_title}
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto  max-w-[600px] space-y-3  sm:p-4 transition-all ease-linear"
            >
              {bookingFormField.map((form_field, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={form_field.name as any}
                  render={({ field }) => (
                    <FormItem className="relative flex flex-col">
                      <FormControl>
                        <Input
                          placeholder={form_field.placeholder}
                          autoComplete="off"
                          {...field}
                          className="text-[15px] sm:text-[16px]"
                          style={{ padding: '1.4rem' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Button Payment */}
              {!transactionRef && (
                <Button
                  type="button"
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-primary-orange disabled:cursor-not-allowed"
                  style={{ padding: '1.4rem' }}
                >
                  {isLoading ? 'Loading...' : 'Pay for Booking'}
                </Button>
              )}

              {/* Button Submission */}
              {transactionRef && (
                <Button
                  type="submit"
                  disabled={isLoading || !transactionRef}
                  className="w-full bg-primary-green disabled:cursor-not-allowed"
                  style={{ padding: '1.4rem' }}
                >
                  {isLoading ? 'Loading...' : 'Create Appointment'}
                </Button>
              )}

              {/* Button Submission */}
              <Button
                onClick={() => setModalVisibility(false)}
                type="button"
                className="w-full bg-white border-2 border-slate-400 text-slate-800 -mb-3 hover:bg-red-300"
                style={{ padding: '1.2rem' }}
              >
                Close Modal
              </Button>

              {/* Contact or reschedule option */}
              <div className="text-center text-xs">
                <p>Need to reschedule or have questions? Contact: </p>
                <a href={`mailto:${contact_email}`}>
                  <p className="bg-green-600 mt-2 w-fit mx-auto px-5 py-1 rounded-lg text-sm text-white hover:opacity-80 transition-opacity duration-300">
                    {contact_email}
                  </p>
                </a>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default CreateBookingComp;
