import api from '../api';

export interface RefreshResponse {
  access_token: string;
  expires_in: number;
}

export const refreshToken = async (): Promise<RefreshResponse> => {
  try {
    console.log('🔄 Refreshing token...');
    const response = await api.post<RefreshResponse>('auth/refresh');

    console.log('✅ Token refreshed:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Refresh token failed:', error);
    throw error;
  }
};
