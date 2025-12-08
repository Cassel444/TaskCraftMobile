import React, { useState } from 'react';
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
  Linking,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/paramList/types';
import { useRegister } from '../hooks/useRegister';
import SvgGoogle from '../assets/logo/SvgGoogle';
import EyeShow from '../assets/logo/SvgEyeShow';
import EyeHide from '../assets/logo/SvgEyeHide';
import PrivacyTermsModal from './PrivacyTermsModal';
import { createRegisterSchema } from '../validation/validationSchema';
import { useSendMagicLink } from '../hooks/users/currentUser/useSendMagicLink';
import { isAxiosError } from 'axios';
import { useFadeAnimation } from '../hooks/animations/useFadeAnimation';
import { API_BASE_URL } from '../config/api';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RegisterForm'
>;

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  privacyPolicy: boolean;
}

interface RegisterFormProps {
  parentFadeOut: () => Promise<void>;
}

export default function RegisterForm({ parentFadeOut }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: registerUser, isPending: isRegistering } = useRegister();
  const { mutate: sendLink, isPending: isSendingLink } = useSendMagicLink();
  const isPending = isRegistering || isSendingLink;

  const { t } = useTranslation();
  const registerSchema = createRegisterSchema(t);

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const { fadeAnim, translateY, fadeOut } = useFadeAnimation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    registerUser(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: (response) => {
          Alert.alert(t('toast.registration_success'));
          const user = response?.user;

          if (!user?.isActive) {
            sendLink(
              { email: data.email },
              {
                onSuccess: () => {
                  reset();
                  navigation.replace('CheckEmail');
                },
                onError: () => Alert.alert(t('toast.unexpected_error')),
              },
            );
          } else {
            navigation.replace('Home');
          }
        },
        onError: (error) => {
          Alert.alert(
            isAxiosError(error)
              ? error.response?.data?.message || t('toast.registration_failed')
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
          <Text style={styles.title}>{t('register.title')}</Text>

          {/* Username */}
          <Text style={styles.label}>{t('register.label_name')}</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('register.placeholder_name')}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <View style={styles.errorContainer}>
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}
          </View>

          {/* Email */}
          <Text style={styles.label}>{t('register.label_email')}</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('register.placeholder_email')}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
              />
            )}
          />
          <View style={styles.errorContainer}>
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </View>

          {/* Password */}
          <Text style={styles.label}>{t('register.label_password')}</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  placeholder={t('register.placeholder_password')}
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
            {t('register.label_confirm_password')}
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showConfirmPassword}
                  placeholder={t('register.placeholder_confirmPassword')}
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

          {/* Privacy Policy */}
          <PrivacyTermsModal control={control} />
          <View style={styles.errorContainer}>
            {errors.privacyPolicy && (
              <Text style={styles.error}>{errors.privacyPolicy.message}</Text>
            )}
          </View>

          {/* Submit button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.button, isPending && styles.buttonDisabled]}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {t('register.button_submit')}
              </Text>
            )}
          </TouchableOpacity>
          {/* Google button */}
          <TouchableOpacity onPress={googleAuth} style={styles.button}>
            <SvgGoogle />
          </TouchableOpacity>
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
  errorContainer: {
    minHeight: 18,
    justifyContent: 'flex-start',
  },
  error: { color: '#801422', fontSize: 13 },
  button: {
    backgroundColor: 'rgba(32, 29, 11, .2784313725)',
    borderRadius: 40,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 18 },
});
