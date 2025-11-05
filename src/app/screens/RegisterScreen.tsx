import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const registerSchema = yup.object({
  username: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'At least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password'),
  privacyPolicy: yup.boolean().oneOf([true], 'You must accept the policy'),
});

export default function RegisterScreen({ navigation }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsPending(true);
    try {
      await axios.post('https://your-backend-url.com/api/register', data);
      Alert.alert('Registration successful!');
      navigation.navigate('Login'); // або інший екран
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || 'Registration failed';
      Alert.alert('Error', message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {/* Username */}
      <Text>Name</Text>
      <View style={styles.inputGroup}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      {/* Email */}
      <Text>Email</Text>
      <View style={styles.inputGroup}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="username@gmail.com"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
          )}
        />
      </View>
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password */}
      <Text>Password</Text>
      <View style={styles.inputGroup}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.toggle}>
          {showPassword ? 'Hide' : 'Show'} password
        </Text>
      </TouchableOpacity>
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Confirm Password */}
      <Text>Confirm Password</Text>
      <View style={styles.inputGroup}>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm password"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
      >
        <Text style={styles.toggle}>
          {showConfirmPassword ? 'Hide' : 'Show'} password
        </Text>
      </TouchableOpacity>
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      {/* Privacy Policy */}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
      >
        <Controller
          control={control}
          name="privacyPolicy"
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity onPress={() => onChange(!value)}>
              <Text style={{ marginRight: 8 }}>{value ? '✅' : '⬜'}</Text>
            </TouchableOpacity>
          )}
        />
        <Text>I agree to the Terms of Service and Privacy Policy</Text>
      </View>
      {errors.privacyPolicy && (
        <Text style={styles.error}>{errors.privacyPolicy.message}</Text>
      )}

      {/* Submit button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, isPending && styles.buttonDisabled]}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  toggle: {
    marginTop: 6,
    color: '#007bff',
    alignSelf: 'flex-end',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
