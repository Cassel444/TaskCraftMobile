import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientBorder = ({ children, gradient }) => {
  return (
    <View style={styles.shadowWrapper}>
      <LinearGradient {...gradient} style={styles.gradient}>
        <View>{children}</View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  // 👉 ЦЕ View ТІЛЬКИ ДЛЯ ТІНІ
  shadowWrapper: {
    borderRadius: 40,

    shadowColor: '#00c9ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 10, // Android
  },

  // 👉 Градієнтна рамка
  gradient: {
    padding: 2,
    borderRadius: 40,
    marginBottom: 20,
  },
});
