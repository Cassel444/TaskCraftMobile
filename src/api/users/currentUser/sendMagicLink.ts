import api from '../../api';

export interface MagicLinkRequestData {
  email: string;
}
export interface MagicLinkResponse {
  message: string;
}

export const sendMagicLink = async (data: MagicLinkRequestData) => {
  const response = await api.post<MagicLinkResponse>(
    'users/send-magic-link',
    data,
  );
  return response.data;
};
