import { z } from 'zod';

// Define Zod validation schema for Registration Form
const registerFormSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(10, 'Username must be at least 10 characters.')
    .includes(' ', { message: 'Please provide a First and Last Name.' }),

  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' }),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be a minimum of 8 characters'),

  phone_number: z
    .string()
    .trim()
    .min(10, 'Kindly provide a valid phone number of at least 10 characters.'),

  // company_name: z
  //   .string()
  //   .trim()
  //   .min(8, 'I bet your real company name is more than 8 characters. '),

  // profession: z
  //   .string()
  //   .trim()
  //   .min(6, 'Professions are likely more than 6 characters.'),

  // title: z.string().trim().min(6, 'Titles are usually more than 6 characters'),

  accept_terms: z.boolean().default(false).optional(),
});

// Defaults
const registerDefault = {
  full_name: '',
  email: '',
  password: '',
  phone_number: '',
  // company_name: '',
  // profession: '',
  // title: '',
  accept_terms: false,
};

const registerFormField = [
  {
    name: 'full_name',
    placeholder: 'Enter your full name here',
  },
  {
    name: 'email',
    placeholder: 'Enter a valid email address',
  },
  {
    name: 'password',
    placeholder: 'Choose a strong password.',
  },
  {
    name: 'phone_number',
    placeholder: 'Enter a valid phone number',
  },
  // {
  //   name: 'company_name',
  //   placeholder: 'Your Company Name',
  // },
  // {
  //   name: 'profession',
  //   placeholder: 'In what industry are you working?',
  // },
  // {
  //   name: 'title',
  //   placeholder: 'Enter your professional title',
  // },
];

// Define Zod validation schema for Login Form
const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' }),

  password: z.string().trim().min(2, 'Provide your password'),
  remember_me: z.boolean().default(false).optional(),
});

const loginDefault = {
  email: '',
  password: '',
  remember_me: false,
};

const loginFormField = [
  {
    name: 'email',
    placeholder: 'Enter a valid email address',
  },
  {
    name: 'password',
    placeholder: 'Enter your password',
  },
];

// Creating or editing an  appointment
const appointmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, 'Appointment title must be at least 10 characters.'),

  description: z
    .string()
    .trim()
    .min(20, 'Provide a more descriptive text about your appointment.'),

  amount_payable: z.string().min(3, 'Please enter a valid amount.'),
});

// Defaults
const appointmentDefault = {
  title: '',
  description: '',
  amount_payable: '',
};

const appointmentFormField = [
  {
    name: 'title',
    placeholder: 'Title of the Appointment',
  },
  {
    name: 'amount_payable',
    placeholder: 'Amount Clients will pay to book.',
  },
];

// Export Schemas
export {
  registerFormSchema,
  loginFormSchema,
  registerDefault,
  registerFormField,
  loginDefault,
  loginFormField,
  appointmentFormField,
  appointmentDefault,
  appointmentSchema,
};
