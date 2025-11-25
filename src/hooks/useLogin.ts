import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, LoginCredentials } from '../api/auth/login';

export const useLogin = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const loginData = {
        email: credentials.email,
        password: credentials.password,
      };
      const response = await loginUser(loginData);

      if (response.access_token) {
        await AsyncStorage.setItem('accessToken', response.access_token);
      }

      if (onSuccess) onSuccess();

      return {
        token: response.access_token,
        message: response.message,
      };
    } catch (err: any) {
      const message = err?.message || 'Login failed. Please try again.';
      setError(message);
      throw { message };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
