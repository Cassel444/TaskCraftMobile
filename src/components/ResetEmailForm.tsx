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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/paramList/types';
import { useRequestPasswordReset } from '../hooks/useRequestPasswordReset';
import { createEmailSchema } from '../validation/validationSchema';
import { useFadeAnimation } from '../hooks/animations/useFadeAnimation';
import { isAxiosError } from 'axios';

interface EmailFormValues {
  email: string;
}

export default function EmailForm() {
  const [showMessage, setShowMessage] = useState(false);
  const { mutate, isPending: isSendMessage } = useRequestPasswordReset();

  const { t } = useTranslation();
  const emailSchema = createEmailSchema(t);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { fadeAnim, translateY, fadeOut } = useFadeAnimation();

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
    mutate(data, {
      onSuccess: () => {
        setShowMessage(true);
        reset();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          // 🟢 Перевод Toast
          const message =
            error.response?.data?.message ||
            t('toast.password_reset_failed_api');
          Alert.alert(message);
        } else {
          // 🟢 Перевод Toast
          Alert.alert(t('toast.network_error'));
        }
      },
    });
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

  if (isSendMessage) {
    return <ActivityIndicator />;
  }

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
            onPress={async () => {
              await fadeOut(); // 1️⃣ дочека́тися зникнення
              navigation.replace('AuthSwitcher'); // 2️⃣ потім перейти
            }}
          >
            <Text style={styles.linkText}>
              {t('reset_password_request.back_link')}
            </Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            {/* Reset button */}
            <TouchableOpacity
              style={[
                styles.authButton,
                isSendMessage && styles.buttonDisabled,
              ]}
              onPress={() => handleSubmit(onSubmit)()}
              disabled={isSendMessage}
            >
              {isSendMessage ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {t('reset_password_request.button_send')}
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
