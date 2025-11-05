// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function WelcomeScreen({ navigation }: { navigation: any }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to TaskCraft Mobile 🚀</Text>
//       <Text style={styles.subtitle}>Manage your tasks anywhere, anytime!</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Login')}
//       >
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import Logo from '../../assets/logo.svg';
import Svg, { Polyline, Circle } from 'react-native-svg';

const checkpoints = [
  { x: 50, y: 200, label: 'Мечта', color: '#FF5722', value: 5 },
  { x: 100, y: 170, label: 'Старт', color: '#E91E63', value: 15 },
  { x: 150, y: 140, label: 'Реализация', color: '#03A9F4', value: 30 },
  { x: 200, y: 110, label: 'Трудности', color: '#009688', value: 50 },
  { x: 250, y: 80, label: 'Результат', color: '#CDDC39', value: 85 },
  { x: 300, y: 60, label: 'Успех', color: '#FFC107', value: 100 },
];

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          marginBottom: 20,
        }}
      >
        <Logo width={120} height={120} />
      </Animated.View>

      <Text style={styles.title}>TaskCraft</Text>
      <Text style={styles.subtitle}>
        Воплощай идеи. Контролируй процесс. Создай своё пространство для задач.
      </Text>

      {/* Кнопка "Начать" */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Начать</Text>
      </TouchableOpacity>

      {/* Графік */}
      <View style={styles.graphContainer}>
        <Svg height="250" width="350">
          <Polyline
            points={checkpoints.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#FF5722"
            strokeWidth="3"
          />
          {checkpoints.map((point, index) => (
            <React.Fragment key={index}>
              <Circle cx={point.x} cy={point.y} r="5" fill={point.color} />
              <Text
                style={{
                  position: 'absolute',
                  left: point.x - 15,
                  top: point.y - 25,
                  fontSize: 12,
                  color: '#333',
                }}
              >
                {point.label}
              </Text>
            </React.Fragment>
          ))}
        </Svg>
      </View>

      {/* Бар-графік */}
      <View style={styles.barChart}>
        {checkpoints.map((p, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              { width: `${p.value}%`, backgroundColor: p.color },
            ]}
          >
            <Text style={styles.barText}>{p.value}%</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF5722',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  graphContainer: { marginTop: 20 },
  barChart: { marginTop: 30, width: '100%' },
  bar: {
    height: 20,
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  barText: { color: '#fff', fontSize: 12 },
});
