/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { DescribeServices } from '@/assets';
import { appointmentDefault, appointmentSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { appointmentFormField } from '@/lib/formSchema';

// Working Day List for multi select
const working_day = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

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
import { Textarea } from '@/components/ui/textarea';

import { toastError, toastSuccess } from '@/hooks/useToasts';
import API from '@/lib/API';
import { MultiSelect } from '../ui/multi-select';
import { useState } from 'react';
import { useToken } from '../../hooks/useAppStore';

// Type for the component
type CompProp = {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'UPDATE' | 'CREATE';
};

/**
 * Create and/or Edit Appointment Component
 * @returns JSX Element outlet
 */

const CreateandEditAppointment: React.FC<CompProp> = ({
  setModalVisibility,
  type = 'CREATE',
}) => {
  // Create react hook form with Zod validation
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointmentDefault,
  });

  const [selectedWorkDays, setSelectedWorkDays] = useState<string[]>([]);
  const isLoading = form.formState.isSubmitting;
  const token = useToken();

  // Submit Form handler
  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    // Ensure working days is selected.
    if (selectedWorkDays.length < 1) {
      return toastError('Please Select at least one working day.');
    }

    // Make request.
    try {
      let res: Axios.AxiosXHR<unknown>;
      const appointmentData = {
        ...values,
        working_days: selectedWorkDays,
      };

      if (type === 'CREATE') {
        res = await API.post('/appointment/create', appointmentData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        // For Edit/Update
      } else {
        res = await API.put(
          `/appointment/update/${'testing'}`,
          appointmentData,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      }

      const data = res.data as { message: string };
      toastSuccess(data?.message);

      form.reset(appointmentDefault);
      setSelectedWorkDays([]);

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
            src={DescribeServices}
            alt="Create Your Appointment"
            className="h-full object-cover"
          />
        </div>

        {/* The Form Component  */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto mb-12 max-w-[500px] space-y-3  sm:p-4 transition-all ease-linear"
            >
              {appointmentFormField.map((form_field, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={form_field.name as any}
                  render={({ field }) => (
                    <FormItem className="relative flex flex-col">
                      {/* <FormLabel>{form_field.label}</FormLabel> */}
                      <FormControl>
                        <Input
                          type={
                            form_field.name === 'amount_payable'
                              ? 'number'
                              : 'text'
                          }
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

              {/* Appointment Description  */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a descriptive text for your users to see. This will be on the scheduling page."
                        className="resize-none h-[250px] text-[15px] sm:text-[16px]"
                        style={{ padding: '1.4rem' }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pick Working Days  */}
              <div className="w-full no-scrollbar">
                <MultiSelect
                  className=""
                  style={{ padding: '0.9rem' }}
                  options={working_day}
                  onValueChange={setSelectedWorkDays}
                  defaultValue={selectedWorkDays}
                  placeholder="Select Working Days"
                  variant="secondary"
                  animation={1}
                  maxCount={7}
                />
              </div>

              {/* Button Submission */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-green disabled:cursor-not-allowed"
                style={{ padding: '1.8rem' }}
              >
                {isLoading ? 'Loading...' : 'Create Appointment'}
              </Button>

              {/* Button Submission */}
              <Button
                onClick={() => setModalVisibility(false)}
                type="button"
                className="w-full bg-white border-2 border-slate-400 text-slate-800 -mb-3 hover:bg-red-300"
                style={{ padding: '1.2rem' }}
              >
                Close Modal
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default CreateandEditAppointment;
