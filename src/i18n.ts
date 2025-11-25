import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import ua from './locales/ua.json';
import ru from './locales/ru.json';

const LANGUAGE_KEY = 'user-language';

const getStoredLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return lang || 'en';
  } catch {
    return 'en';
  }
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ua: { translation: ua },
    ru: { translation: ru },
  },
  interpolation: { escapeValue: false },
});

getStoredLanguage().then((lang) => i18n.changeLanguage(lang));

export const changeLanguage = async (lng: string) => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
};

export default i18n;
