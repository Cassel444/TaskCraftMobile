import { useEffect } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/types';

type GoogleCallbackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function GoogleCallbackScreen() {
  const navigation = useNavigation<GoogleCallbackNavigationProp>();

  useEffect(() => {
    const processUrl = async () => {
      const url = await Linking.getInitialURL();
      if (!url) return;

      const params = new URLSearchParams(url.split('?')[1] ?? '');

      const access = params.get('accessToken');
      const refresh = params.get('refreshToken');

      if (access) await AsyncStorage.setItem('accessToken', access);
      if (refresh) await AsyncStorage.setItem('refreshToken', refresh);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    };

    processUrl();
  }, []);

  return null;
}
