import api from '../api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
}

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('auth/login', credentials);
    return response.data;
  } catch (err: any) {
    console.log('Login error:', err?.response || err);

    const message =
      err?.response?.data?.message || 'Login failed. Please try again later.';

    throw { message };
  }
};
