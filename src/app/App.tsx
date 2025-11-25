import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthGate from '../components/AuthGate';
import linking from './navigation/linking';
import '../i18n';
import { useGoogleCallback } from '../hooks/useGoogleCallback';

export default function App() {
  useGoogleCallback();
  return (
    <NavigationContainer linking={linking}>
      <AuthGate />
    </NavigationContainer>
  );
}
