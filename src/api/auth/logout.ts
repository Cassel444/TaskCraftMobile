import api from '../api';

export interface LogoutData {
  userId: string;
}

export const logoutUser = async (): Promise<void> => {
  await api.post<void>('auth/logout');
};
