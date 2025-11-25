import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';

import { API_BASE_URL } from '../../config/api';

// Generate random string for PKCE
function generateRandomString(length: number) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < randomValues.length; i++) {
    result += charset.charAt(randomValues[i] % charset.length);
  }

  return result;
}

// SHA256 → base64url
async function sha256(baseString: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(baseString);

  const digest = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(digest));

  // Convert to base64url
  return Buffer.from(hashArray)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const googleAuth = async () => {
  const codeVerifier = generateRandomString(64);
  await AsyncStorage.setItem('google_code_verifier', codeVerifier);

  const codeChallenge = await sha256(codeVerifier);

  const redirectUri = encodeURIComponent('taskcraft://auth/google/callback');

  const url = `${API_BASE_URL}/auth/google/mobile?redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  await Linking.openURL(url);
};
