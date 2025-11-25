import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, RegisterData } from '../api/auth/register';
import { loginUser } from '../api/auth/login';

export const useRegister = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        timezone:
          data.timezone ||
          Intl.DateTimeFormat().resolvedOptions().timeZone ||
          'UTC',
        isActive: data.isActive,
      };

      const user = await registerUser(submitData);

      const loginResp = await loginUser({
        email: submitData.email,
        password: submitData.password,
      });

      if (loginResp.access_token) {
        await AsyncStorage.setItem('accessToken', loginResp.access_token);
      }

      if (onSuccess) {
        onSuccess();
      }

      return { user, token: loginResp.access_token };
    } catch (err: any) {
      const message = err?.message || 'Registration failed. Please try again.';
      setError(message);
      throw { message };
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
};
