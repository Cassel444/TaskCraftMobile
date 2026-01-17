import { Alert } from 'react-native';
import { createBoard, CreateBoardData } from '../../api/boards/createBoard';
import { Board } from '../../types/board';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation<Board, AxiosError, CreateBoardData>({
    mutationFn: (data) => createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      // toast.success('Board successfully created!');
    },
    onError: () => {
      Alert.alert('Error creating board');
    },
  });
};
