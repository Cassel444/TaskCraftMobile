import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
  registerUser,
  RegisterData,
  RegisterResponse,
} from '../api/auth/register';

export const useRegister = () => {
  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterData
  >({
    mutationFn: registerUser,
  });
};
