import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCreateBoard } from '../../hooks/boards/useCreateBoard';
import { useGetAllBoards } from '../../hooks/boards/useGetAllBoards';
import { useGetCurrentUser } from '../../hooks/users/currentUser/useGetCurrentUser';

type Inputs = {
  title: string;
  description: string;
};

type CreateBoardModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 200;

export default function CreateBoardModal({
  isOpen,
  setIsOpen,
}: CreateBoardModalProps) {
  const onClose = () => setIsOpen(false);
  const { t } = useTranslation();
  const { data: user } = useGetCurrentUser();
  const { data: boards } = useGetAllBoards();
  const { mutateAsync: createBoard, isPending } = useCreateBoard();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const titleValue = watch('title');
  const descriptionValue = watch('description');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFocus('title'), 300);
    }
  }, [isOpen]);

  const onSubmit = async (data: Inputs) => {
    if (!user?.id) {
      Alert.apply(t('auth.user_not_authenticated'));
      return;
    }

    const exists = boards?.some(
      (b) => b.title.toLowerCase() === data.title.trim().toLowerCase(),
    );

    if (exists) {
      Alert.apply(t('modal_create_board.error_duplicate_name'));
      return;
    }

    try {
      await createBoard(data);
      reset();
      Alert.apply(t('modal_create_board.success_toast'));
      onClose();
    } catch {
      Alert.apply(t('modal_create_board.error_toast'));
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={() => {}}>
          {/* Close */}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <Text style={styles.title}>{t('modal_create_board.title')}</Text>

          {/* Title */}

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('modal_create_board.placeholder_name')}
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Text style={styles.counter}>
            {titleValue.length}/{MAX_TITLE_LENGTH}
          </Text>
          <View style={styles.errorContainer}>
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </View>

          {/* Description */}
          <Controller
            control={control}
            name="description"
            rules={{
              minLength: {
                value: 3,
                message: t('validationn.min_length_3'),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <View>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder={t('modal_create_board.placeholder_description')}
                  placeholderTextColor="#aaa"
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  multiline
                  value={value}
                  onChangeText={onChange}
                />
                <Text style={styles.counter}>
                  {descriptionValue.length}/{MAX_DESCRIPTION_LENGTH}
                </Text>
              </View>
            )}
          />
          <View style={styles.errorContainer}>
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </View>

          {/* Submit */}
          <Pressable
            style={[styles.submit, isPending && { opacity: 0.6 }]}
            disabled={isPending}
            onPress={() => handleSubmit(onSubmit)()}
          >
            <Text style={styles.submitText}>
              {isPending
                ? t('modal.creating')
                : t('modal_create_board.create_btn')}
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#1f2a45',
    borderRadius: 20,
    padding: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  closeText: {
    fontSize: 22,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#23395b',
    borderRadius: 12,
    padding: 12,
    color: 'white',
    marginBottom: 6,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  counter: {
    textAlign: 'right',
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
  },
  errorContainer: {
    minHeight: 18,
    justifyContent: 'flex-start',
  },
  error: { color: '#801422', fontSize: 13 },
  submit: {
    backgroundColor: '#00c9ff',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});
