import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/paramList/types';
import { createResetPasswordSchema } from '../validation/validationSchema';
import { useFadeAnimation } from '../hooks/animations/useFadeAnimation';
import { useResetPassword } from '../hooks/useResetPassword';
import EyeShow from '../assets/logo/SvgEyeShow';
import EyeHide from '../assets/logo/SvgEyeHide';

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;
type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPassword'
>;

interface ResetPasswordFormProps {
  token: string | null;
}

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  const { t } = useTranslation();
  const resetPasswordSchema = createResetPasswordSchema(t);

  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const route = useRoute<ResetPasswordScreenRouteProp>();
  // const token = route.params?.token;

  const { fadeAnim, translateY, fadeOut } = useFadeAnimation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      Alert.alert(t('toast.unexpected_error'));
      return;
    }
    resetPassword(
      { token, newPassword: data.confirmPassword },
      {
        onSuccess: async () => {
          reset();
          Alert.alert(t('toast.password_reset_success'));
          await new Promise((res) => setTimeout(res, 1500));

          navigation.replace('Home');
        },
        onError: () => Alert.alert(t('toast.password_reset_failed')),
      },
    );

    if (isPending) {
      return <ActivityIndicator color="#fff" />;
    }
  };
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>{t('reset_password.title')}</Text>

          {/* Password */}
          <Text style={styles.label}>{t('reset_password.label_password')}</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  placeholder={t('reset_password.placeholder_password')}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeShow /> : <EyeHide />}
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.errorContainer}>
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>
            {t('reset_password.label_confirm_password')}
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showConfirmPassword}
                  placeholder={t('reset_password.placeholder_password')}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowConfirmPassword((s) => !s)}
                >
                  {showConfirmPassword ? <EyeShow /> : <EyeHide />}
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.errorContainer}>
            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword.message}</Text>
            )}
          </View>
          {/* Back Link */}
          <TouchableOpacity
            style={styles.backLink}
            onPress={async () => {
              await fadeOut(); // 1️⃣ дочека́тися зникнення
              navigation.replace('Auth'); // 2️⃣ потім перейти
            }}
          >
            <Text style={styles.linkText}>
              {t('reset_password.back_to_login')}
            </Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            {/* Reset button */}
            <TouchableOpacity
              style={[styles.authButton, isPending && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {t('reset_password.button_submit')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  inner: {
    width: '100%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    borderRadius: 40,
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    color: '#ead8d8',
  },
  input: {
    borderWidth: 0,
    padding: 10,
    marginVertical: 6,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  error: {
    color: '#801422',
    fontSize: 13,
  },
  errorContainer: {
    minHeight: 18,
    justifyContent: 'flex-start',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  backLink: {
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#ead8d8',
  },
  authButton: {
    backgroundColor: 'rgba(32, 29, 11, .2784313725)',
    flex: 1,
    borderRadius: 40,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },
});
