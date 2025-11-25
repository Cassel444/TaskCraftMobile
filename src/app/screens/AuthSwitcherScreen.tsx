import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';

export default function AuthSwitcher() {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(true);

  return (
    <View style={styles.container}>
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
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,

    // backgroundColor: 'transparent',
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
