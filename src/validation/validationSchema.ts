import * as yup from 'yup';

const nameRegex = /^[A-Za-zА-Яа-яЁёҐґЄєІіЇї'\-\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(nameRegex, 'Use letters, spaces, apostrophes, or hyphens')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .matches(emailRegex, 'Must be a valid email')
    .required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  privacyPolicy: yup
    .boolean()
    .oneOf([true], 'You must accept the privacy policy'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .matches(emailRegex, 'Must be a valid email')
    .required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .matches(emailRegex, 'Must be a valid email')
    .required('Required'),
});
