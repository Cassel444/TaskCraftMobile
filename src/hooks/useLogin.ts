import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUser, LoginCredentials, LoginResponse } from '../api/auth/login';
import { getCurrentUser } from '../api/users/currentUser/getCurrentUser';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginCredentials
  >({
    mutationFn: loginUser,
    onSuccess: async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log('CurrentUser:', currentUser);
        queryClient.setQueryData(['currentUser'], currentUser); // зберігаємо юзера у кеш
        await AsyncStorage.setItem('userId', currentUser.id); // зберігаємо userId в AsyncStorage
      } catch (err) {
        throw err;
      }
    },
  });
};
