import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthGate from '../components/AuthGate';
import linking from './navigation/linking';
import '../i18n';

import { ReactQueryProvider } from '../providers/ReactQueryProvider';

function AppContent() {
  return (
    <NavigationContainer linking={linking}>
      <AuthGate />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ReactQueryProvider>
      <AppContent />
    </ReactQueryProvider>
  );
}
