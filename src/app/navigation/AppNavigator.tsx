import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Home from '../screens/HomeScreen';
import Welcome from '../screens/WelcomeScreen';
import AuthNavigator from './AuthNavigator';
import Boards from '../screens/Boards';
import Analytics from '../screens/Analytics';
import Achievements from '../screens/Achievements';
import Calendar from '../screens/Calendar';
import Support from '../screens/Support';
import MainScreen from '../screens/Main';
import CreateBoardModal from '../screens/CreateBoardModal';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <LanguageSwitcher />
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Boards" component={Boards} />
        <Stack.Screen name="Analytics" component={Analytics} />
        <Stack.Screen name="Achievements" component={Achievements} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Menu" component={MainScreen} />
        <Stack.Screen name="CreateBoardModal" component={CreateBoardModal} />
      </Stack.Navigator>
    </View>
  );
}
