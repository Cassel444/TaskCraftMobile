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
