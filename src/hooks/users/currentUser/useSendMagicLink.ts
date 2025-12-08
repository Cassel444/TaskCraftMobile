import { useMutation } from '@tanstack/react-query';
import {
  MagicLinkRequestData,
  sendMagicLink,
} from '../../../api/users/currentUser/sendMagicLink';

export const useSendMagicLink = () => {
  return useMutation({
    mutationFn: (data: MagicLinkRequestData) => sendMagicLink(data),
  });
};
