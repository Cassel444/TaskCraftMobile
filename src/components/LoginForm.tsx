import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Linking,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/paramList/types';
import EyeShow from '../assets/logo/SvgEyeShow';
import EyeHide from '../assets/logo/SvgEyeHide';
import SvgGoogle from '../assets/logo/SvgGoogle';
import { useLogin } from '../hooks/useLogin';
import { useFadeAnimation } from '../hooks/animations/useFadeAnimation';
import { createLoginSchema } from '../validation/validationSchema';
import { API_BASE_URL } from '../config/api';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LoginFormValues {
  email: string;
  password: string;
}
interface LoginFormProps {
  parentFadeOut: () => Promise<void>;
}

export default function LoginForm({ parentFadeOut }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: isLoginPending } = useLogin();

  const { t } = useTranslation();
  const loginSchema = createLoginSchema(t);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { fadeAnim, translateY, fadeOut } = useFadeAnimation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: async () => {
          reset();
          Alert.alert(t('toast.login_success'));
          await new Promise((res) => setTimeout(res, 1500));
          navigation.replace('Home');
        },
        onError: (error) => {
          Alert.alert(
            isAxiosError(error)
              ? error.response?.data?.message || t('toast.login_failed_api')
              : t('toast.unexpected_error'),
          );
        },
      },
    );
  };

  const googleAuth = async () => {
    try {
      const url = `${API_BASE_URL}auth/google?redirect_uri=taskcraft://auth/google/callback`;
      await Linking.openURL(url);
    } catch (err) {
      console.error('Google register error:', err);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <Text style={styles.title}>{t('login.title')}</Text>

          {/* Email */}
          <Text style={styles.label}>{t('login.label_email')}</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('login.placeholder_email')}
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <View style={styles.errorContainer}>
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </View>

          {/* Password */}
          <Text style={styles.label}>{t('login.label_password')}</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  placeholder={t('login.placeholder_password')}
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

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotLink}
            onPress={async () => {
              await parentFadeOut(); // дочека́тися зникнення
              navigation.replace('EmailForm'); // потім перейти
            }}
          >
            <Text style={styles.linkText}>{t('login.forgot_password')}</Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            {/* Login button */}
            <TouchableOpacity
              style={[
                styles.authButton,
                isLoginPending && styles.buttonDisabled,
              ]}
              onPress={() => handleSubmit(onSubmit)()}
              disabled={isLoginPending}
            >
              {isLoginPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{t('login.button_login')}</Text>
              )}
            </TouchableOpacity>

            {/* Google button */}
            <TouchableOpacity
              style={[styles.authButton, styles.googleButton]}
              onPress={googleAuth}
            >
              <SvgGoogle />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    borderRadius: 40,
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
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
  forgotLink: {
    alignSelf: 'flex-end',
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
  googleButton: {
    flexDirection: 'row',
  },
});
