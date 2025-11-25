import { useEffect } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

export function useGoogleCallback() {
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const url = event.url;

      if (!url.startsWith('taskcraft://auth/google/callback')) return;

      const parsed = new URL(url);
      const code = parsed.searchParams.get('code');
      const state = parsed.searchParams.get('state');

      if (!code) return;

      const codeVerifier = await AsyncStorage.getItem('google_code_verifier');
      if (!codeVerifier) {
        console.log('No PKCE code_verifier in storage');
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/google/mobile/exchange-code`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              code_verifier: codeVerifier,
              state,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          await AsyncStorage.setItem('access_token', data.access_token);
          await AsyncStorage.setItem('refresh_token', data.refresh_token);

          Linking.openURL('taskcraft://home');
        } else {
          console.log('Exchange error:', data);
        }
      } catch (e) {
        console.log('Error exchanging code:', e);
      }
    };

    const sub = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      sub.remove();
    };
  }, []);
}
