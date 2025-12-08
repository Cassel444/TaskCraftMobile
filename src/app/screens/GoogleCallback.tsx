import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function GoogleCallbackScreen({ navigation }) {
  useEffect(() => {
    // тут ти можеш зробити запит getCurrentUser
    // бо бекенд УЖЕ поставив кукі
    navigation.replace('Home');
  }, []);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
