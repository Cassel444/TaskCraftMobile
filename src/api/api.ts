import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../config/api';
import { refreshToken } from './auth/refreshToken';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

interface FailedRequest {
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: FailedRequest[] = [];

// Очистка черги при логауті
export const handleLogoutCleanup = () => {
  failedQueue.forEach(({ reject }) => reject(new Error('User logged out')));
  failedQueue = [];
  isRefreshing = false;
};

// Обробка черги після оновлення токена
const processQueue = (
  error: unknown,
  response: AxiosResponse | null = null,
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (response) resolve(response);
  });
  failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 і не retry, і не login/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !['auth/refresh', 'auth/login'].some((path) =>
        originalRequest.url.includes(path),
      )
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        await refreshToken(); // оновити токен через HttpOnly кукі
        const newResponse = await api(originalRequest); // повторюємо оригінальний запит
        processQueue(null, newResponse);
        return newResponse;
      } catch (err) {
        console.error('Refresh token failed:', err);
        handleLogoutCleanup(); // очищаємо чергу
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
