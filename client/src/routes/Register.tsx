/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerFormSchema,
  registerDefault,
  registerFormField,
} from '@/lib/formSchema';
import ContainerWithMaxWidth from '@/components/common/ContainerWithMaxWidth';

// Import Shadcn components for form
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import getTimeOfDayGreeting from '@/utils/greeting';

import API from '@/lib/API';
import { toastError, toastSuccess } from '@/hooks/useToasts';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useAppStore';
import { useEffect } from 'react';

// Define Field Values to map the form fields

/**
 * Register Route
 * @returns
 */
const Register = () => {
  const navigate = useNavigate();

  // Create react hook form with Zod validation
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerDefault,
  });

  const isLoading = form.formState.isSubmitting;

  // Return user from Page if already authenticated
  const user = useUser();

  useEffect(() => {
    if (user) {
      return navigate('/dashboard');
    }
  }, [user, navigate]);

  // Submit Form handler
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    if (!values.accept_terms) {
      return toastError('You need to accept the terms and conditions.');
    }

    try {
      const res = await API.post('/auth/register', values);
      const data = res.data as { message: string };
      form.reset(registerDefault);
      toastSuccess(data?.message);

      navigate('/login');

      // Catch error.
    } catch (error: any) {
      if (error?.response) {
        const message = error.response?.data?.message;
        return toastError(message);
      }
      return toastError('Sorry. A Network or Uknown Error has occurred.');
    }
  }

  //   Return JSX To DOM
  return (
    <ContainerWithMaxWidth
      className="flex animate-fadein flex-col place-content-center bg-slate-200 bg-[url(/bgcover.jpg)] bg-cover font-poppins"
      maxWidth="w-full"
    >
      <div className="mx-auto mb-4 mt-4 w-[90%] max-w-[500px] animate-fadepage rounded-xl bg-neutral p-4 pt-8 drop-shadow-lg">
        <h2 className="text-center text-xl font-semibold text-primary-green">
          {getTimeOfDayGreeting()}!
        </h2>
        <h3 className="text-center text-xl font-semibold text-slate-600 sm:text-2xl">
          Create a New Account and Enjoy Seamless Experience
        </h3>
        <p className="mx-auto my-4 w-[80%] text-center text-xs text-slate-700 sm:text-base">
          Our registration process is quick, easy and secure. We'll never share
          your data with third parties.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mb-12 w-[90%] max-w-[500px] animate-fadepage space-y-3 rounded-xl bg-white p-4 font-poppins drop-shadow-xl sm:p-8"
        >
          {registerFormField.map((form_field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={form_field.name as any}
              render={({ field }) => (
                <FormItem className="relative flex flex-col">
                  {/* <FormLabel>{form_field.label}</FormLabel> */}
                  <FormControl>
                    <Input
                      type={'text'}
                      placeholder={form_field.placeholder}
                      autoComplete="off"
                      {...field}
                      className="text-[15px] sm:text-lg"
                      style={{ padding: '1.6rem' }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Switch Component */}
          <FormField
            control={form.control}
            name="accept_terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg p-4">
                <div className="w-[85%] space-y-0.5">
                  <FormLabel className="text-base">
                    Terms & Conditions
                  </FormLabel>
                  <FormDescription className="text-xs text-slate-700">
                    By submitting this form, you agree to abide by the terms and
                    conditions of this platform, including, receiving emails
                    about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-green disabled:cursor-not-allowed"
            style={{ padding: '1.8rem' }}
          >
            {isLoading ? 'Loading...' : 'Register Now'}
          </Button>
        </form>
      </Form>
    </ContainerWithMaxWidth>
  );
};

export default Register;
