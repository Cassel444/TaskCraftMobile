import api from '../api';
import { UserWithoutPassword } from '../../types/userWithoutPassword';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface RegisterResponse {
  message: string;
  user: UserWithoutPassword;
}

export const registerUser = async (
  userData: RegisterData,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('auth/register', userData);
  console.log('RegisterResponse', response.data);
  return response.data;
};
