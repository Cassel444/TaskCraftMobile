import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import {
  updateCurrentUser,
  UpdateCurrentUserData,
  UpdateCurrentUserResponse,
} from '../../../api/users/currentUser/updateCurrentUser';

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCurrentUserResponse, Error, UpdateCurrentUserData>({
    mutationFn: updateCurrentUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['currentUser', variables],
      });

      Alert.alert('User updated!');
    },
    onError: () => {
      Alert.alert('Error updating user');
    },
  });
};
