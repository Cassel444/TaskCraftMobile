import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from '../app/navigation/AuthNavigator';
import AppNavigator from '../app/navigation/AppNavigator';

export default function AuthGate() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const access = await AsyncStorage.getItem('accessToken');
        const refresh = await AsyncStorage.getItem('refreshToken');

        if (!access && !refresh) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}
