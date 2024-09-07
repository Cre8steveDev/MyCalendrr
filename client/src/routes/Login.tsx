/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginFormSchema,
  loginDefault,
  loginFormField,
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
import { toastError } from '@/hooks/useToasts';
import { useLogin, useUser } from '@/hooks/useAppStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type LoginRes = { user: any; auth_token: any };

// Define Field Values to map the form fields

/**
 * Register Route
 * @returns
 */
const LoginPage = () => {
  // Zustand login hook
  const login = useLogin();

  // Create react hook form with Zod validation
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginDefault,
  });

  // Return user from Page if already authenticated
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user) {
      return navigate('/dashboard');
    }
  }, [user, navigate]);

  const isLoading = form.formState.isSubmitting;

  // Submit Form handler
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const res = await API.post('/auth/login', values);
      const data = res?.data as LoginRes;

      login({ user: data?.user, token: data?.auth_token });
      navigate('/dashboard');

      // Handle Error from login
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
          Welcome back! Login to continue.
        </h3>
        <p className="mx-auto mb-4 mt-2 w-[80%] text-center text-xs text-slate-700 sm:text-base">
          View analytics, create and customize your appointments.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mb-12 w-[90%] max-w-[500px] animate-fadepage space-y-3 rounded-xl bg-white p-4 font-poppins drop-shadow-lg sm:w-[80%] sm:p-8"
        >
          {loginFormField.map((form_field, index) => (
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
                      className="p-4 text-[15px] sm:text-lg"
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
            name="remember_me"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg p-4">
                <div className="w-[85%] space-y-0.5">
                  <FormLabel className="text-xs sm:text-base">
                    Remember Me
                  </FormLabel>
                  <FormDescription className="text-xs text-slate-700">
                    Switching this option 'ON' will keep you logged in on this
                    device for the next 30 days or until you log out.
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
            {isLoading ? 'Loading...' : 'Login Now'}
          </Button>
        </form>
      </Form>
    </ContainerWithMaxWidth>
  );
};

export default LoginPage;
