// AuthNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayout from '../layouts/AuthLayout';
import AuthSwitcher from '../screens/AuthSwitcherScreen';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import GoogleCallbackScreen from '../screens/GoogleCallback';
import EmailForm from '../../components/ResetEmailForm';
import { Home } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthLayout>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
        initialRouteName="AuthSwitcher"
      >
        <Stack.Screen name="AuthSwitcher" component={AuthSwitcher} />
        <Stack.Screen name="GoogleCallback" component={GoogleCallbackScreen} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegisterForm} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ResetEmail" component={EmailForm} />
      </Stack.Navigator>
    </AuthLayout>
  );
}
