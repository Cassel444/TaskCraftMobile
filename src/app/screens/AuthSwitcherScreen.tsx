import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';
import { useFadeAnimation } from '../../hooks/animations/useFadeAnimation';

export default function AuthSwitcher() {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(true);

  const { fadeAnim, translateY, fadeOut } = useFadeAnimation();

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, isRegister && styles.activeTab]}
          onPress={() => setIsRegister(true)}
        >
          <Text
            style={[
              styles.tabText,
              isRegister ? styles.activeText : styles.inactiveText,
            ]}
          >
            {t('auth_switcher.tab_register')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, !isRegister && styles.activeTab]}
          onPress={() => setIsRegister(false)}
        >
          <Text
            style={[
              styles.tabText,
              !isRegister ? styles.activeText : styles.inactiveText,
            ]}
          >
            {t('auth_switcher.tab_login')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {isRegister ? (
          <RegisterForm parentFadeOut={fadeOut} />
        ) : (
          <LoginForm parentFadeOut={fadeOut} />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: { borderColor: '#eebebe' },
  tabText: { fontSize: 18, fontWeight: '600' },
  activeText: { color: '#e0ff6c' },
  inactiveText: { color: '#FFF' },
  formContainer: { paddingBottom: 40 },
});
