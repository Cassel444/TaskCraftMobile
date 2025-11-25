import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------- REQUEST INTERCEPTOR ----------
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------- RESPONSE INTERCEPTOR ----------
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Якщо 401 і ще не пробували оновлюватись
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = await AsyncStorage.getItem('refreshToken');
      if (!refresh) return Promise.reject(error);

      try {
        const refreshResponse = await api.post('auth/refresh', {
          refreshToken: refresh,
        });

        const newAccess = refreshResponse.data.accessToken;
        const newRefresh = refreshResponse.data.refreshToken;

        await AsyncStorage.setItem('accessToken', newAccess);
        await AsyncStorage.setItem('refreshToken', newRefresh);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (e) {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
