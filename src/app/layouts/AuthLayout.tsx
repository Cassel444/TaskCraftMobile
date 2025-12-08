import React, { useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
}

import bg1 from '../../assets/bg/overlay_back.webp';
import bg2 from '../../assets/bg/back_task_craft.webp';

export default function AuthLayout({ children }: AuthLayoutProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hasInteracted = useRef(false);

  const handleActivity = () => {
    if (hasInteracted.current) return;
    hasInteracted.current = true;

    // Плавне зникнення
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container} onTouchStart={handleActivity}>
      {/* Перший фон — статичний */}
      <Image source={bg1} style={styles.background} />

      {/* Другий фон — fade-in НАД першим */}
      <Animated.Image
        source={bg2}
        style={[styles.background, { opacity: fadeAnim }]}
      />

      {/* Контент */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
