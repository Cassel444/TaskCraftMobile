import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useFadeAnimation(duration: number = 500) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  // Анімація появи (fade-in)
  const fadeIn = () => {
    return new Promise<void>((resolve) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => resolve());
    });
  };

  // Анімація зникнення (fade-out)
  const fadeOut = () => {
    return new Promise<void>((resolve) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: duration * 0.7,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: duration * 0.7,
          useNativeDriver: true,
        }),
      ]).start(() => resolve());
    });
  };

  useEffect(() => {
    fadeIn(); // запуск анімації при появі компонента
  }, []);

  return {
    fadeAnim,
    translateY,
    fadeIn,
    fadeOut,
  };
}
