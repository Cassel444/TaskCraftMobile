import api from '../api';

export interface RequestPasswordResetData {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
}

export const requestPasswordReset = async (
  data: RequestPasswordResetData,
): Promise<PasswordResetResponse> => {
  const response = await api.post<PasswordResetResponse>(
    'auth/request-password-reset',
    data,
  );

  return response.data;
};
