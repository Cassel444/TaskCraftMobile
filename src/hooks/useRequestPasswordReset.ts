import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
  requestPasswordReset,
  requestPasswordResetData,
  PasswordResetResponse,
} from '../api/auth/requestPasswordReset';

export const useRequestPasswordReset = () => {
  return useMutation<
    PasswordResetResponse,
    AxiosError<{ message: string }>,
    requestPasswordResetData
  >({
    mutationFn: (data) => requestPasswordReset(data),
  });
};
