import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Home from '../screens/HomeScreen';
import Welcome from '../screens/WelcomeScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <LanguageSwitcher />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </View>
  );
}
