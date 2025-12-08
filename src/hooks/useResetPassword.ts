import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { resetPassword, ResetPasswordData } from '../api/auth/resetPassword';

export const useResetPassword = () => {
  return useMutation<void, AxiosError, ResetPasswordData>({
    mutationFn: (data) => resetPassword(data),
  });
};
