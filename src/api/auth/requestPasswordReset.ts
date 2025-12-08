import api from '../api';

export interface requestPasswordResetData {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
}

export const requestPasswordReset = async (
  data: requestPasswordResetData,
): Promise<PasswordResetResponse> => {
  const response = await api.post<PasswordResetResponse>(
    'auth/request-password-reset',
    data,
  );

  return response.data;
};
