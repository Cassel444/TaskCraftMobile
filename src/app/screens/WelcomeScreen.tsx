import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import Svg, { Polyline, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../types/paramList/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientButton } from '../../components/GradientButton';
import { gradient } from '../../styles/gradient';

type WelcomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const checkpoints = [
  { x: 50, y: 200, labelKey: 'checkpoint_dream', color: '#FF5722', value: 5 },
  { x: 100, y: 170, labelKey: 'checkpoint_start', color: '#E91E63', value: 15 },
  {
    x: 150,
    y: 140,
    labelKey: 'checkpoint_execution',
    color: '#03A9F4',
    value: 30,
  },
  {
    x: 200,
    y: 110,
    labelKey: 'checkpoint_challenges',
    color: '#009688',
    value: 50,
  },
  { x: 250, y: 80, labelKey: 'checkpoint_result', color: '#CDDC39', value: 85 },
  {
    x: 300,
    y: 60,
    labelKey: 'checkpoint_success',
    color: '#FFC107',
    value: 100,
  },
];

export default function Welcome() {
  const { t } = useTranslation();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const fadeAnim = new Animated.Value(1.0);
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

  const handleStart = () => {
    navigation.navigate('Auth');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
          marginBottom: 20,
        }}
      ></Animated.View>

      <Text style={styles.title}>{t('welcome_page.title')}</Text>
      <Text style={styles.subtitle}>{t('welcome_page.subtitle')}</Text>

      {/* Кнопка "Почати" */}
      <View style={{ width: '100%', maxWidth: 300 }}>
        <GradientButton
          style={styles.button}
          gradient={gradient}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>
            {t('welcome_page.button_start')}
          </Text>
        </GradientButton>
      </View>

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
                {t(`welcome_page.${point.labelKey}`)}
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
    // backgroundColor: 'transparent',
  },
  logo: { width: 50, height: 50 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 50,
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  graphContainer: { marginTop: 10 },
  barChart: { marginTop: 10, width: '100%' },
  bar: {
    height: 20,
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  barText: { color: '#fff', fontSize: 12 },
});
