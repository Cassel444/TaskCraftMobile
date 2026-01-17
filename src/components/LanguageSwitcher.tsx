import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';
import SvgLogo from '../assets/logo/SvgLogo';
import { useNavigation } from '@react-navigation/native';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome' as never)}
        >
          <SvgLogo />
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, i18n.language === 'en' && styles.active]}
          onPress={() => changeLanguage('en')}
        >
          <Text style={styles.text}>EN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, i18n.language === 'ua' && styles.active]}
          onPress={() => changeLanguage('ua')}
        >
          <Text style={styles.text}>UA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, i18n.language === 'ru' && styles.active]}
          onPress={() => changeLanguage('ru')}
        >
          <Text style={styles.text}>RU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2a45',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: '#ffbf00',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  active: { backgroundColor: '#ffbf00' },
  text: { color: 'white', fontWeight: '600' },
});
