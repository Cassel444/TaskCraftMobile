import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getCurrentUser } from '../../../api/users/currentUser/getCurrentUser';
import { User } from '../../../types/user';

export const useGetCurrentUser = () => {
  return useQuery<User, AxiosError, User>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // не будет перезапрашивать в течение 5 мин
    // cacheTime: 1000 * 60 * 10,
    retry: false, // do not repeat the request if there is an error (e.g. 401)
  });
};
