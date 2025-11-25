import React, { useState, useEffect, useRef } from 'react';
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
import * as yup from 'yup';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/types';
import { useRegister } from '../hooks/useRegister';
import SvgGoogle from '../assets/logo/SvgGoogle';
import EyeShow from '../assets/logo/SvgEyeShow';
import EyeHide from '../assets/logo/SvgEyeHide';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import PrivacyTermsModal from './PrivacyTermsModal';

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  privacyPolicy: boolean;
}

export default function RegisterForm() {
  const { t } = useTranslation();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const { register, loading } = useRegister(() => {
    navigation.replace('Home');
  });
  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const registerSchema = yup.object({
    username: yup
      .string()
      .required(t('validation.required'))
      .min(2, t('validation.name_min_2'))
      .max(50, t('validation.name_max_50')),
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .required(t('validation.required')),
    password: yup
      .string()
      .min(6, t('validation.password_min_6'))
      .required(t('validation.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwords_must_match'))
      .required(t('validation.password_confirm_required')),
    privacyPolicy: yup
      .boolean()
      .oneOf([true], t('validation.must_agree_to_policy'))
      .required(),
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await register({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      });
      reset();
      Alert.alert(
        t('toast.registration_success'),
        `Welcome, ${res.user?.username || ''}`,
      );
    } catch (err: any) {
      Alert.alert(
        t('toast.unexpected_error'),
        err?.message || 'Registration failed',
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.inner,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
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
        <Text style={styles.label}>{t('register.label_confirm_password')}</Text>
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
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t('register.button_submit')}</Text>
          )}
        </TouchableOpacity>
        {/* Google button */}
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[styles.button, googleLoading && styles.buttonDisabled]}
          disabled={googleLoading}
        >
          {googleLoading ? <ActivityIndicator color="#fff" /> : <SvgGoogle />}
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
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
