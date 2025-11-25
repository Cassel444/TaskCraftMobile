import api from '../api';
import { UserWithoutPassword } from '../../types/userWithoutPassword';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  timezone?: string;
  isActive?: boolean;
}

export type RegisterResponse = UserWithoutPassword;

export const registerUser = async (
  userData: RegisterData,
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      'auth/register',
      userData,
    );
    return response.data;
  } catch (err: any) {
    console.log('Register error:', err?.response || err);
    const message =
      err?.response?.data?.message ||
      'Register failed. Please try again later.';
    throw { message };
  }
};
