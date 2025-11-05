import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Login Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
}
