import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/types';
import EyeShow from '../assets/logo/SvgEyeShow';
import EyeHide from '../assets/logo/SvgEyeHide';
import SvgGoogle from '../assets/logo/SvgGoogle';
import { useLogin } from '../hooks/useLogin';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading } = useLogin(() => {
    navigation.replace('Home');
  });
  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const loginSchema = yup.object({
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .required(t('validation.required')),
    password: yup
      .string()
      .min(6, t('validation.password_min_6'))
      .required(t('validation.required')),
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });
      reset();
      Alert.alert(t('toast.login_success'), res.message);
    } catch (err: any) {
      Alert.alert(t('toast.unexpected_error'), err?.message || 'Login failed');
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
          onPress={() => navigation.replace('ResetEmail')}
        >
          <Text style={styles.linkText}>{t('login.forgot_password')}</Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          {/* Login button */}
          <TouchableOpacity
            style={[styles.authButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t('login.button_login')}</Text>
            )}
          </TouchableOpacity>

          {/* Google button */}
          <TouchableOpacity
            style={[
              styles.authButton,
              styles.googleButton,
              googleLoading && styles.buttonDisabled,
            ]}
            onPress={signInWithGoogle}
            disabled={googleLoading}
          >
            {googleLoading ? <ActivityIndicator color="#fff" /> : <SvgGoogle />}
          </TouchableOpacity>
        </View>
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
