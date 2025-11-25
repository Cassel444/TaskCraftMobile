import * as yup from 'yup';

type TFunction = (key: string) => string;

const nameRegex = /^[A-Za-zА-Яа-яЁёҐґЄєІіЇї'\-\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ----------------------------------------------------------------------
// Схема для Регистрации (Register)
// ----------------------------------------------------------------------

export const createRegisterSchema = (t: TFunction) => {
  return yup.object().shape({
    username: yup
      .string()
      .matches(nameRegex, t('validation.name_invalid_chars'))
      // 🟢 FIX: Use only t('key') for the message argument
      .min(2, t('validation.name_min_2')) // Key changed to name_min_2 to reflect static value 2
      .max(50, t('validation.name_max_50')) // Key changed to name_max_50
      .required(t('validation.required')),
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .matches(emailRegex, t('validation.email_invalid'))
      .required(t('validation.required')),
    password: yup
      .string()
      // 🟢 FIX: Use only t('key') for the message argument
      .min(6, t('validation.password_min_6')) // Key changed to password_min_6
      .required(t('validation.required')),
    confirmPassword: yup
      .string()
      .nullable()
      .oneOf([yup.ref('password'), null], t('validation.passwords_must_match'))
      .required(t('validation.password_confirm_required')),
    privacyPolicy: yup
      .boolean()
      .required(t('validation.required'))
      .oneOf([true], t('validation.must_agree_to_policy')),
  });
};

// ----------------------------------------------------------------------
// Схема для Входа (Login)
// ----------------------------------------------------------------------

export const createLoginSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .matches(emailRegex, t('validation.email_invalid'))
      .required(t('validation.required')),
    password: yup
      .string()
      .min(6, t('validation.password_min_6')) // 🟢 FIX
      .required(t('validation.required')),
  });
};

// ----------------------------------------------------------------------
// Схема для Сброса Пароля (Reset Password)
// ----------------------------------------------------------------------

export const createResetPasswordSchema = (t: TFunction) => {
  return yup.object().shape({
    password: yup
      .string()
      .min(6, t('validation.password_min_6')) // 🟢 FIX
      .required(t('validation.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwords_must_match'))
      .required(t('validation.password_confirm_required')),
  });
};

// ----------------------------------------------------------------------
// Схема для Email (Email Only)
// ----------------------------------------------------------------------

export const createEmailSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .matches(emailRegex, t('validation.email_invalid'))
      .required(t('validation.required')),
  });
};
=======
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

