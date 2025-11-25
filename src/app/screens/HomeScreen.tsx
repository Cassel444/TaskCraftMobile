import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/types';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.replace('Auth')}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          This is a home. Press me
        </Text>
      </TouchableOpacity>
    </View>
  );
}
