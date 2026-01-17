import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayout from '../layouts/AuthLayout';
import AuthSwitcher from '../screens/AuthSwitcherScreen';
import GoogleCallbackScreen from '../screens/GoogleCallback';
import EmailForm from '../../components/ResetEmailForm';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import ResetPasswordForm from '../../components/ResetPasswordForm';

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
        <Stack.Screen name="EmailForm" component={EmailForm} />
        <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
        {/* <Stack.Screen name="ResetPassword" component={ResetPasswordForm} /> */}
      </Stack.Navigator>
    </AuthLayout>
  );
}
