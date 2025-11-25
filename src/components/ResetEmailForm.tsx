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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/types';
import { useRequestPasswordReset } from '../hooks/useRequestPasswordReset';
import { createEmailSchema } from '../validation/validationSchema';

interface EmailFormValues {
  email: string;
}

export default function EmailForm() {
  const [showMessage, setShowMessage] = useState(false);

  const { t } = useTranslation();
  const emailSchema = createEmailSchema(t);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { sendRequest, loading } = useRequestPasswordReset(() => {
    console.log('Email sent!');
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

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
  } = useForm<EmailFormValues>({
    resolver: yupResolver(emailSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      await sendRequest({ email: data.email });
      reset();
      setShowMessage(true);
    } catch (e: any) {
      console.log('Error:', e.message);
    }
  };

  if (showMessage) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          {t('reset_password_request.success_message')}
        </Text>
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

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
        <Text style={styles.title}>{t('reset_password_request.title')}</Text>

        {/* Email */}
        <Text style={styles.label}>
          {t('reset_password_request.label_email')}
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={t('reset_password_request.placeholder_email')}
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

        {/* Back Link */}
        <TouchableOpacity
          style={styles.forgotLink}
          onPress={() => navigation.replace('Auth')}
        >
          <Text style={styles.linkText}>
            {t('reset_password_request.back_link')}
          </Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          {/* Reset button */}
          <TouchableOpacity
            style={[styles.authButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {t('reset_password_request.button_send')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
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
  text: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },
});
