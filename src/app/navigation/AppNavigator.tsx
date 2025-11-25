import React from 'reac
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/WelcomeScreen';
import AuthNavigator from './AuthNavigator';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <LanguageSwitcher />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </View>
  );
}
