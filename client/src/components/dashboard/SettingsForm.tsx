/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastError, toastSuccess } from '@/hooks/useToasts';
import API from '@/lib/API';
import { profileFormField, profileSchema } from '@/lib/formSchema';
import { ProfileUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type FormProp = {
  user: ProfileUser;
  setReload: React.Dispatch<React.SetStateAction<number>>;
};

const SettingsForm: React.FC<FormProp> = ({ user, setReload }) => {
  const formDefault = {
    full_name: user.full_name,
    email: user.email,
    password: '',
    phone_number: user.phone_number,
    company_name: user.company_name,
    profession: user.profession,
    title: user.title,
    bank_name: user.bank_name,
    bank_account: user.bank_account,
  };

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: formDefault,
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const res = await API.post('/auth/profile/update', values);
      const resData = res.data as { message: string };
      toastSuccess(resData?.message);
      setReload((prev) => prev + 1);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = (error as any).response?.data?.message || error.message;
        toastError(message);
      } else {
        toastError('Sorry. A Network or Unknown Error has occurred.');
      }
    }
  };

  return (
    <Form {...form}>
      <p className="text-slate-600">Update Profile details:</p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[90%] sm:w-full animate-fadepage rounded-xl py-4 font-poppins flex flex-wrap "
      >
        {profileFormField.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name as keyof z.infer<typeof profileSchema>}
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full lg:w-[48%] mr-3 mb-3 min-w-[300px]">
                <FormControl>
                  <Input
                    type="text"
                    placeholder={formField.placeholder}
                    disabled={formField.name === 'email'}
                    autoComplete="off"
                    {...field}
                    className="text-[15px] sm:text-base focus:drop-shadow-xl"
                    style={{ padding: '1.5rem' }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full sm:max-w-[300px] bg-primary-green disabled:cursor-not-allowed"
          style={{ padding: '1.5rem' }}
        >
          {form.formState.isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
