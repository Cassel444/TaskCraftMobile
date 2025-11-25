import { useState } from 'react';
import {
  requestPasswordReset,
  RequestPasswordResetData,
  PasswordResetResponse,
} from '../api/auth/requestPasswordReset';

export const useRequestPasswordReset = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (data: RequestPasswordResetData) => {
    setLoading(true);
    setError(null);

    try {
      const response: PasswordResetResponse = await requestPasswordReset(data);

      if (onSuccess) onSuccess();

      return response;
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Something went wrong';
      setError(message);
      throw { message };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendRequest,
    loading,
    error,
  };
};
