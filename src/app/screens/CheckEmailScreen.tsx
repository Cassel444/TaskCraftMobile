import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CheckEmailScreen() {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Проверьте вашу почту ✉️</Text>
      <Text style={styles.text}>
        Мы отправили вам письмо с подтверждением. Перейдите по ссылке, чтобы
        завершить регистрацию.{'\n'}
        Вы можете закрыть это приложение после активации.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: width * 0.9,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 44,
    fontWeight: '400',
    color: 'rgb(222, 225, 226)',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgb(222, 225, 226)',
    lineHeight: 22,
  },
});
