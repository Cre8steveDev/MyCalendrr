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

// Define Field Values to map the form fields

/**
 * Register Route
 * @returns
 */
const Register = () => {
  // Create react hook form with Zod validation
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerDefault,
  });
  const isLoading = form.formState.isSubmitting;

  // Submit Form handler
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log('SUBMISSION CLICKED!');

    try {
      const res = await API.post('/auth/register', values);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  //   Return JSX To DOM
  return (
    <ContainerWithMaxWidth
      className="font-poppins flex flex-col place-content-center bg-slate-200 bg-[url(/bgcover.jpg)] bg-cover"
      maxWidth="w-full"
    >
      <div className="max-w-[600px] mx-auto pt-8 bg-neutral p-4 rounded-xl mb-4 drop-shadow-lg mt-4">
        <h2 className="text-center text-xl font-semibold  text-primary-green">
          {getTimeOfDayGreeting()}!
        </h2>
        <h3 className="text-center text-4xl font-semibold  text-slate-600">
          Create a New Account and Enjoy Seamless Experience
        </h3>
        <p className="text-center w-[80%] mx-auto my-4 text-slate-700">
          Our registration process is quick, easy and secure. We'll never share
          your data with third parties.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 font-poppins mx-auto w-[80%] max-w-[500px] bg-white p-8 rounded-xl mb-12 drop-shadow-xl "
        >
          {registerFormField.map((form_field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={form_field.name as any}
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  {/* <FormLabel>{form_field.label}</FormLabel> */}
                  <FormControl>
                    <Input
                      type={'text'}
                      placeholder={form_field.placeholder}
                      autoComplete="off"
                      {...field}
                      className="text-md sm:text-lg"
                      style={{ padding: '1.8rem' }}
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                <div className="space-y-0.5 w-[85%]">
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
            className="bg-primary-green w-full disabled:cursor-not-allowed"
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
